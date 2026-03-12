import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsPageComponent {
  readonly content = inject(SiteContentService).content;
}
