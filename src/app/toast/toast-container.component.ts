import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }

  iconClass(tone: 'success' | 'error' | 'info'): string {
    switch (tone) {
      case 'success':
        return 'fa-circle-check';
      case 'error':
        return 'fa-circle-exclamation';
      default:
        return 'fa-circle-info';
    }
  }
}
