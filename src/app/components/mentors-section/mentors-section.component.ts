import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { FacultyMember } from '../../landing-page.data';

@Component({
  selector: 'app-mentors-section',
  standalone: true,
  templateUrl: './mentors-section.component.html',
  styleUrl: './mentors-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorsSectionComponent {
  readonly faculty = input.required<FacultyMember[]>();
}
