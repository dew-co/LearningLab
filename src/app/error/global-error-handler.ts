import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ToastService } from '../toast/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(error: unknown): void {
    console.error(error);

    try {
      const toastService = this.injector.get(ToastService);
      toastService.error('Something went wrong. Please try again.');
    } catch {
      console.error('Toast notification could not be shown for an application error.');
    }
  }
}
