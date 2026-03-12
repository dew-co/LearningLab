import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import type { FaqItem } from '../../landing-page.data';

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  templateUrl: './reviews-section.component.html',
  styleUrl: './reviews-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsSectionComponent {
  readonly titlePrefix = input.required<string>();
  readonly titleAccent = input.required<string>();
  readonly description = input.required<string>();
  readonly faqs = input.required<FaqItem[]>();
  readonly expandedIndex = signal<number | null>(0);

  toggleFaq(index: number): void {
    this.expandedIndex.update((current) => (current === index ? null : index));
  }
}
