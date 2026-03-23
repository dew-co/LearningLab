import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import type { AdmissionLog, AdmissionStatus, ContactLog, MediaAsset, MediaKind } from '../data-records.model';
import { AdmissionLogService } from '../admission-log.service';
import { ContactLogService } from '../contact-log.service';
import { MediaLibraryService } from '../media-library.service';
import { SiteContentService } from '../site-content.service';
import type { SiteContent } from '../site-content.model';
import { ToastService } from '../toast/toast.service';
import { AdminAuthService } from './admin-auth.service';
import { AdminContentEditorComponent } from './admin-content-editor.component';
import { AdminMediaDialogService } from './admin-media-dialog.service';
import { AdminPaginationComponent } from './admin-pagination.component';

type AdminSectionKey = 'dashboard' | 'pages' | 'settings' | 'media' | 'admissions' | 'contacts' | 'management';

type AdminSection = {
  key: AdminSectionKey;
  label: string;
  icon: string;
  description: string;
};

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

type WebsiteContentTabKey = PageKey | 'otherContent';

type WebsiteContentTab = {
  key: WebsiteContentTabKey;
  label: string;
  description: string;
  route: string | null;
};

type AdmissionOptionFieldKey = 'currentClassOptions' | 'desiredCourseOptions' | 'boardOptions';

type AdmissionOptionField = {
  key: AdmissionOptionFieldKey;
  label: string;
  description: string;
};

type DeleteTarget =
  | { kind: 'media'; id: string }
  | { kind: 'admission'; id: string }
  | { kind: 'contact'; id: string }
  | null;

type DeleteKind = 'media' | 'admission' | 'contact';

type ModalState =
  | { kind: 'media'; asset: MediaAsset }
  | { kind: 'admission-view'; log: AdmissionLog }
  | { kind: 'admission-edit'; log: AdmissionLog }
  | { kind: 'contact'; log: ContactLog }
  | null;

type PaginationKey = 'sidebar' | 'pageTabs' | 'sectionTabs' | 'media' | 'admissions' | 'contacts' | 'mediaPicker';

const ADMIN_SECTIONS: AdminSection[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'fa-solid fa-chart-line',
    description: 'Overview of content, media, and inbound leads.'
  },
  {
    key: 'pages',
    label: 'Website Content',
    icon: 'fa-solid fa-layer-group',
    description: 'Edit every public page section with Firebase-backed content.'
  },
  {
    key: 'settings',
    label: 'Site Settings',
    icon: 'fa-solid fa-sliders',
    description: 'Manage brand, navigation, footer, and global site settings.'
  },
  {
    key: 'media',
    label: 'Media Libraries',
    icon: 'fa-solid fa-photo-film',
    description: 'Upload, replace, preview, and remove shared storage assets.'
  },
  {
    key: 'admissions',
    label: 'Admission Logs',
    icon: 'fa-solid fa-user-graduate',
    description: 'Review, edit, and remove admission enquiries.'
  },
  {
    key: 'contacts',
    label: 'Contact Log',
    icon: 'fa-solid fa-address-book',
    description: 'Track contact form enquiries submitted on the public site.'
  },
  {
    key: 'management',
    label: 'Management',
    icon: 'fa-solid fa-database',
    description: 'Import, export, and restore website content datasets.'
  }
];

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

const ADMISSION_STATUSES: AdmissionStatus[] = ['new', 'in-review', 'contacted', 'enrolled'];

const OTHER_CONTENT_TAB: WebsiteContentTab = {
  key: 'otherContent',
  label: 'Other Content',
  description: 'Manage shared admission form option values used on the public site.',
  route: null
};

