import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';

@Component({
  selector: 'app-live-classes-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './live-classes-page.component.html',
  styleUrl: './live-classes-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveClassesPageComponent {
  readonly content = inject(SiteContentService).content;
}
