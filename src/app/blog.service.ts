import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc
} from 'firebase/firestore';

import type { BlogPost, BlogPostInput } from './data-records.model';
import { firestore } from './firebase/firebase';

function toSlug(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || `post-${Date.now()}`;
}

function normalizeBlogPost(id: string, value: Record<string, unknown>): BlogPost {
  return {
    id,
    title: String(value['title'] ?? ''),
    slug: String(value['slug'] ?? ''),
    excerpt: String(value['excerpt'] ?? ''),
    content: String(value['content'] ?? ''),
    coverImageSrc: String(value['coverImageSrc'] ?? ''),
    coverImageAlt: String(value['coverImageAlt'] ?? ''),
    authorName: String(value['authorName'] ?? ''),
    isPublished: Boolean(value['isPublished'] ?? false),
    publishedAt: Number(value['publishedAt'] ?? 0),
    createdAt: Number(value['createdAt'] ?? 0),
    updatedAt: Number(value['updatedAt'] ?? 0)
  };
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly collectionRef = collection(firestore, 'blogPosts');

  readonly posts = signal<BlogPost[]>([]);
  readonly isLoading = signal(true);

  constructor() {
    const postsQuery = query(this.collectionRef, orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        this.posts.set(
          snapshot.docs.map((entry) =>
            normalizeBlogPost(entry.id, entry.data() as Record<string, unknown>)
          )
        );
        this.isLoading.set(false);
      },
      (error) => {
        console.error('Failed to load blog posts.', error);
        this.posts.set([]);
        this.isLoading.set(false);
      }
    );

    this.destroyRef.onDestroy(unsubscribe);
  }

  async createPost(payload: BlogPostInput): Promise<void> {
    const itemRef = doc(this.collectionRef);
    const now = Date.now();
    const isPublished = Boolean(payload.isPublished);
    const publishedAt = isPublished ? payload.publishedAt ?? now : 0;

    await setDoc(itemRef, {
      ...payload,
      slug: toSlug(payload.slug || payload.title),
      isPublished,
      publishedAt,
      createdAt: now,
      updatedAt: now
    });
  }

  async updatePost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<void> {
    const now = Date.now();
    const nextUpdates: Partial<Omit<BlogPost, 'id' | 'createdAt'>> & { updatedAt: number } = {
      ...updates,
      updatedAt: now
    };

    if (typeof updates.title === 'string' && (!updates.slug || !updates.slug.trim())) {
      nextUpdates.slug = toSlug(updates.title);
    }

    if (typeof updates.slug === 'string') {
      nextUpdates.slug = toSlug(updates.slug);
    }

    if (updates.isPublished === true && !updates.publishedAt) {
      nextUpdates.publishedAt = now;
    }

    if (updates.isPublished === false) {
      nextUpdates.publishedAt = 0;
    }

    await updateDoc(doc(this.collectionRef, id), nextUpdates);
  }

  async deletePost(id: string): Promise<void> {
    await deleteDoc(doc(this.collectionRef, id));
  }
}
