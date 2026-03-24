import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage';

import type { MediaAsset, MediaKind } from './data-records.model';
import { firestore, firebaseStorage } from './firebase/firebase';

type MediaAssetRecord = Omit<MediaAsset, 'id'>;
type MediaFileSignature = {
  checksum: string | null;
  legacySignature: string;
  normalizedFileName: string;
  contentType: string;
  extension: string;
};
type MediaUploadResult = {
  asset: MediaAsset;
  isDuplicate: boolean;
};
type MediaBatchUploadResult = {
  uploaded: MediaAsset[];
  duplicates: MediaAsset[];
};

function getFileExtension(fileName: string): string {
  const segments = fileName.split('.');
  return segments.length > 1 ? segments.at(-1)?.toLowerCase() ?? '' : '';
}

function normalizeContentType(contentType: string): string {
  return (contentType || 'application/octet-stream').trim().toLowerCase();
}

function sanitizeFileName(fileName: string): string {
  return fileName
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .toLowerCase();
}

function inferMediaKind(contentType: string, fileName: string): MediaKind {
  if (contentType.startsWith('image/')) {
    return 'image';
  }

  if (
    contentType === 'application/pdf' ||
    /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt)$/i.test(fileName)
  ) {
    return 'document';
  }

  return 'other';
}

function normalizeMediaAsset(id: string, value: Record<string, unknown>): MediaAsset {
  return {
    id,
    name: String(value['name'] ?? ''),
    url: String(value['url'] ?? ''),
    storagePath: String(value['storagePath'] ?? ''),
    kind: (value['kind'] as MediaKind | undefined) ?? 'other',
    contentType: String(value['contentType'] ?? ''),
    extension: String(value['extension'] ?? ''),
    checksum: typeof value['checksum'] === 'string' ? String(value['checksum']) : undefined,
    size: Number(value['size'] ?? 0),
    createdAt: Number(value['createdAt'] ?? 0),
    updatedAt: Number(value['updatedAt'] ?? 0)
  };
}

@Injectable({ providedIn: 'root' })
export class MediaLibraryService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly collectionRef = collection(firestore, 'mediaLibrary');

  readonly assets = signal<MediaAsset[]>([]);
  readonly isLoading = signal(true);

  constructor() {
    const mediaQuery = query(this.collectionRef, orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(
      mediaQuery,
      (snapshot) => {
        this.assets.set(
          snapshot.docs.map((entry) =>
            normalizeMediaAsset(entry.id, entry.data() as Record<string, unknown>)
          )
        );
        this.isLoading.set(false);
      },
      (error) => {
        console.error('Failed to load media library from Firestore.', error);
        this.assets.set([]);
        this.isLoading.set(false);
      }
    );

    this.destroyRef.onDestroy(unsubscribe);
  }

  async uploadFile(file: File): Promise<MediaUploadResult> {
    const signature = await this.createFileSignature(file);
    const duplicate = this.findDuplicateAsset(signature);

    if (duplicate) {
      return { asset: duplicate, isDuplicate: true };
    }

    const asset = await this.persistUploadedAsset(file, signature);
    return { asset, isDuplicate: false };
  }

  async uploadFiles(files: FileList | File[]): Promise<MediaBatchUploadResult> {
    const fileArray = Array.from(files);
    const uploaded: MediaAsset[] = [];
    const duplicates: MediaAsset[] = [];
    const candidateAssets = [...this.assets()];

    for (const file of fileArray) {
      const signature = await this.createFileSignature(file);
      const duplicate = this.findDuplicateAsset(signature, undefined, candidateAssets);

      if (duplicate) {
        duplicates.push(duplicate);
        continue;
      }

      const asset = await this.persistUploadedAsset(file, signature);
      uploaded.push(asset);
      candidateAssets.push(asset);
    }

    return { uploaded, duplicates };
  }

  async replaceAsset(asset: MediaAsset, file: File): Promise<MediaAsset> {
    const previousPath = asset.storagePath;
    const nextAsset = await this.uploadToStorage(asset.id, file);

    await setDoc(
      doc(this.collectionRef, asset.id),
      {
        ...nextAsset,
        createdAt: asset.createdAt,
        updatedAt: Date.now()
      },
      { merge: true }
    );

    if (previousPath && previousPath !== nextAsset.storagePath) {
      await deleteObject(ref(firebaseStorage, previousPath)).catch(() => undefined);
    }

    return { id: asset.id, ...nextAsset, createdAt: asset.createdAt };
  }

  async deleteAsset(asset: MediaAsset): Promise<void> {
    await Promise.all([
      deleteDoc(doc(this.collectionRef, asset.id)),
      asset.storagePath
        ? deleteObject(ref(firebaseStorage, asset.storagePath)).catch(() => undefined)
        : Promise.resolve()
    ]);
  }

  private async persistUploadedAsset(file: File, signature: MediaFileSignature): Promise<MediaAsset> {
    const itemRef = doc(this.collectionRef);
    const asset = await this.uploadToStorage(itemRef.id, file, signature);
    await setDoc(doc(this.collectionRef, itemRef.id), asset);
    return { id: itemRef.id, ...asset };
  }

  private async uploadToStorage(assetId: string, file: File, signature?: MediaFileSignature): Promise<MediaAssetRecord> {
    const fileSignature = signature ?? (await this.createFileSignature(file));
    const storagePath = `media-library/${assetId}/${fileSignature.normalizedFileName}`;
    const storageRef = ref(firebaseStorage, storagePath);
    const now = Date.now();

    await uploadBytes(storageRef, file, {
      contentType: file.type || undefined
    });

    const url = await getDownloadURL(storageRef);

    return {
      name: file.name || fileSignature.normalizedFileName,
      url,
      storagePath,
      kind: inferMediaKind(file.type, file.name),
      contentType: fileSignature.contentType,
      extension: fileSignature.extension,
      checksum: fileSignature.checksum ?? undefined,
      size: file.size,
      createdAt: now,
      updatedAt: now
    };
  }

  private async createFileSignature(file: File): Promise<MediaFileSignature> {
    const contentType = normalizeContentType(file.type);
    const extension = getFileExtension(file.name);
    const normalizedFileName = sanitizeFileName(file.name || 'asset');
    const checksum = await this.computeChecksum(file);

    return {
      checksum,
      legacySignature: this.createLegacySignature(normalizedFileName, contentType, extension, file.size),
      normalizedFileName,
      contentType,
      extension
    };
  }

  private findDuplicateAsset(
    signature: MediaFileSignature,
    excludeAssetId?: string,
    candidateAssets = this.assets()
  ): MediaAsset | null {
    return (
      candidateAssets.find((asset) => {
        if (asset.id === excludeAssetId) {
          return false;
        }

        if (signature.checksum && asset.checksum) {
          return signature.checksum === asset.checksum;
        }

        const sameLegacySignature =
          this.createLegacySignature(
            sanitizeFileName(asset.name || asset.id),
            normalizeContentType(asset.contentType),
            asset.extension || getFileExtension(asset.name),
            asset.size
          ) === signature.legacySignature;

        return sameLegacySignature;
      }) ?? null
    );
  }

  private createLegacySignature(
    normalizedFileName: string,
    contentType: string,
    extension: string,
    size: number
  ): string {
    return [normalizedFileName, contentType, extension, String(size)].join('::');
  }

  private async computeChecksum(file: File): Promise<string | null> {
    if (!globalThis.crypto?.subtle) {
      return null;
    }

    const digestBuffer = await globalThis.crypto.subtle.digest('SHA-256', await file.arrayBuffer());
    return Array.from(new Uint8Array(digestBuffer))
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('');
  }
}
