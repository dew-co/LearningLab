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

import type { AdmissionLog, AdmissionLogInput } from './data-records.model';
import { firestore } from './firebase/firebase';

function normalizeAdmissionLog(id: string, value: Record<string, unknown>): AdmissionLog {
  return {
    id,
    fullName: String(value['fullName'] ?? ''),
    currentClass: String(value['currentClass'] ?? ''),
    desiredCourse: String(value['desiredCourse'] ?? ''),
    schoolName: String(value['schoolName'] ?? ''),
    board: String(value['board'] ?? ''),
    phone: String(value['phone'] ?? ''),
    city: String(value['city'] ?? ''),
    state: String(value['state'] ?? ''),
    status: (value['status'] as AdmissionLog['status'] | undefined) ?? 'new',
    adminNotes: String(value['adminNotes'] ?? ''),
    createdAt: Number(value['createdAt'] ?? 0),
    updatedAt: Number(value['updatedAt'] ?? 0)
  };
}

@Injectable({ providedIn: 'root' })
export class AdmissionLogService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly collectionRef = collection(firestore, 'admissionLogs');

  readonly logs = signal<AdmissionLog[]>([]);
  readonly isLoading = signal(true);

  constructor() {
    const logsQuery = query(this.collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      logsQuery,
      (snapshot) => {
        this.logs.set(
          snapshot.docs.map((entry) =>
            normalizeAdmissionLog(entry.id, entry.data() as Record<string, unknown>)
          )
        );
        this.isLoading.set(false);
      },
      (error) => {
        console.error('Failed to load admission logs.', error);
        this.logs.set([]);
        this.isLoading.set(false);
      }
    );

    this.destroyRef.onDestroy(unsubscribe);
  }

  async createLog(payload: AdmissionLogInput): Promise<void> {
    const itemRef = doc(this.collectionRef);
    const now = Date.now();

    await setDoc(itemRef, {
      ...payload,
      status: 'new',
      adminNotes: '',
      createdAt: now,
      updatedAt: now
    });
  }

  async updateLog(id: string, updates: Partial<Omit<AdmissionLog, 'id' | 'createdAt'>>): Promise<void> {
    await updateDoc(doc(this.collectionRef, id), {
      ...updates,
      updatedAt: Date.now()
    });
  }

  async deleteLog(id: string): Promise<void> {
    await deleteDoc(doc(this.collectionRef, id));
  }
}
