import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';

@Component({
  selector: 'app-admission-thank-you-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './admission-thank-you-page.component.html',
  styleUrl: './admission-thank-you-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionThankYouPageComponent {
  readonly content = inject(SiteContentService).content;
}
