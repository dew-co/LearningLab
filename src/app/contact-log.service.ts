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

import type { ContactLog, ContactLogInput } from './data-records.model';
import { firestore } from './firebase/firebase';

function normalizeContactLog(id: string, value: Record<string, unknown>): ContactLog {
  return {
    id,
    studentName: String(value['studentName'] ?? ''),
    classLevel: String(value['classLevel'] ?? ''),
    goal: String(value['goal'] ?? ''),
    phone: String(value['phone'] ?? ''),
    createdAt: Number(value['createdAt'] ?? 0),
    updatedAt: Number(value['updatedAt'] ?? 0)
  };
}

@Injectable({ providedIn: 'root' })
export class ContactLogService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly collectionRef = collection(firestore, 'contactLogs');

  readonly logs = signal<ContactLog[]>([]);
  readonly isLoading = signal(true);

  constructor() {
    const logsQuery = query(this.collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      logsQuery,
      (snapshot) => {
        this.logs.set(
          snapshot.docs.map((entry) =>
            normalizeContactLog(entry.id, entry.data() as Record<string, unknown>)
          )
        );
        this.isLoading.set(false);
      },
      (error) => {
        console.error('Failed to load contact logs.', error);
        this.logs.set([]);
        this.isLoading.set(false);
      }
    );

    this.destroyRef.onDestroy(unsubscribe);
  }

  async createLog(payload: ContactLogInput): Promise<void> {
    const now = Date.now();
    await setDoc(doc(this.collectionRef), {
      ...payload,
      createdAt: now,
      updatedAt: now
    });
  }

  async deleteLog(id: string): Promise<void> {
    await deleteDoc(doc(this.collectionRef, id));
  }
}
