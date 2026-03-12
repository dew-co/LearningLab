import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SITE_BRAND_NAME, SITE_HEADER_ACTIONS, SITE_NAV_ITEMS } from '../../site.config';

type LegalSection = {
  heading: string;
  body: string[];
};

type LegalDocument = {
  eyebrow: string;
  title: string;
  summary: string;
  updatedAt: string;
  sections: LegalSection[];
};

const LEGAL_DOCUMENTS: Record<'privacy' | 'terms', LegalDocument> = {
  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'How LearningLab handles your information',
    summary:
      'We collect only the information needed to deliver admissions support, live classes, performance tracking, and student communication securely.',
    updatedAt: 'Last updated: March 12, 2026',
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'We may collect student and parent details such as name, phone number, email address, class, exam interests, and learning preferences when you fill out admission or contact forms.',
          'We also collect essential usage data from our website and learning platform to improve performance, fix errors, and personalize the student experience.'
        ]
      },
      {
        heading: 'How we use it',
        body: [
          'Your information is used to respond to enquiries, manage admissions, schedule counseling calls, deliver academic support, and share important course updates.',
          'We do not sell personal data to third parties. Any service partners we use are limited to operational needs such as hosting, analytics, and communication delivery.'
        ]
      },
      {
        heading: 'Security and retention',
        body: [
          'We use reasonable technical and administrative safeguards to protect submitted information against unauthorized access, misuse, and disclosure.',
          'Data is retained only as long as required for academic operations, legal compliance, and support history, after which it is deleted or anonymized.'
        ]
      }
    ]
  },
  terms: {
    eyebrow: 'Terms of Service',
    title: 'Rules for using LearningLab services',
    summary:
      'These terms govern access to our website, live classes, academic materials, and counseling services. By using the platform, you agree to comply with them.',
    updatedAt: 'Last updated: March 12, 2026',
    sections: [
      {
        heading: 'Platform usage',
        body: [
          'Students and parents must provide accurate information during registration and enquiries. Accounts or submissions containing misleading information may be restricted.',
          'Learning materials, recordings, assignments, and test content are for enrolled student use only and may not be copied, redistributed, or resold.'
        ]
      },
      {
        heading: 'Classes, payments, and support',
        body: [
          'Batch schedules, demo sessions, and mentor availability may change based on academic planning. We aim to communicate any significant updates in advance.',
          'Fees, refund rules, and program access are governed by the specific enrollment terms shared at the time of admission or purchase.'
        ]
      },
      {
        heading: 'Conduct and limitations',
        body: [
          'Users must not misuse the website or learning systems, interfere with classes, attempt unauthorized access, or upload harmful content.',
          'LearningLab is not liable for interruptions caused by third-party infrastructure, device issues, or internet connectivity problems outside our direct control.'
        ]
      }
    ]
  }
};

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [SiteHeaderComponent, MotionPageDirective],
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });

  readonly brand = SITE_BRAND_NAME;
  readonly navItems = SITE_NAV_ITEMS;
  readonly actions = SITE_HEADER_ACTIONS;
  readonly document = computed(() => {
    const kind = (this.routeData()['kind'] as 'privacy' | 'terms') ?? 'privacy';
    return LEGAL_DOCUMENTS[kind];
  });
}
