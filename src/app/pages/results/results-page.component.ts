import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SITE_BRAND_NAME, SITE_HEADER_ACTIONS, SITE_NAV_ITEMS } from '../../site.config';

type Achiever = {
  name: string;
  level: string;
  highlights: string[];
  quote: string;
  image: string;
};

type RankCard = {
  badge: string;
  name: string;
  score: string;
  detail: string[];
  image: string;
};

type ResultDriver = {
  title: string;
  description: string;
};

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsPageComponent {
  readonly brand = SITE_BRAND_NAME;
  readonly navItems = SITE_NAV_ITEMS;
  readonly actions = SITE_HEADER_ACTIONS;

  readonly achievers: Achiever[] = [
    {
      name: 'Aarav Sharma',
      level: 'Class 9',
      highlights: ['95% in Mathematics', '20% score improvement'],
      quote: 'The live classes made complex algebra concepts so clear and fun.',
      image: 'design/mentor-b.jpg'
    },
    {
      name: 'Sanya Iyer',
      level: 'Class 8',
      highlights: ['97% in Science', 'Olympiad gold medalist'],
      quote: 'I love the interactive quizzes. They make revision feel like a game.',
      image: 'design/mentor-c.jpg'
    },
    {
      name: 'Rohan Gupta',
      level: 'Class 10',
      highlights: ['98% in Board Foundation', 'NTSE scholar'],
      quote: 'Personal mentoring changed my approach toward difficult Physics topics.',
      image: 'design/mentor-d.jpg'
    },
    {
      name: 'Ananya Singh',
      level: 'Class 7',
      highlights: ['94% aggregate', 'English debate winner'],
      quote: 'The recorded lectures are a lifesaver when I need to revise before exams.',
      image: 'design/mentor-a.jpg'
    }
  ];

  readonly jeeRanks: RankCard[] = [
    {
      badge: 'IIT-JEE Advanced',
      name: 'Kabir Mehra',
      score: '99.98 Percentile',
      detail: ['All India Rank (AIR): 142', 'Perfect 100 in Physics', 'Qualified for IIT Bombay'],
      image: 'design/mentor-d.jpg'
    },
    {
      badge: 'JEE Main Topper',
      name: 'Aditya Sen',
      score: '99.85 Percentile',
      detail: ['All India Rank (AIR): 856', 'Top 0.1% in Mathematics', 'NIT Trichy aspirant'],
      image: 'design/mentor-c.jpg'
    },
    {
      badge: 'IIT-JEE Success',
      name: 'Meera Joshi',
      score: '99.72 Percentile',
      detail: ['State Rank: 12', 'Chemistry specialist', 'IIT Delhi bound'],
      image: 'design/mentor-a.jpg'
    }
  ];

  readonly drivers: ResultDriver[] = [
    { title: 'Interactive Classes', description: 'Real-time engagement via app & web portal.' },
    { title: 'Small Batch Sizes', description: 'Ensuring every student gets individual attention.' },
    { title: 'Testing & Analytics', description: 'Weekly tests with deep performance insights.' },
    { title: 'Recorded Lectures', description: '24/7 access for seamless revision & backlog.' },
    { title: 'Personal Mentoring', description: '1-on-1 guidance for academic stress & strategy.' },
    { title: 'Progress Tracking', description: 'Dedicated portal for parents to track growth.' }
  ];
}
