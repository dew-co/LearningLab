import { Injectable, signal } from '@angular/core';

export type ToastTone = 'success' | 'error' | 'info';

export type ToastItem = {
  id: number;
  message: string;
  tone: ToastTone;
  title: string;
  duration: number;
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<ToastItem[]>([]);
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();

  success(message: string, title = 'Success', duration = 3200): void {
    this.show({ message, title, tone: 'success', duration });
  }

  error(message: string, title = 'Error', duration = 4200): void {
    this.show({ message, title, tone: 'error', duration });
  }

  info(message: string, title = 'Notice', duration = 3200): void {
    this.show({ message, title, tone: 'info', duration });
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);

    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }

    this.toasts.update((existingToasts) => existingToasts.filter((toast) => toast.id !== id));
  }

  private show(toast: Omit<ToastItem, 'id'>): void {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const toastItem: ToastItem = { id, ...toast };

    this.toasts.update((existingToasts) => [...existingToasts, toastItem]);

    if (toast.duration > 0) {
      const timer = setTimeout(() => this.dismiss(id), toast.duration);
      this.timers.set(id, timer);
    }
  }
}
