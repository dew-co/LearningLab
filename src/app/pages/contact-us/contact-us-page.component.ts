import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ContactLogService } from '../../contact-log.service';
import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-contact-us-page',
  standalone: true,
  imports: [FormsModule, RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsPageComponent {
  private readonly siteContent = inject(SiteContentService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly contactLogService = inject(ContactLogService);
  private readonly toastService = inject(ToastService);
  readonly content = this.siteContent.content;
  readonly mapUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.content().contact.mapSection.embedUrl)
  );
  readonly formModel = {
    studentName: '',
    classLevel: '',
    goal: '',
    phone: ''
  };
  isSubmitting = false;

  async submitContactRequest(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    try {
      await this.contactLogService.createLog(this.formModel);
      Object.assign(this.formModel, {
        studentName: '',
        classLevel: '',
        goal: '',
        phone: ''
      });
      this.toastService.success('Your enquiry has been submitted. Our team will contact you shortly.');
    } catch {
      this.toastService.error('The enquiry could not be submitted. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
