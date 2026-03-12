import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SITE_BRAND_NAME, SITE_HEADER_ACTIONS, SITE_NAV_ITEMS } from '../../site.config';

type Step = {
  title: string;
  description: string;
};

type Benefit = {
  title: string;
  description: string;
};

type EcosystemItem = {
  title: string;
  description: string;
};

type ProgramCard = {
  label: string;
  title: string;
  items: string[];
  featured?: boolean;
};

@Component({
  selector: 'app-live-classes-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './live-classes-page.component.html',
  styleUrl: './live-classes-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveClassesPageComponent {
  readonly brand = SITE_BRAND_NAME;
  readonly navItems = SITE_NAV_ITEMS;
  readonly actions = SITE_HEADER_ACTIONS;

  readonly steps: Step[] = [
    { title: 'Join Live', description: 'Log in via app or website.' },
    { title: 'Interactive Learning', description: 'Two-way audio/chat with teachers.' },
    { title: 'Expert Guidance', description: 'Learn from top-tier faculty.' },
    { title: '24/7 Access', description: 'Watch recorded sessions anytime.' },
    { title: 'Holistic Practice', description: 'Interactive quizzes and tests.' }
  ];

  readonly benefits: Benefit[] = [
    { title: 'Small Batch Sizes', description: 'Personalized attention with limited students per batch to ensure interactive learning.' },
    { title: 'Real-time Doubts', description: 'Get your queries resolved instantly during the live session by expert teachers.' },
    { title: 'Multi-Platform', description: 'Seamlessly switch between Android app, iOS app, and your web browser.' },
    { title: 'Structured Syllabus', description: 'Meticulously planned weekly schedules aligned with school and competitive exams.' },
    { title: 'Recorded Lectures', description: 'Missed a lecture? Re-watch any lecture multiple times at your own pace.' },
    { title: 'App-based Notes', description: 'Access high-quality study materials and handwritten notes directly in the app.' },
    { title: 'Parent Tracking', description: 'Exclusive portal for parents to monitor attendance and performance in real-time.' },
    { title: 'Top Educators', description: 'Learn from IITians and experienced faculty with over 10+ years of teaching excellence.' }
  ];

  readonly studentItems: EcosystemItem[] = [
    { title: 'Multi-device access', description: 'Learn on laptop, tablet, or smartphone with sync.' },
    { title: 'Performance Analytics', description: 'Detailed insights into strengths and weak areas.' },
    { title: 'Instant Recordings', description: 'Access recorded classes within 30 minutes of live sessions.' }
  ];

  readonly parentItems: EcosystemItem[] = [
    { title: 'Real-time progress tracking', description: 'Instant notifications for test scores and attendance.' },
    { title: 'Monthly reports', description: "Comprehensive monthly PDF analysis of your child's growth." },
    { title: 'Direct teacher feedback', description: 'Scheduled parent-teacher meetings via video call.' }
  ];

  readonly programs: ProgramCard[] = [
    { label: 'Foundation', title: 'Classes 6-10', items: ['NCERT & School Syllabus', 'Olympiad Preparation', 'Logical Reasoning Skills'] },
    { label: 'Boards Excellence', title: 'Classes 11-12', items: ['Comprehensive Board Prep', 'AIJ subjects & practicals', 'Sample Paper Solving'], featured: true },
    { label: 'Competitive', title: 'IIT-JEE', items: ['Main & Advanced Focus', 'Daily Practice Problems', 'All India Test Series'] }
  ];
}
