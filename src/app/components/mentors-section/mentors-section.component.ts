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
  readonly titlePrefix = input.required<string>();
  readonly titleAccent = input.required<string>();
  readonly description = input.required<string>();
  readonly faculty = input.required<FacultyMember[]>();
  private readonly failedMemberImages = new Set<string>();

  hasMemberImage(member: FacultyMember): boolean {
    return Boolean(member.imageSrc?.trim()) && !this.failedMemberImages.has(member.name);
  }

  markMemberImageBroken(memberName: string): void {
    this.failedMemberImages.add(memberName);
  }

  initials(name: string): string {
    const value = name.trim();

    if (!value) {
      return 'FC';
    }

    return value
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }
}
