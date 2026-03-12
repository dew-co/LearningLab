import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SITE_BRAND_NAME, SITE_HEADER_ACTIONS, SITE_NAV_ITEMS } from '../../site.config';

type NextStep = {
  title: string;
  description: string;
  icon: 'download' | 'demo';
};

@Component({
  selector: 'app-admission-thank-you-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './admission-thank-you-page.component.html',
  styleUrl: './admission-thank-you-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionThankYouPageComponent {
  readonly brand = SITE_BRAND_NAME;
  readonly navItems = SITE_NAV_ITEMS;
  readonly actions = SITE_HEADER_ACTIONS;

  readonly nextSteps: NextStep[] = [
    {
      title: 'Download our learning app',
      description: 'Get instant access to free study material and mock tests.',
      icon: 'download'
    },
    {
      title: 'Join our upcoming live demo',
      description: 'Experience our teaching methodology first-hand this Saturday.',
      icon: 'demo'
    }
  ];
}
