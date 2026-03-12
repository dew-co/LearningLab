import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SITE_BRAND_NAME, SITE_HEADER_ACTIONS, SITE_NAV_ITEMS } from '../../site.config';

type AdmissionStep = {
  title: string;
  description: string;
  tone: 'solid' | 'outline' | 'muted';
};

@Component({
  selector: 'app-admission-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './admission-page.component.html',
  styleUrl: './admission-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionPageComponent {
  private readonly router = inject(Router);

  readonly brand = SITE_BRAND_NAME;
  readonly navItems = SITE_NAV_ITEMS;
  readonly actions = SITE_HEADER_ACTIONS;

  readonly steps: AdmissionStep[] = [
    {
      title: 'Request Review',
      description: 'Our academic team reviews your profile within 24 hours.',
      tone: 'solid'
    },
    {
      title: 'Counselor Call',
      description: 'Expert counselor calls to understand your career goals.',
      tone: 'outline'
    },
    {
      title: 'Personalized Plan',
      description: 'Receive a tailored curriculum and study schedule.',
      tone: 'muted'
    },
    {
      title: 'Enrollment',
      description: 'Complete fee payment and start your learning journey.',
      tone: 'muted'
    }
  ];

  submitAdmissionRequest(): void {
    void this.router.navigate(['/admission/thank-you']);
  }
}
