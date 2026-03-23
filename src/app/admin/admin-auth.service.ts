import { Injectable, computed, signal } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth';

import { firebaseAuth } from '../firebase/firebase';
import { ADMIN_EMAIL } from '../firebase/firebase.config';

export type AdminSession = {
  uid: string;
  email: string;
  fullName: string;
  avatarLabel: string;
  lastSignInAt: string;
};

function buildAvatarLabel(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment.charAt(0).toUpperCase())
    .join('');
}

function toAdminSession(user: User): AdminSession {
  const displayName = user.displayName?.trim();
  const email = user.email?.trim().toLowerCase() ?? ADMIN_EMAIL;
  const fullName = displayName || email;

  return {
    uid: user.uid,
    email,
    fullName,
    avatarLabel: buildAvatarLabel(fullName || email) || 'AD',
    lastSignInAt: user.metadata.lastSignInTime ?? ''
  };
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  readonly session = signal<AdminSession | null>(null);
  readonly isReady = signal(false);
  readonly isAuthenticated = computed(() => this.session() !== null);

  private resolveReady!: () => void;
  private readonly readyPromise = new Promise<void>((resolve) => {
    this.resolveReady = resolve;
  });

  constructor() {
    onAuthStateChanged(
      firebaseAuth,
      async (user) => {
        if (user?.email?.trim().toLowerCase() === ADMIN_EMAIL) {
          this.session.set(toAdminSession(user));
        } else {
          this.session.set(null);

          if (user) {
            await signOut(firebaseAuth).catch(() => undefined);
          }
        }

        if (!this.isReady()) {
          this.isReady.set(true);
          this.resolveReady();
        }
      },
      () => {
        this.session.set(null);

        if (!this.isReady()) {
          this.isReady.set(true);
          this.resolveReady();
        }
      }
    );
  }

  async waitUntilReady(): Promise<void> {
    await this.readyPromise;
  }

  async login(email: string, password: string): Promise<void> {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !trimmedPassword) {
      throw new Error('Invalid credentials. Please enter email and password.');
    }

    if (normalizedEmail !== ADMIN_EMAIL) {
      throw new Error('Invalid credentials. Please check your email and password.');
    }

    let credential;

    try {
      credential = await signInWithEmailAndPassword(firebaseAuth, normalizedEmail, password);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        [
          'auth/invalid-credential',
          'auth/wrong-password',
          'auth/user-not-found',
          'auth/invalid-email'
        ].includes(error.code)
      ) {
        throw new Error('Invalid credentials. Please check your email and password.');
      }

      if (error instanceof FirebaseError && error.code === 'auth/too-many-requests') {
        throw new Error('Too many login attempts. Please try again later.');
      }

      throw new Error('Login failed. Please try again.');
    }

    if (credential.user.email?.trim().toLowerCase() !== ADMIN_EMAIL) {
      await signOut(firebaseAuth);
      throw new Error('Invalid credentials. Please check your email and password.');
    }
  }

  async logout(): Promise<void> {
    await signOut(firebaseAuth);
  }
}
