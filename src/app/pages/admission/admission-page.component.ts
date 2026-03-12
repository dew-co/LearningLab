import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';

@Component({
  selector: 'app-admission-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './admission-page.component.html',
  styleUrl: './admission-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionPageComponent {
  private readonly router = inject(Router);
  readonly content = inject(SiteContentService).content;

  submitAdmissionRequest(): void {
    void this.router.navigate(['/admission/thank-you']);
  }
}
