import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AdmissionsSectionComponent } from '../../components/admissions-section/admissions-section.component';
import { FeaturesSectionComponent } from '../../components/features-section/features-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { MentorsSectionComponent } from '../../components/mentors-section/mentors-section.component';
import { ProgramsSectionComponent } from '../../components/programs-section/programs-section.component';
import { ResultsSectionComponent } from '../../components/results-section/results-section.component';
import { ReviewsSectionComponent } from '../../components/reviews-section/reviews-section.component';
import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AdmissionsSectionComponent,
    FeaturesSectionComponent,
    HeroSectionComponent,
    MentorsSectionComponent,
    MotionPageDirective,
    ProgramsSectionComponent,
    ResultsSectionComponent,
    ReviewsSectionComponent,
    SiteHeaderComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  readonly content = inject(SiteContentService).content;
}
