import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SITE_BRAND_NAME, SITE_HEADER_ACTIONS, SITE_NAV_ITEMS } from '../../site.config';

type ContactCard = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-contact-us-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsPageComponent {
  readonly mapUrl: SafeResourceUrl;
  readonly mapExternalUrl =
    'https://www.google.com/maps/search/?api=1&query=Plot+42,+Knowledge+Park+III,+Near+Metro+Station,+New+Delhi+110001';
  readonly brand = SITE_BRAND_NAME;
  readonly navItems = SITE_NAV_ITEMS;
  readonly actions = SITE_HEADER_ACTIONS;

  constructor(private readonly sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps?q=Plot%2042,%20Knowledge%20Park%20III,%20Near%20Metro%20Station,%20New%20Delhi%20110001&z=15&output=embed'
    );
  }

  readonly quickCards: ContactCard[] = [
    { label: 'Call Us', value: '+91 1800 200 1234' },
    { label: 'WhatsApp', value: 'Chat with Counselor' },
    { label: 'Email Support', value: 'support@learninglab.com' }
  ];

}
