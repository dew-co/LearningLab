import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';

@Component({
  selector: 'app-contact-us-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsPageComponent {
  private readonly siteContent = inject(SiteContentService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly content = this.siteContent.content;
  readonly mapUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.content().contact.mapSection.embedUrl)
  );
}
