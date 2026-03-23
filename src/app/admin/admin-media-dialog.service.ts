import { Injectable, signal } from '@angular/core';

import type { MediaAsset, MediaKind } from '../data-records.model';

type MediaDialogRequest = {
  title: string;
  description: string;
  allowedKinds: MediaKind[];
  currentUrl: string;
  resolve: (asset: MediaAsset | null) => void;
};

@Injectable({ providedIn: 'root' })
export class AdminMediaDialogService {
  readonly request = signal<MediaDialogRequest | null>(null);

  open(config: Omit<MediaDialogRequest, 'resolve'>): Promise<MediaAsset | null> {
    return new Promise((resolve) => {
      this.request.set({ ...config, resolve });
    });
  }

  close(result: MediaAsset | null = null): void {
    const activeRequest = this.request();

    if (!activeRequest) {
      return;
    }

    this.request.set(null);
    activeRequest.resolve(result);
  }
}
