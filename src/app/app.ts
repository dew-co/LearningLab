import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { ScrollTopButtonComponent } from './components/scroll-top-button/scroll-top-button.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteContentService } from './site-content.service';
import { ToastContainerComponent } from './toast/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteFooterComponent, ScrollTopButtonComponent, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly router = inject(Router);
  readonly content = inject(SiteContentService).content;
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );
  readonly showSiteChrome = computed(() => !this.currentUrl().startsWith('/admin'));
}
