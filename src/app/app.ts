import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ScrollTopButtonComponent } from './components/scroll-top-button/scroll-top-button.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import {
  SITE_BRAND_NAME,
  SITE_FOOTER_CONTACT_ITEMS,
  SITE_FOOTER_DESCRIPTION,
  SITE_FOOTER_LEGAL_LINKS,
  SITE_FOOTER_QUICK_LINKS,
  SITE_FOOTER_SOCIAL_LINKS
} from './site.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteFooterComponent, ScrollTopButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly brand = SITE_BRAND_NAME;
  readonly footerDescription = SITE_FOOTER_DESCRIPTION;
  readonly footerQuickLinks = SITE_FOOTER_QUICK_LINKS;
  readonly footerContactItems = SITE_FOOTER_CONTACT_ITEMS;
  readonly footerSocialLinks = SITE_FOOTER_SOCIAL_LINKS;
  readonly footerLegalLinks = SITE_FOOTER_LEGAL_LINKS;
}
