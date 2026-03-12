import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { PricingPlan } from '../../landing-page.data';

@Component({
  selector: 'app-programs-section',
  standalone: true,
  templateUrl: './programs-section.component.html',
  styleUrl: './programs-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramsSectionComponent {
  readonly plans = input.required<PricingPlan[]>();
}
