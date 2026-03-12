import { Injectable, computed, signal } from '@angular/core';

export type AdminProfile = {
  fullName: string;
  email: string;
  role: string;
  phone: string;
  avatarLabel: string;
  bio: string;
  password: string;
};

type AdminSession = {
  email: string;
  fullName: string;
  avatarLabel: string;
};

const ADMIN_PROFILE_STORAGE_KEY = 'learninglab.admin-profile';
const ADMIN_SESSION_STORAGE_KEY = 'learninglab.admin-session';

const DEFAULT_ADMIN_PROFILE: AdminProfile = {
  fullName: 'Admin User',
  email: 'admin@learninglab.com',
  role: 'Super Admin',
  phone: '+91 1800 200 1234',
  avatarLabel: 'AU',
  bio: 'Responsible for content operations, settings, and media governance.',
  password: 'Admin@123'
};

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  readonly profile = signal<AdminProfile>(this.loadProfile());
  readonly session = signal<AdminSession | null>(this.loadSession());
  readonly isAuthenticated = computed(() => this.session() !== null);

  login(email: string, password: string): boolean {
    const profile = this.profile();
    const emailMatches = email.trim().toLowerCase() === profile.email.trim().toLowerCase();
    const passwordMatches = password === profile.password;

    if (!emailMatches || !passwordMatches) {
      return false;
    }

    const nextSession: AdminSession = {
      email: profile.email,
      fullName: profile.fullName,
      avatarLabel: profile.avatarLabel
    };

    this.session.set(nextSession);
    this.persistSession(nextSession);
    return true;
  }

  logout(): void {
    this.session.set(null);

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    }
  }

  updateProfile(nextProfile: AdminProfile): void {
    const normalized = cloneValue(nextProfile);
    this.profile.set(normalized);
    this.persistProfile(normalized);

    if (this.session()) {
      const nextSession: AdminSession = {
        email: normalized.email,
        fullName: normalized.fullName,
        avatarLabel: normalized.avatarLabel
      };

      this.session.set(nextSession);
      this.persistSession(nextSession);
    }
  }

  resetProfile(): AdminProfile {
    const defaults = cloneValue(DEFAULT_ADMIN_PROFILE);
    this.profile.set(defaults);
    this.persistProfile(defaults);
    this.logout();
    return defaults;
  }

  getDefaultProfile(): AdminProfile {
    return cloneValue(DEFAULT_ADMIN_PROFILE);
  }

  getProfileSnapshot(): AdminProfile {
    return cloneValue(this.profile());
  }

  private loadProfile(): AdminProfile {
    if (typeof window === 'undefined') {
      return this.getDefaultProfile();
    }

    const rawProfile = window.localStorage.getItem(ADMIN_PROFILE_STORAGE_KEY);
    if (!rawProfile) {
      return this.getDefaultProfile();
    }

    try {
      return { ...this.getDefaultProfile(), ...(JSON.parse(rawProfile) as Partial<AdminProfile>) };
    } catch {
      return this.getDefaultProfile();
    }
  }

  private loadSession(): AdminSession | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const rawSession = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as AdminSession;
    } catch {
      return null;
    }
  }

  private persistProfile(profile: AdminProfile): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(ADMIN_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }

  private persistSession(session: AdminSession): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
  }
}
