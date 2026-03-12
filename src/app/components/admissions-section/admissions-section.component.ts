import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { NewsletterContent } from '../../landing-page.data';

@Component({
  selector: 'app-admissions-section',
  standalone: true,
  templateUrl: './admissions-section.component.html',
  styleUrl: './admissions-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionsSectionComponent {
  readonly newsletter = input.required<NewsletterContent>();
}
