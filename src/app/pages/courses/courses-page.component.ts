import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SITE_BRAND_NAME, SITE_HEADER_ACTIONS, SITE_NAV_ITEMS } from '../../site.config';

type CourseFeature = {
  title: string;
  description: string;
};

type TrackCard = {
  title: string;
  description: string;
};

type PathStep = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  highlight?: boolean;
};

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent {
  readonly brand = SITE_BRAND_NAME;
  readonly navItems = SITE_NAV_ITEMS;
  readonly actions = SITE_HEADER_ACTIONS;

  readonly foundationFeatures: CourseFeature[] = [
    { title: 'Live Classes', description: 'Interactive sessions with top educators across India.' },
    { title: 'Concept-based Teaching', description: 'Focus on why before how to ensure lifelong clarity.' },
    { title: 'Weekly Tests', description: 'Regular assessment modules to track learning progress.' },
    { title: 'Recorded Lectures', description: 'Never miss a class with 24/7 access to recordings.' },
    { title: 'Parent Reports', description: 'Detailed performance analytics sent to parents weekly.' },
    { title: 'App Practice', description: '100k+ questions for self-paced practice on our app.' }
  ];

  readonly boardsTracks: TrackCard[] = [
    { title: 'Subject Live Classes', description: 'In-depth coverage of Physics, Chemistry, Math, and Bio.' },
    { title: 'Board Prep', description: 'Sample papers and NCERT-aligned study material.' },
    { title: 'Competitive Practice', description: 'Bridge courses for NTSE, Olympiads, and early JEE/NEET.' },
    { title: 'Mentorship', description: '1-on-1 sessions to manage stress and career paths.' }
  ];

  readonly jeeHighlights: CourseFeature[] = [
    { title: 'Advanced Live Classes', description: 'Deep dives into complex problem solving.' },
    { title: 'DPPs & Mock Tests', description: 'Daily practice and weekly full-length mocks.' },
    { title: 'Personal Mentoring', description: 'Dedicated academic coach for your journey.' },
    { title: 'Doubt Solving', description: '24/7 instant doubt clearing on our app.' }
  ];

  readonly pathSteps: PathStep[] = [
    { label: '01', title: 'Foundation', subtitle: 'Class 6-8', description: 'Developing logic and conceptual curiosity.' },
    { label: '02', title: 'Pre-Competitive', subtitle: 'Class 9-10', description: 'NTSE, Olympiads & board preparation.' },
    { label: '03', title: 'Dual Focus', subtitle: 'Class 11', description: 'Deep diving into JEE/NEET subjects.' },
    { label: '04', title: 'The Final Leap', subtitle: 'Class 12', description: 'Mastery and exam success.', highlight: true }
  ];
}
