import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Testimonial } from '../../landing-page.data';

@Component({
  selector: 'app-results-section',
  standalone: true,
  templateUrl: './results-section.component.html',
  styleUrl: './results-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsSectionComponent {
  readonly titlePrefix = input.required<string>();
  readonly titleAccent = input.required<string>();
  readonly description = input.required<string>();
  readonly testimonials = input.required<Testimonial[]>();
}
