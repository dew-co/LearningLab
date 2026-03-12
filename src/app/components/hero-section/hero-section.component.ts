import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { HeroContent } from '../../landing-page.data';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  readonly hero = input.required<HeroContent>();
}
