import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type HeaderLink = {
  label: string;
  path: string;
  type?: 'route' | 'href';
  exact?: boolean;
};

export type HeaderAction = {
  label: string;
  path: string;
  variant: 'accent' | 'light' | 'dark' | 'green';
  type?: 'route' | 'href';
};

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeaderComponent implements AfterViewInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private lastScrollY = 0;

  readonly brand = input.required<string>();
  readonly brandHref = input('/home');
  readonly navItems = input.required<HeaderLink[]>();
  readonly actions = input<HeaderAction[]>([]);
  readonly avatarLabel = input<string | null>(null);
  readonly mobileMenuOpen = signal(false);
  readonly headerHidden = signal(false);
  readonly headerRaised = signal(false);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.lastScrollY = Math.max(window.scrollY || 0, 0);
    this.headerRaised.set(this.lastScrollY > 8);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
    this.headerHidden.set(false);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  @HostListener('window:scroll')
  handleWindowScroll(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const currentScrollY = Math.max(window.scrollY || 0, 0);
    const scrollDelta = currentScrollY - this.lastScrollY;

    this.headerRaised.set(currentScrollY > 8);

    if (currentScrollY <= 20 || this.mobileMenuOpen()) {
      this.headerHidden.set(false);
      this.lastScrollY = currentScrollY;
      return;
    }

    if (scrollDelta > 6 && currentScrollY > 96) {
      this.headerHidden.set(true);
    } else if (scrollDelta < -4) {
      this.headerHidden.set(false);
    }

    this.lastScrollY = currentScrollY;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    if (!this.mobileMenuOpen()) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(target)) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    this.closeMobileMenu();
  }
}
