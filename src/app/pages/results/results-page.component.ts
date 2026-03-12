import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsPageComponent {
  readonly content = inject(SiteContentService).content;
}
