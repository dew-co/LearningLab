import { Injectable, signal } from '@angular/core';

import { DEFAULT_SITE_CONTENT, type SiteContent } from './site-content.model';

const SITE_CONTENT_STORAGE_KEY = 'learninglab.site-content';

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeWithDefaults<T>(defaults: T, incoming: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(incoming) ? incoming : defaults) as T;
  }

  if (isRecord(defaults)) {
    if (!isRecord(incoming)) {
      return cloneValue(defaults);
    }

    const mergedEntries = Object.keys(defaults).map((key) => [
      key,
      mergeWithDefaults(
        defaults[key as keyof typeof defaults],
        incoming[key]
      )
    ]);

    return Object.fromEntries(mergedEntries) as T;
  }

  return (incoming ?? defaults) as T;
}

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  readonly content = signal<SiteContent>(this.loadContent());

  getDefaultContent(): SiteContent {
    return cloneValue(DEFAULT_SITE_CONTENT);
  }

  getSnapshot(): SiteContent {
    return cloneValue(this.content());
  }

  saveContent(nextContent: SiteContent): void {
    const normalized = mergeWithDefaults(DEFAULT_SITE_CONTENT, nextContent);
    this.content.set(normalized);
    this.persistContent(normalized);
  }

  resetContent(): SiteContent {
    const defaults = this.getDefaultContent();
    this.content.set(defaults);
    this.persistContent(defaults);
    return defaults;
  }

  exportContent(): string {
    return JSON.stringify(this.content(), null, 2);
  }

  importContent(rawJson: string): SiteContent {
    const parsed = JSON.parse(rawJson) as unknown;
    const normalized = mergeWithDefaults(DEFAULT_SITE_CONTENT, parsed);
    this.content.set(normalized);
    this.persistContent(normalized);
    return cloneValue(normalized);
  }

  private loadContent(): SiteContent {
    if (typeof window === 'undefined') {
      return this.getDefaultContent();
    }

    const rawContent = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
    if (!rawContent) {
      return this.getDefaultContent();
    }

    try {
      return mergeWithDefaults(DEFAULT_SITE_CONTENT, JSON.parse(rawContent) as unknown);
    } catch {
      return this.getDefaultContent();
    }
  }

  private persistContent(content: SiteContent): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));
  }
}
