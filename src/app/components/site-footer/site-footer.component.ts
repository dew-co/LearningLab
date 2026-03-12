import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MotionPageDirective } from '../../directives/motion-page.directive';

export type FooterLink = {
  label: string;
  path: string;
  type?: 'route' | 'href';
  external?: boolean;
};

export type FooterContactItem = {
  value: string;
  href?: string;
  external?: boolean;
  iconClass: string;
};

export type FooterSocialLink = {
  label: string;
  href: string;
  iconClass: string;
};

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink, MotionPageDirective],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteFooterComponent {
  readonly brand = input.required<string>();
  readonly description = input.required<string>();
  readonly quickLinks = input.required<FooterLink[]>();
  readonly contactItems = input.required<FooterContactItem[]>();
  readonly socialLinks = input.required<FooterSocialLink[]>();
  readonly legalLinks = input.required<FooterLink[]>();
  readonly year = new Date().getFullYear();
}
