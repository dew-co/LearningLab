import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { FirebaseError } from 'firebase/app';

import { ToastService } from '../toast/toast.service';

function toErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    if (error.code.includes('permission-denied')) {
      return 'Permission denied. Please sign in with an authorized admin account.';
    }

    if (error.code.includes('unauthenticated')) {
      return 'Authentication required. Please sign in again.';
    }

    if (error.code.includes('invalid-api-key')) {
      return 'Firebase configuration is invalid. Please check environment setup.';
    }

    if (error.code.includes('network-request-failed') || error.code.includes('unavailable')) {
      return 'Network issue while connecting to Firebase. Please check your connection.';
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('Missing or insufficient permissions')) {
      return 'Permission denied. Please sign in with an authorized admin account.';
    }

    if (error.message.includes('auth/')) {
      return 'Authentication failed. Please verify your credentials and retry.';
    }
  }

  return 'Something went wrong. Please try again.';
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(error: unknown): void {
    console.error(error);

    try {
      const toastService = this.injector.get(ToastService);
      toastService.error(toErrorMessage(error));
    } catch {
      console.error('Toast notification could not be shown for an application error.');
    }
  }
}
