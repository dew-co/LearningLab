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

function getFileExtension(fileName: string): string {
  const segments = fileName.split('.');
  return segments.length > 1 ? segments.at(-1)?.toLowerCase() ?? '' : '';
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

  async uploadFile(file: File): Promise<MediaAsset> {
    const itemRef = doc(this.collectionRef);
    const asset = await this.uploadToStorage(itemRef.id, file);
    await setDoc(doc(this.collectionRef, itemRef.id), asset);
    return { id: itemRef.id, ...asset };
  }

  async uploadFiles(files: FileList | File[]): Promise<MediaAsset[]> {
    const fileArray = Array.from(files);
    const uploadedAssets = await Promise.all(fileArray.map((file) => this.uploadFile(file)));
    return uploadedAssets;
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

  private async uploadToStorage(assetId: string, file: File): Promise<MediaAssetRecord> {
    const normalizedFileName = sanitizeFileName(file.name || `asset-${assetId}`);
    const storagePath = `media-library/${assetId}/${normalizedFileName}`;
    const storageRef = ref(firebaseStorage, storagePath);
    const now = Date.now();

    await uploadBytes(storageRef, file, {
      contentType: file.type || undefined
    });

    const url = await getDownloadURL(storageRef);

    return {
      name: file.name || normalizedFileName,
      url,
      storagePath,
      kind: inferMediaKind(file.type, file.name),
      contentType: file.type || 'application/octet-stream',
      extension: getFileExtension(file.name),
      size: file.size,
      createdAt: now,
      updatedAt: now
    };
  }
}
