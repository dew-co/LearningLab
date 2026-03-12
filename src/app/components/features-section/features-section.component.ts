import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Feature } from '../../landing-page.data';

@Component({
  selector: 'app-features-section',
  standalone: true,
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesSectionComponent {
  readonly eyebrow = input.required<string>();
  readonly features = input.required<Feature[]>();
}
