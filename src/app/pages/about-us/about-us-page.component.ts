import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SITE_BRAND_NAME, SITE_HEADER_ACTIONS, SITE_NAV_ITEMS } from '../../site.config';

type SimpleCard = {
  title: string;
  description: string;
};

type DifferenceCard = {
  title: string;
  description: string;
};

type SegmentCard = {
  title: string;
  subtitle: string;
  description: string;
};

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsPageComponent {
  readonly brand = SITE_BRAND_NAME;
  readonly navItems = SITE_NAV_ITEMS;
  readonly actions = SITE_HEADER_ACTIONS;

  readonly philosophyCards: SimpleCard[] = [
    {
      title: 'Concept-Based Learning',
      description:
        'We move beyond rote memorization. Our pedagogy focuses on deep understanding of core principles, ensuring students can apply knowledge to complex, real-world problems.'
    },
    {
      title: 'Quality Teaching, Better Outcomes',
      description:
        'We believe that expert instruction combined with rigorous methodology leads to proven student success. Every lesson is crafted to maximize retention and spark curiosity.'
    }
  ];

  readonly differences: DifferenceCard[] = [
    { title: 'App & Web Live Classes', description: 'Seamlessly join classes from your laptop or mobile device with zero lag.' },
    { title: 'Experienced Faculty', description: 'Learn from industry veterans and top-tier academic experts.' },
    { title: 'Small Batches', description: 'Personalized attention with limited students per session for better focus.' },
    { title: 'Structured Curriculum', description: 'Mapped precisely to competitive exams and board requirements.' },
    { title: 'Regular Testing', description: 'Weekly assessments and performance reports to track your progress.' },
    { title: 'Recorded Lectures', description: 'Missed a class? Access all recordings and notes anytime, anywhere.' },
    { title: 'Parent Tracking', description: 'A dedicated app for parents to monitor attendance and results.' },
    { title: '24/7 Doubt Support', description: 'Get your questions answered instantly by our dedicated mentors.' }
  ];

  readonly segments: SegmentCard[] = [
    {
      title: 'Foundation',
      subtitle: 'Classes 6 - 10',
      description: 'Building strong fundamentals in Mathematics, Science, and Logical Reasoning.'
    },
    {
      title: 'Competitive Prep',
      subtitle: 'IIT-JEE Aspirants',
      description: 'Intensive coaching for JEE Main & Advanced with top-tier problem sets.'
    },
    {
      title: 'Board Excellence',
      subtitle: 'Classes 11 - 12',
      description: 'Specialized focus on CBSE/ISC boards with a perfect balance of theory and practice.'
    }
  ];
}
