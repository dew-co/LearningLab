import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import type { AdminProfile } from './admin-auth.service';
import { AdminAuthService } from './admin-auth.service';
import { AdminContentEditorComponent } from './admin-content-editor.component';
import { SiteContentService } from '../site-content.service';
import type { SiteContent } from '../site-content.model';
import { ToastService } from '../toast/toast.service';

type AdminTab = 'dashboard' | 'pages' | 'settings' | 'profile' | 'management';

type PageSectionConfig = {
  key: string;
  label: string;
};

type PageKey =
  | 'home'
  | 'courses'
  | 'liveClasses'
  | 'results'
  | 'about'
  | 'contact'
  | 'admission'
  | 'admissionThankYou'
  | 'legal';

type PageConfig = {
  key: PageKey;
  label: string;
  route: string;
  description: string;
  sections: PageSectionConfig[];
};

const PAGE_CONFIGS: PageConfig[] = [
  {
    key: 'home',
    label: 'Home',
    route: '/home',
    description: 'Homepage hero, faculty, testimonials, plans, FAQ, and newsletter.',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'featuresSection', label: 'Features' },
      { key: 'facultySection', label: 'Faculty' },
      { key: 'testimonialsSection', label: 'Testimonials' },
      { key: 'plansSection', label: 'Plans' },
      { key: 'faqSection', label: 'FAQ' },
      { key: 'newsletter', label: 'Newsletter' }
    ]
  },
  {
    key: 'courses',
    label: 'Courses',
    route: '/courses',
    description: 'Program positioning, section cards, pathway milestones, and CTA copy.',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'foundationSection', label: 'Foundation' },
      { key: 'dualFocusSection', label: 'Dual Focus' },
      { key: 'jeeSection', label: 'IIT-JEE' },
      { key: 'pathSection', label: 'Pathway' },
      { key: 'cta', label: 'CTA' }
    ]
  },
  {
    key: 'liveClasses',
    label: 'Live Classes',
    route: '/live-classes',
    description: 'Live class flow, benefits, ecosystem, program grid, and CTA.',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'stepsSection', label: 'Steps' },
      { key: 'benefitsSection', label: 'Benefits' },
      { key: 'ecosystemSection', label: 'Ecosystem' },
      { key: 'programsSection', label: 'Programs' },
      { key: 'cta', label: 'CTA' }
    ]
  },
  {
    key: 'results',
    label: 'Results',
    route: '/results',
    description: 'Results hero, achievers, competitive ranks, drivers, and closing CTA.',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'foundationSection', label: 'Foundation Results' },
      { key: 'featuredSection', label: 'Featured Results' },
      { key: 'jeeSection', label: 'Competitive Results' },
      { key: 'driversSection', label: 'Drivers' },
      { key: 'cta', label: 'CTA' }
    ]
  },
  {
    key: 'about',
    label: 'About',
    route: '/about-us',
    description: 'Brand story, philosophy, faculty proof, segments, and closing CTA.',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'philosophySection', label: 'Philosophy' },
      { key: 'differenceSection', label: 'What Makes Us Different' },
      { key: 'facultySection', label: 'Faculty' },
      { key: 'segmentsSection', label: 'Segments' },
      { key: 'quoteSection', label: 'Quote' },
      { key: 'cta', label: 'CTA' }
    ]
  },
  {
    key: 'contact',
    label: 'Contact',
    route: '/contact-us',
    description: 'Lead form, office details, map embed, and contact CTA.',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'enquiryForm', label: 'Enquiry Form' },
      { key: 'quickCards', label: 'Quick Contact Cards' },
      { key: 'officeCard', label: 'Office Card' },
      { key: 'mapSection', label: 'Map' },
      { key: 'cta', label: 'CTA' }
    ]
  },
  {
    key: 'admission',
    label: 'Admission',
    route: '/admission',
    description: 'Admission form content, next-step panel, help card, and CTA.',
    sections: [
      { key: 'hero', label: 'Hero' },
      { key: 'form', label: 'Form' },
      { key: 'stepsPanel', label: 'Steps Panel' },
      { key: 'helpPanel', label: 'Help Panel' },
      { key: 'promoCard', label: 'Promo Card' },
      { key: 'cta', label: 'CTA' }
    ]
  },
  {
    key: 'admissionThankYou',
    label: 'Thank You',
    route: '/admission/thank-you',
    description: 'Submission acknowledgement, next steps, and trust note.',
    sections: [{ key: 'content', label: 'Page Content' }]
  },
  {
    key: 'legal',
    label: 'Legal',
    route: '/privacy-policy',
    description: 'Privacy policy and terms of service documents.',
    sections: [
      { key: 'privacy', label: 'Privacy Policy' },
      { key: 'terms', label: 'Terms of Service' }
    ]
  }
];

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormsModule, AdminContentEditorComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent {
  private readonly router = inject(Router);
  private readonly contentService = inject(SiteContentService);
  private readonly authService = inject(AdminAuthService);
  private readonly toastService = inject(ToastService);

  readonly tabs: { key: AdminTab; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'pages', label: 'Pages' },
    { key: 'settings', label: 'Settings' },
    { key: 'profile', label: 'Admin Profile' },
    { key: 'management', label: 'Management' }
  ];
  readonly pageConfigs = PAGE_CONFIGS;
  readonly adminSession = this.authService.session;

  readonly defaultContent = this.contentService.getDefaultContent();
  selectedTab: AdminTab = 'dashboard';
  selectedPageKey: PageKey = 'home';
  selectedSectionKey = 'hero';
  importPayload = '';

  draft: SiteContent = this.contentService.getSnapshot();
  profileDraft: AdminProfile = this.authService.getProfileSnapshot();

  setTab(tab: AdminTab): void {
    this.selectedTab = tab;
  }

  setSelectedPage(pageKey: PageKey): void {
    this.selectedPageKey = pageKey;
    this.selectedSectionKey = this.activePage.sections[0]?.key ?? 'hero';
  }

  setSelectedSection(sectionKey: string): void {
    this.selectedSectionKey = sectionKey;
  }

  saveContent(): void {
    try {
      this.contentService.saveContent(this.draft);
      this.draft = this.contentService.getSnapshot();
      this.toastService.success('Site content saved to browser storage.');
    } catch {
      this.toastService.error('Site content could not be saved.');
    }
  }

  discardChanges(): void {
    try {
      this.draft = this.contentService.getSnapshot();
      this.toastService.info('Unsaved draft changes were discarded.');
    } catch {
      this.toastService.error('Draft could not be restored.');
    }
  }

  resetSiteContent(): void {
    try {
      this.draft = this.contentService.resetContent();
      this.toastService.info('Site content was reset to the default dataset.');
    } catch {
      this.toastService.error('Site content could not be reset.');
    }
  }

  saveProfile(): void {
    try {
      this.authService.updateProfile(this.profileDraft);
      this.profileDraft = this.authService.getProfileSnapshot();
      this.toastService.success('Admin profile updated successfully.');
    } catch {
      this.toastService.error('Admin profile could not be updated.');
    }
  }

  async resetProfile(): Promise<void> {
    try {
      this.profileDraft = this.authService.resetProfile();
      this.toastService.info('Admin profile reset. Sign in again with the default credentials.');
      const navigated = await this.router.navigate(['/admin/login']);

      if (!navigated) {
        this.toastService.error('Admin reset completed, but navigation to login failed.');
      }
    } catch {
      this.toastService.error('Admin profile could not be reset.');
    }
  }

  async logout(): Promise<void> {
    try {
      this.authService.logout();
      this.toastService.info('You have been logged out.');
      const navigated = await this.router.navigate(['/admin/login']);

      if (!navigated) {
        this.toastService.error('Logout completed, but navigation to login failed.');
      }
    } catch {
      this.toastService.error('Logout could not be completed.');
    }
  }

  downloadExport(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const blob = new Blob([this.contentService.exportContent()], { type: 'application/json' });
    const link = window.document.createElement('a');
    const url = window.URL.createObjectURL(blob);

    link.href = url;
    link.download = `learninglab-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.URL.revokeObjectURL(url);

    this.toastService.success('Content backup downloaded.');
  }

  importFromTextarea(): void {
    if (!this.importPayload.trim()) {
      this.toastService.error('Paste a JSON payload before importing.');
      return;
    }

    try {
      this.contentService.importContent(this.importPayload);
      this.draft = this.contentService.getSnapshot();
      this.importPayload = '';
      this.toastService.success('JSON payload imported successfully.');
    } catch {
      this.toastService.error('The JSON payload could not be imported.');
    }
  }

  handleImportFile(event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement) || !target.files?.length) {
      return;
    }

    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.toastService.error('Unsupported import file format.');
        target.value = '';
        return;
      }

      try {
        this.contentService.importContent(reader.result);
        this.draft = this.contentService.getSnapshot();
        this.toastService.success('Import file applied successfully.');
      } catch {
        this.toastService.error('Import file could not be parsed.');
      } finally {
        target.value = '';
      }
    };

    reader.onerror = () => {
      this.toastService.error('Import file could not be read.');
      target.value = '';
    };

    reader.readAsText(file);
  }

  get activePage(): PageConfig {
    return this.pageConfigs.find((page) => page.key === this.selectedPageKey) ?? this.pageConfigs[0];
  }

  get currentTabTitle(): string {
    return this.tabs.find((tab) => tab.key === this.selectedTab)?.label ?? 'Dashboard';
  }

  get selectedSectionLabel(): string {
    return this.activePage.sections.find((section) => section.key === this.selectedSectionKey)?.label ?? this.selectedSectionKey;
  }

  get selectedSectionModel(): unknown {
    if (this.selectedPageKey === 'admissionThankYou' && this.selectedSectionKey === 'content') {
      return this.draft.admissionThankYou;
    }

    const page = this.getPageRecord(this.selectedPageKey, this.draft);
    return page[this.selectedSectionKey];
  }

  get selectedSectionPrototype(): unknown {
    if (this.selectedPageKey === 'admissionThankYou' && this.selectedSectionKey === 'content') {
      return this.defaultContent.admissionThankYou;
    }

    const page = this.getPageRecord(this.selectedPageKey, this.defaultContent);
    return page[this.selectedSectionKey];
  }

  get selectedSectionParent(): Record<string, unknown> {
    if (this.selectedPageKey === 'admissionThankYou' && this.selectedSectionKey === 'content') {
      return { content: this.draft.admissionThankYou };
    }

    return this.getPageRecord(this.selectedPageKey, this.draft);
  }

  get selectedSectionParentKey(): string {
    return this.selectedPageKey === 'admissionThankYou' && this.selectedSectionKey === 'content'
      ? 'content'
      : this.selectedSectionKey;
  }

  get pageCount(): number {
    return this.pageConfigs.length;
  }

  get sectionCount(): number {
    return this.pageConfigs.reduce((total, page) => total + page.sections.length, 0);
  }

  get imageCount(): number {
    return this.countImages(this.draft);
  }

  get textFieldCount(): number {
    return this.countTextFields(this.draft);
  }

  private getPageRecord(pageKey: PageKey, content: SiteContent): Record<string, unknown> {
    switch (pageKey) {
      case 'home':
        return content.home as unknown as Record<string, unknown>;
      case 'courses':
        return content.courses as unknown as Record<string, unknown>;
      case 'liveClasses':
        return content.liveClasses as unknown as Record<string, unknown>;
      case 'results':
        return content.results as unknown as Record<string, unknown>;
      case 'about':
        return content.about as unknown as Record<string, unknown>;
      case 'contact':
        return content.contact as unknown as Record<string, unknown>;
      case 'admission':
        return content.admission as unknown as Record<string, unknown>;
      case 'admissionThankYou':
        return { content: content.admissionThankYou };
      case 'legal':
        return content.legal as unknown as Record<string, unknown>;
    }
  }

  private countImages(node: unknown, key = ''): number {
    if (typeof node === 'string') {
      return /(image|photo|avatar|logo|src)/i.test(key) || /\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i.test(node) ? 1 : 0;
    }

    if (Array.isArray(node)) {
      return node.reduce((total, entry) => total + this.countImages(entry, key), 0);
    }

    if (typeof node === 'object' && node !== null) {
      return Object.entries(node).reduce((total, [entryKey, entryValue]) => total + this.countImages(entryValue, entryKey), 0);
    }

    return 0;
  }

  private countTextFields(node: unknown): number {
    if (typeof node === 'string') {
      return node.trim() ? 1 : 0;
    }

    if (Array.isArray(node)) {
      return node.reduce((total, entry) => total + this.countTextFields(entry), 0);
    }

    if (typeof node === 'object' && node !== null) {
      return Object.values(node).reduce((total, entry) => total + this.countTextFields(entry), 0);
    }

    return 0;
  }
}
