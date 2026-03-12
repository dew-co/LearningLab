import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [SiteHeaderComponent, MotionPageDirective],
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly siteContent = inject(SiteContentService);
  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });

  readonly content = this.siteContent.content;
  readonly document = computed(() => {
    const kind = (this.routeData()['kind'] as 'privacy' | 'terms') ?? 'privacy';
    return this.content().legal[kind];
  });
}