const ADMISSION_OPTION_FIELDS: AdmissionOptionField[] = [
  {
    key: 'currentClassOptions',
    label: 'Current Class',
    description: 'Options shown in the "Current Class" dropdown on the Admission form.'
  },
  {
    key: 'desiredCourseOptions',
    label: 'Desired Course',
    description: 'Options shown in the "Desired Course" dropdown on the Admission form.'
  },
  {
    key: 'boardOptions',
    label: 'Board',
    description: 'Options shown in the "Board" dropdown on the Admission form.'
  }
];

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminContentEditorComponent, AdminPaginationComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent {
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly contentService = inject(SiteContentService);
  private readonly authService = inject(AdminAuthService);
  private readonly mediaLibraryService = inject(MediaLibraryService);
  private readonly admissionLogService = inject(AdmissionLogService);
  private readonly contactLogService = inject(ContactLogService);
  private readonly mediaDialogService = inject(AdminMediaDialogService);
  private readonly toastService = inject(ToastService);

  readonly sections = ADMIN_SECTIONS;
  readonly pageConfigs = PAGE_CONFIGS;
  readonly adminSession = this.authService.session;
  readonly contentLoading = this.contentService.isLoading;
  readonly mediaLoading = this.mediaLibraryService.isLoading;
  readonly admissionsLoading = this.admissionLogService.isLoading;
  readonly contactsLoading = this.contactLogService.isLoading;
  readonly mediaDialog = this.mediaDialogService.request;
  readonly admissionStatuses = ADMISSION_STATUSES;
  readonly mediaFilters: Array<MediaKind | 'all'> = ['all', 'image', 'document', 'other'];
  readonly admissionOptionFields = ADMISSION_OPTION_FIELDS;

  readonly defaultContent = this.contentService.getDefaultContent();

  selectedSection: AdminSectionKey = 'dashboard';
  selectedPageKey: PageKey = 'home';
  selectedWebsiteTab: WebsiteContentTabKey = 'home';
  selectedSectionKey = 'hero';
  importPayload = '';

  mediaFilter: MediaKind | 'all' = 'all';
  mediaSearch = '';
  mediaPickerSearch = '';
  admissionSearch = '';
  contactSearch = '';

  draft: SiteContent = this.contentService.getSnapshot();
  pendingDelete: DeleteTarget = null;
  activeModal: ModalState = null;
  isSavingContent = false;
  isUploadingMedia = false;
  isSavingAdmission = false;

  admissionEditDraft: AdmissionLog | null = null;
  newAdmissionOptionDraft: Record<AdmissionOptionFieldKey, string> = {
    currentClassOptions: '',
    desiredCourseOptions: '',
    boardOptions: ''
  };

  private readonly paginationState: Record<PaginationKey, number> = {
    sidebar: 1,
    pageTabs: 1,
    sectionTabs: 1,
    media: 1,
    admissions: 1,
    contacts: 1,
    mediaPicker: 1
  };

  constructor() {
    effect(() => {
      this.contentService.content();
      this.draft = this.contentService.getSnapshot();
      this.cdr.markForCheck();
    });
  }

  setSection(sectionKey: AdminSectionKey): void {
    this.selectedSection = sectionKey;
    this.pendingDelete = null;
  }

  setSelectedPage(pageKey: PageKey): void {
    this.selectedWebsiteTab = pageKey;
    this.selectedPageKey = pageKey;
    this.selectedSectionKey = this.activePage.sections[0]?.key ?? 'hero';
    this.setPageNumber('sectionTabs', 1);
  }

  setSelectedWebsiteTab(tabKey: WebsiteContentTabKey): void {
    if (tabKey === 'otherContent') {
      this.selectedWebsiteTab = 'otherContent';
      return;
    }

    this.setSelectedPage(tabKey);
  }

  setSelectedContentSection(sectionKey: string): void {
    this.selectedSectionKey = sectionKey;
  }

  setPageNumber(key: PaginationKey, page: number): void {
    this.paginationState[key] = page;
  }

  pageNumber(key: PaginationKey): number {
    return this.paginationState[key];
  }

  async saveContent(): Promise<void> {
    this.isSavingContent = true;

    try {
      await this.contentService.saveContent(this.draft);
      this.toastService.success('Website content saved to Firebase.');
    } catch {
      this.toastService.error('Website content could not be saved.');
    } finally {
      this.isSavingContent = false;
    }
  }

  discardChanges(): void {
    this.draft = this.contentService.getSnapshot();
    this.toastService.info('Unsaved draft changes were discarded.');
  }

  async resetSiteContent(): Promise<void> {
    try {
      this.draft = await this.contentService.resetContent();
      this.toastService.info('Site content was restored to the seeded Firebase defaults.');
    } catch {
      this.toastService.error('Site content could not be reset.');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      await this.router.navigate(['/admin/login']);
      this.toastService.info('You have been logged out.');
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

  async importFromTextarea(): Promise<void> {
    if (!this.importPayload.trim()) {
      this.toastService.error('Paste a JSON payload before importing.');
      return;
    }

    try {
      this.draft = await this.contentService.importContent(this.importPayload);
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

    reader.onload = async () => {
      if (typeof reader.result !== 'string') {
        this.toastService.error('Unsupported import file format.');
        target.value = '';
        return;
      }

      try {
        this.draft = await this.contentService.importContent(reader.result);
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

  async uploadNewMedia(): Promise<void> {
    const files = await this.pickFiles('', true);

    if (!files.length) {
      return;
    }

    this.isUploadingMedia = true;

    try {
      await this.mediaLibraryService.uploadFiles(files);
      this.toastService.success(`${files.length} media item${files.length > 1 ? 's were' : ' was'} uploaded.`);
    } catch {
      this.toastService.error('Media upload failed.');
    } finally {
      this.isUploadingMedia = false;
    }
  }

  async replaceMedia(asset: MediaAsset): Promise<void> {
    const accept = asset.kind === 'image' ? 'image/*' : '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt';
    const files = await this.pickFiles(accept);

    if (!files.length) {
      return;
    }

    try {
      const updatedAsset = await this.mediaLibraryService.replaceAsset(asset, files[0]);
      const replacedReferences = await this.contentService.replaceMediaReferences(asset.url, updatedAsset.url);

      this.toastService.success(
        replacedReferences > 0
          ? `Media replaced and ${replacedReferences} linked content reference${replacedReferences > 1 ? 's were' : ' was'} updated.`
          : 'Media replaced successfully.'
      );
      this.pendingDelete = null;
    } catch {
      this.toastService.error('Media could not be replaced.');
    }
  }

  async deleteMedia(asset: MediaAsset): Promise<void> {
    try {
      await this.mediaLibraryService.deleteAsset(asset);
      this.pendingDelete = null;
      this.toastService.info('Media item deleted from Firebase Storage and Media Libraries.');
    } catch {
      this.toastService.error('Media item could not be deleted.');
    }
  }

  async deleteAdmission(log: AdmissionLog): Promise<void> {
    try {
      await this.admissionLogService.deleteLog(log.id);
      this.pendingDelete = null;
      this.toastService.info('Admission log deleted.');
    } catch {
      this.toastService.error('Admission log could not be deleted.');
    }
  }

  async deleteContact(log: ContactLog): Promise<void> {
    try {
      await this.contactLogService.deleteLog(log.id);
      this.pendingDelete = null;
      this.toastService.info('Contact log deleted.');
    } catch {
      this.toastService.error('Contact log could not be deleted.');
    }
  }

  openMediaViewer(asset: MediaAsset): void {
    this.activeModal = { kind: 'media', asset };
  }

  openAdmissionViewer(log: AdmissionLog): void {
    this.activeModal = { kind: 'admission-view', log };
  }

  openAdmissionEditor(log: AdmissionLog): void {
    this.admissionEditDraft = JSON.parse(JSON.stringify(log)) as AdmissionLog;
    this.activeModal = { kind: 'admission-edit', log };
  }

  openContactViewer(log: ContactLog): void {
    this.activeModal = { kind: 'contact', log };
  }

  closeModal(): void {
    this.activeModal = null;
    this.admissionEditDraft = null;
  }

  async saveAdmissionEdit(): Promise<void> {
    if (!this.admissionEditDraft) {
      return;
    }

    this.isSavingAdmission = true;

    try {
      const { id, createdAt, ...updates } = this.admissionEditDraft;
      await this.admissionLogService.updateLog(id, updates);
      this.toastService.success('Admission log updated successfully.');
      this.closeModal();
    } catch {
      this.toastService.error('Admission log could not be updated.');
    } finally {
      this.isSavingAdmission = false;
    }
  }

  setPendingDelete(target: DeleteTarget): void {
    this.pendingDelete =
      this.pendingDelete?.kind === target?.kind && this.pendingDelete?.id === target?.id ? null : target;
  }

  isPendingDelete(kind: DeleteKind, id: string): boolean {
    return this.pendingDelete?.kind === kind && this.pendingDelete.id === id;
  }

  setMediaFilter(filter: MediaKind | 'all'): void {
    this.mediaFilter = filter;
    this.setPageNumber('media', 1);
  }

  setMediaSearch(value: string): void {
    this.mediaSearch = value;
    this.setPageNumber('media', 1);
  }

  setMediaPickerSearch(value: string): void {
    this.mediaPickerSearch = value;
    this.setPageNumber('mediaPicker', 1);
  }

  setAdmissionSearch(value: string): void {
    this.admissionSearch = value;
    this.setPageNumber('admissions', 1);
  }

  setContactSearch(value: string): void {
    this.contactSearch = value;
    this.setPageNumber('contacts', 1);
  }

  closeMediaDialog(): void {
    this.mediaPickerSearch = '';
    this.mediaDialogService.close(null);
  }

  selectDialogMedia(asset: MediaAsset): void {
    this.mediaPickerSearch = '';
    this.mediaDialogService.close(asset);
  }

  async uploadAndSelectDialogMedia(): Promise<void> {
    const dialog = this.mediaDialog();

    if (!dialog) {
      return;
    }

    const accept = dialog.allowedKinds.length === 1 && dialog.allowedKinds[0] === 'image'
      ? 'image/*'
      : dialog.allowedKinds.every((kind) => kind !== 'image')
        ? '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt'
        : 'image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt';

    const files = await this.pickFiles(accept);

    if (!files.length) {
      return;
    }

    try {
      const asset = await this.mediaLibraryService.uploadFile(files[0]);
      this.toastService.success('Media uploaded to the shared library.');
      this.selectDialogMedia(asset);
    } catch {
      this.toastService.error('Media upload failed.');
    }
  }

  get activePage(): PageConfig {
    return this.pageConfigs.find((page) => page.key === this.selectedPageKey) ?? this.pageConfigs[0];
  }

  get websiteContentTabs(): WebsiteContentTab[] {
    return [...this.pageConfigs.map((page) => ({ ...page, route: page.route })), OTHER_CONTENT_TAB];
  }

  get activeWebsiteContentTab(): WebsiteContentTab {
    return this.websiteContentTabs.find((tab) => tab.key === this.selectedWebsiteTab) ?? this.websiteContentTabs[0];
  }

  get isOtherContentTabSelected(): boolean {
    return this.selectedWebsiteTab === 'otherContent';
  }

  get currentSectionMeta(): AdminSection {
    return this.sections.find((section) => section.key === this.selectedSection) ?? this.sections[0];
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

  get paginatedSections(): AdminSection[] {
    return this.paginate(this.sections, 'sidebar', 5);
  }

  get paginatedPages(): PageConfig[] {
    return this.paginate(this.pageConfigs, 'pageTabs', 4);
  }

  get paginatedWebsiteTabs(): WebsiteContentTab[] {
    return this.paginate(this.websiteContentTabs, 'pageTabs', 4);
  }

  get paginatedContentSections(): PageSectionConfig[] {
    return this.paginate(this.activePage.sections, 'sectionTabs', 6);
  }

  get filteredMediaAssets(): MediaAsset[] {
    const searchValue = this.mediaSearch.trim().toLowerCase();

    return this.mediaLibraryService.assets().filter((asset) => {
      const matchesFilter = this.mediaFilter === 'all' || asset.kind === this.mediaFilter;
      const matchesSearch =
        !searchValue ||
        [asset.name, asset.contentType, asset.extension]
          .join(' ')
          .toLowerCase()
          .includes(searchValue);

      return matchesFilter && matchesSearch;
    });
  }

  get paginatedMediaAssets(): MediaAsset[] {
    return this.paginate(this.filteredMediaAssets, 'media', 8);
  }

  get filteredAdmissionLogs(): AdmissionLog[] {
    const searchValue = this.admissionSearch.trim().toLowerCase();

    return this.admissionLogService.logs().filter((log) => {
      if (!searchValue) {
        return true;
      }

      return [
        log.fullName,
        log.currentClass,
        log.desiredCourse,
        log.schoolName,
        log.board,
        log.phone,
        log.city,
        log.state,
        log.status,
        log.adminNotes
      ]
        .join(' ')
        .toLowerCase()
        .includes(searchValue);
    });
  }

  get paginatedAdmissionLogs(): AdmissionLog[] {
    return this.paginate(this.filteredAdmissionLogs, 'admissions', 8);
  }

  get filteredContactLogs(): ContactLog[] {
    const searchValue = this.contactSearch.trim().toLowerCase();

    return this.contactLogService.logs().filter((log) => {
      if (!searchValue) {
        return true;
      }

      return [log.studentName, log.classLevel, log.goal, log.phone]
        .join(' ')
        .toLowerCase()
        .includes(searchValue);
    });
  }

  get paginatedContactLogs(): ContactLog[] {
    return this.paginate(this.filteredContactLogs, 'contacts', 8);
  }

  get dialogMediaAssets(): MediaAsset[] {
    const dialog = this.mediaDialog();

    if (!dialog) {
      return [];
    }

    const searchValue = this.mediaPickerSearch.trim().toLowerCase();

    return this.paginate(
      this.mediaLibraryService.assets().filter((asset) => {
        const matchesKind = dialog.allowedKinds.includes(asset.kind);
        const matchesSearch =
          !searchValue ||
          [asset.name, asset.contentType, asset.extension].join(' ').toLowerCase().includes(searchValue);

        return matchesKind && matchesSearch;
      }),
      'mediaPicker',
      6
    );
  }

  get dialogMediaAssetCount(): number {
    const dialog = this.mediaDialog();

    if (!dialog) {
      return 0;
    }

    const searchValue = this.mediaPickerSearch.trim().toLowerCase();

    return this.mediaLibraryService.assets().filter((asset) => {
      const matchesKind = dialog.allowedKinds.includes(asset.kind);
      const matchesSearch =
        !searchValue ||
        [asset.name, asset.contentType, asset.extension].join(' ').toLowerCase().includes(searchValue);

      return matchesKind && matchesSearch;
    }).length;
  }

  get mediaModal(): Extract<NonNullable<ModalState>, { kind: 'media' }> | null {
    return this.activeModal?.kind === 'media' ? this.activeModal : null;
  }

  get admissionViewModal(): Extract<NonNullable<ModalState>, { kind: 'admission-view' }> | null {
    return this.activeModal?.kind === 'admission-view' ? this.activeModal : null;
  }

  get admissionEditModal(): Extract<NonNullable<ModalState>, { kind: 'admission-edit' }> | null {
    return this.activeModal?.kind === 'admission-edit' ? this.activeModal : null;
  }

  get contactModal(): Extract<NonNullable<ModalState>, { kind: 'contact' }> | null {
    return this.activeModal?.kind === 'contact' ? this.activeModal : null;
  }

  get pageCount(): number {
    return this.pageConfigs.length;
  }

  get sectionCount(): number {
    return this.pageConfigs.reduce((total, page) => total + page.sections.length, 0);
  }

  get mediaCount(): number {
    return this.mediaLibraryService.assets().length;
  }

  get admissionCount(): number {
    return this.admissionLogService.logs().length;
  }

  get contactCount(): number {
    return this.contactLogService.logs().length;
  }

  get imageCount(): number {
    return this.countImages(this.draft);
  }

  get textFieldCount(): number {
    return this.countTextFields(this.draft);
  }

  get recentAdmissions(): AdmissionLog[] {
    return this.admissionLogService.logs().slice(0, 4);
  }

  get recentContacts(): ContactLog[] {
    return this.contactLogService.logs().slice(0, 4);
  }

  get recentMedia(): MediaAsset[] {
    return this.mediaLibraryService.assets().slice(0, 4);
  }

  admissionOptions(fieldKey: AdmissionOptionFieldKey): string[] {
    return this.draft.admission.form[fieldKey];
  }

  updateAdmissionOption(fieldKey: AdmissionOptionFieldKey, index: number, value: string): void {
    this.draft.admission.form[fieldKey][index] = value;
  }

  setNewAdmissionOptionDraft(fieldKey: AdmissionOptionFieldKey, value: string): void {
    this.newAdmissionOptionDraft[fieldKey] = value;
  }

  addAdmissionOption(fieldKey: AdmissionOptionFieldKey): void {
    const value = this.newAdmissionOptionDraft[fieldKey].trim();

    if (!value) {
      this.toastService.error('Enter an option value before adding.');
      return;
    }

    const hasDuplicate = this.admissionOptions(fieldKey).some(
      (item) => item.trim().toLowerCase() === value.toLowerCase()
    );

    if (hasDuplicate) {
      this.toastService.error('This option already exists.');
      return;
    }

    this.draft.admission.form[fieldKey].push(value);
    this.newAdmissionOptionDraft[fieldKey] = '';
    this.toastService.success('Option added to draft content.');
  }

  removeAdmissionOption(fieldKey: AdmissionOptionFieldKey, index: number): void {
    this.draft.admission.form[fieldKey].splice(index, 1);
    this.toastService.info('Option removed from draft content.');
  }

  mediaReferenceCount(asset: MediaAsset): number {
    return this.contentService.countMediaReferences(asset.url);
  }

  deletePromptText(kind: DeleteKind, assetOrLog: MediaAsset | AdmissionLog | ContactLog): string {
    if (kind === 'media') {
      const asset = assetOrLog as MediaAsset;
      const referenceCount = this.mediaReferenceCount(asset);
      return referenceCount > 0
        ? `Delete this asset? ${referenceCount} content reference${referenceCount > 1 ? 's still point to it.' : ' still points to it.'}`
        : 'Delete this asset from Firebase Storage and Media Libraries?';
    }

    if (kind === 'admission') {
      return 'Delete this admission log?';
    }

    return 'Delete this contact log?';
  }

  formatDate(timestamp: number): string {
    if (!timestamp) {
      return 'N/A';
    }

    return new Date(timestamp).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }

  formatFileSize(size: number): string {
    if (!size) {
      return '0 KB';
    }

    if (size < 1024 * 1024) {
      return `${Math.max(1, Math.round(size / 1024))} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  isPreviewableImage(asset: MediaAsset): boolean {
    return asset.kind === 'image';
  }

  canPreviewInFrame(asset: MediaAsset): boolean {
    return asset.kind === 'document' && asset.extension === 'pdf';
  }

  getSafeMediaUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  statusLabel(status: AdmissionStatus): string {
    return status.replace(/-/g, ' ').replace(/^\w/, (value) => value.toUpperCase());
  }

  private paginate<T>(items: T[], key: PaginationKey, pageSize: number): T[] {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const currentPage = Math.min(this.paginationState[key], totalPages);

    if (currentPage !== this.paginationState[key]) {
      this.paginationState[key] = currentPage;
    }

    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
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

  private pickFiles(accept: string, multiple = false): Promise<File[]> {
    if (typeof document === 'undefined') {
      return Promise.resolve([]);
    }

    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.multiple = multiple;

      input.onchange = () => {
        resolve(Array.from(input.files ?? []));
      };

      input.click();
    });
  }
}
