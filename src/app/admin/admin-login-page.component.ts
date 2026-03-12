import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminAuthService } from './admin-auth.service';
import { SiteContentService } from '../site-content.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-admin-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login-page.component.html',
  styleUrl: './admin-login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginPageComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AdminAuthService);
  private readonly toastService = inject(ToastService);

  readonly content = inject(SiteContentService).content;
  readonly defaultCredentials = this.authService.getDefaultProfile();

  email = this.authService.profile().email;
  password = '';

  async submit(): Promise<void> {
    const isValid = this.authService.login(this.email, this.password);

    if (!isValid) {
      this.toastService.error('Incorrect email or password.');
      return;
    }

    try {
      const navigated = await this.router.navigate(['/admin']);

      if (!navigated) {
        this.toastService.error('Login succeeded, but admin navigation could not be completed.');
        return;
      }

      this.toastService.success('Welcome back. Admin dashboard is ready.');
    } catch {
      this.toastService.error('Login succeeded, but admin navigation failed.');
    }
  }
}
