import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

import { firestore } from './firebase/firebase';
import { DEFAULT_SITE_CONTENT, type SiteContent } from './site-content.model';

const SITE_CONTENT_DOC_PATH = 'siteContent/main';

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeWithDefaults<T>(defaults: T, incoming: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(incoming) ? incoming : cloneValue(defaults)) as T;
  }

  if (isRecord(defaults)) {
    if (!isRecord(incoming)) {
      return cloneValue(defaults);
    }

    const mergedEntries = Object.keys(defaults).map((key) => [
      key,
      mergeWithDefaults(defaults[key as keyof typeof defaults], incoming[key])
    ]);

    return Object.fromEntries(mergedEntries) as T;
  }

  return (incoming ?? defaults) as T;
}

function replaceMatchingStrings(node: unknown, currentValue: string, nextValue: string): number {
  if (typeof node === 'string') {
    return node === currentValue ? 1 : 0;
  }

  if (Array.isArray(node)) {
    let matchCount = 0;

    node.forEach((entry, index) => {
      if (typeof entry === 'string' && entry === currentValue) {
        node[index] = nextValue;
        matchCount += 1;
        return;
      }

      matchCount += replaceMatchingStrings(entry, currentValue, nextValue);
    });

    return matchCount;
  }

  if (isRecord(node)) {
    let matchCount = 0;

    Object.entries(node).forEach(([key, entry]) => {
      if (typeof entry === 'string' && entry === currentValue) {
        node[key] = nextValue;
        matchCount += 1;
        return;
      }

      matchCount += replaceMatchingStrings(entry, currentValue, nextValue);
    });

    return matchCount;
  }

  return 0;
}

function countMatchingStrings(node: unknown, target: string): number {
  if (typeof node === 'string') {
    return node === target ? 1 : 0;
  }

  if (Array.isArray(node)) {
    return node.reduce((total, entry) => total + countMatchingStrings(entry, target), 0);
  }

  if (isRecord(node)) {
    return Object.values(node).reduce<number>((total, entry) => total + countMatchingStrings(entry, target), 0);
  }

  return 0;
}

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly docRef = doc(firestore, SITE_CONTENT_DOC_PATH);

  readonly content = signal<SiteContent>(this.getDefaultContent());
  readonly isLoading = signal(true);

  constructor() {
    const unsubscribe = onSnapshot(
      this.docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          this.content.set(this.getDefaultContent());
          this.isLoading.set(false);
          return;
        }

        const nextContent = mergeWithDefaults(DEFAULT_SITE_CONTENT, snapshot.data()['data']);
        this.content.set(nextContent);
        this.isLoading.set(false);
      },
      (error) => {
        console.warn('Using default site content because Firestore read was unavailable.', error);
        this.content.set(this.getDefaultContent());
        this.isLoading.set(false);
      }
    );

    this.destroyRef.onDestroy(unsubscribe);
  }

  getDefaultContent(): SiteContent {
    return cloneValue(DEFAULT_SITE_CONTENT);
  }

  getSnapshot(): SiteContent {
    return cloneValue(this.content());
  }

  async saveContent(nextContent: SiteContent): Promise<void> {
    const normalized = mergeWithDefaults(DEFAULT_SITE_CONTENT, nextContent);
    this.content.set(normalized);
    await this.persistContent(normalized);
  }

  async resetContent(): Promise<SiteContent> {
    const defaults = this.getDefaultContent();
    this.content.set(defaults);
    await this.persistContent(defaults);
    return defaults;
  }

  exportContent(): string {
    return JSON.stringify(this.content(), null, 2);
  }

  async importContent(rawJson: string): Promise<SiteContent> {
    const parsed = JSON.parse(rawJson) as unknown;
    const normalized = mergeWithDefaults(DEFAULT_SITE_CONTENT, parsed);
    this.content.set(normalized);
    await this.persistContent(normalized);
    return cloneValue(normalized);
  }

  async replaceMediaReferences(currentValue: string, nextValue: string): Promise<number> {
    if (!currentValue || !nextValue || currentValue === nextValue) {
      return 0;
    }

    const nextContent = this.getSnapshot();
    const matchCount = replaceMatchingStrings(nextContent, currentValue, nextValue);

    if (matchCount > 0) {
      await this.saveContent(nextContent);
    }

    return matchCount;
  }

  countMediaReferences(targetValue: string): number {
    return countMatchingStrings(this.content(), targetValue);
  }

  private async persistContent(content: SiteContent, includeCreatedAt = false): Promise<void> {
    const now = Date.now();

    await setDoc(
      this.docRef,
      {
        data: content,
        updatedAt: now,
        ...(includeCreatedAt ? { createdAt: now } : {})
      },
      { merge: true }
    );
  }
}
