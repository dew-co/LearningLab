import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';

@Component({
  selector: 'app-scroll-top-button',
  standalone: true,
  templateUrl: './scroll-top-button.component.html',
  styleUrl: './scroll-top-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollTopButtonComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  @ViewChild('buttonRef', { static: true })
  private buttonRef?: ElementRef<HTMLButtonElement>;

  private gsapRef: (typeof import('gsap'))['gsap'] | null = null;
  private floatTween: { kill(): void } | null = null;
  private isVisible = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.setInitialState();
    void this.loadGsap();
  }

  ngOnDestroy(): void {
    this.floatTween?.kill();
  }

  @HostListener('window:scroll')
  handleWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const shouldShow = window.scrollY > 320;
    if (shouldShow === this.isVisible) {
      return;
    }

    this.isVisible = shouldShow;
    this.animateVisibility();
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const button = this.buttonRef?.nativeElement;
    if (button && this.gsapRef) {
      this.gsapRef.fromTo(
        button,
        { scale: 1 },
        { scale: 0.92, duration: 0.12, repeat: 1, yoyo: true, ease: 'power1.out' }
      );
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private async loadGsap(): Promise<void> {
    const [{ gsap }] = await Promise.all([import('gsap')]);
    this.gsapRef = gsap;

    this.ngZone.runOutsideAngular(() => {
      this.animateVisibility();
    });
  }

  private animateVisibility(): void {
    const button = this.buttonRef?.nativeElement;
    if (!button || !this.gsapRef) {
      return;
    }

    this.gsapRef.killTweensOf(button);
    this.floatTween?.kill();
    this.floatTween = null;

    if (this.isVisible) {
      this.gsapRef.to(button, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.42,
        ease: 'power3.out',
        pointerEvents: 'auto'
      });

      this.floatTween = this.gsapRef.to(button, {
        y: -6,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.42
      });

      return;
    }

    this.gsapRef.to(button, {
      autoAlpha: 0,
      y: 18,
      scale: 0.88,
      duration: 0.28,
      ease: 'power2.out',
      pointerEvents: 'none'
    });
  }

  private setInitialState(): void {
    const button = this.buttonRef?.nativeElement;
    if (!button) {
      return;
    }

    button.style.opacity = '0';
    button.style.transform = 'translateY(18px) scale(0.88)';
    button.style.pointerEvents = 'none';
  }
}
