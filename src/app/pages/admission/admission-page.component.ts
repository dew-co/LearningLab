import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AdmissionLogService } from '../../admission-log.service';
import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-admission-page',
  standalone: true,
  imports: [FormsModule, RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './admission-page.component.html',
  styleUrl: './admission-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionPageComponent {
  private readonly router = inject(Router);
  private readonly admissionLogService = inject(AdmissionLogService);
  private readonly toastService = inject(ToastService);
  readonly content = inject(SiteContentService).content;
  readonly formModel = {
    fullName: '',
    currentClass: '',
    desiredCourse: '',
    schoolName: '',
    board: '',
    phone: '',
    city: '',
    state: ''
  };
  isSubmitting = false;

  async submitAdmissionRequest(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    try {
      await this.admissionLogService.createLog(this.formModel);
      Object.assign(this.formModel, {
        fullName: '',
        currentClass: '',
        desiredCourse: '',
        schoolName: '',
        board: '',
        phone: '',
        city: '',
        state: ''
      });
      await this.router.navigate(['/admission/thank-you']);
    } catch {
      this.toastService.error('Admission request could not be submitted. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
