import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  inject
} from '@angular/core';

let motionPluginRegistered = false;

@Directive({
  selector: '[appMotionPage]',
  standalone: true
})
export class MotionPageDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  private cleanup: (() => void) | null = null;
  private destroyed = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const host = this.elementRef.nativeElement as HTMLElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      this.revealWithoutMotion(host);
      return;
    }

    void this.setupMotion(host);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.cleanup?.();
  }

  private async setupMotion(host: HTMLElement): Promise<void> {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);

    if (this.destroyed) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      if (!motionPluginRegistered) {
        gsap.registerPlugin(ScrollTrigger);
        motionPluginRegistered = true;
      }

      const context = gsap.context(() => {
        const revealElements = Array.from(host.querySelectorAll('[data-reveal]')) as HTMLElement[];
        const parallaxElements = Array.from(host.querySelectorAll('[data-parallax]')) as HTMLElement[];

        for (const element of revealElements) {
          const variant = element.dataset['reveal'] ?? 'fade-up';
          const delay = Number(element.dataset['delay'] ?? '0');
          const distance = Number(element.dataset['distance'] ?? '48');
          const duration = Number(element.dataset['duration'] ?? '0.9');
          const immediate = element.dataset['immediate'] === 'true' || variant === 'hero';

          const fromVars: Record<string, unknown> = {
            autoAlpha: 0,
            x: 0,
            y: 0,
            scale: 1,
            willChange: 'transform, opacity'
          };

          switch (variant) {
            case 'fade-left':
              fromVars['x'] = distance;
              break;
            case 'fade-right':
              fromVars['x'] = -distance;
              break;
            case 'zoom':
              fromVars['y'] = distance * 0.35;
              fromVars['scale'] = 0.92;
              break;
            case 'hero':
              fromVars['y'] = 32;
              fromVars['scale'] = 0.98;
              break;
            default:
              fromVars['y'] = distance;
          }

          const toVars: Record<string, unknown> = {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: 'power3.out',
            clearProps: 'willChange'
          };

          if (!immediate) {
            toVars['scrollTrigger'] = {
              trigger: element,
              start: element.dataset['start'] ?? 'top 88%',
              once: true
            };
          }

          gsap.fromTo(element, fromVars, toVars);
        }

        for (const element of parallaxElements) {
          const amount = Number(element.dataset['parallax'] ?? '18');
          const axis = element.dataset['axis'] === 'x' ? 'x' : 'y';
          const trigger =
            (element.closest('[data-parallax-root]') as HTMLElement | null) ?? element.parentElement ?? element;

          const fromVars: Record<string, unknown> = {
            willChange: 'transform'
          };
          const toVars: Record<string, unknown> = {
            ease: 'none',
            clearProps: 'willChange',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          };

          if (axis === 'x') {
            fromVars['x'] = -amount;
            toVars['x'] = amount;
          } else {
            fromVars['y'] = -amount;
            toVars['y'] = amount;
          }

          gsap.fromTo(element, fromVars, toVars);
        }

        ScrollTrigger.refresh();
      }, host);

      this.cleanup = () => context.revert();
    });
  }

  private revealWithoutMotion(host: HTMLElement): void {
    for (const element of host.querySelectorAll<HTMLElement>('[data-reveal], [data-parallax]')) {
      element.style.opacity = '1';
      element.style.transform = 'none';
    }
  }
}
