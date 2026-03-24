import { ChangeDetectionStrategy, Component, HostListener, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

import { MediaLibraryService } from '../media-library.service';
import { ToastService } from '../toast/toast.service';
import type { MediaKind } from '../data-records.model';
import { AdminMediaDialogService } from './admin-media-dialog.service';

type EditableRecord = Record<string, unknown>;

type ObjectEntry = {
  key: string;
  value: unknown;
  prototype: unknown;
};

@Component({
  selector: 'app-admin-content-editor',
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './admin-content-editor.component.html',
  styleUrl: './admin-content-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContentEditorComponent {
  private readonly mediaLibraryService = inject(MediaLibraryService);
  private readonly mediaDialogService = inject(AdminMediaDialogService);
  private readonly toastService = inject(ToastService);

  readonly label = input.required<string>();
  readonly rawKey = input.required<string>();
  readonly model = input.required<unknown>();
  readonly prototype = input<unknown>(undefined);
  readonly parent = input<unknown | null>(null);
  readonly keyOrIndex = input<string | number | null>(null);
  readonly depth = input(0);

  previewImageUrl: string | null = null;
  previewImageLabel = '';
  private readonly failedImageUrls = new Set<string>();

  isRecord(value: unknown): value is EditableRecord {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
  }

  isNumber(value: unknown): value is number {
    return typeof value === 'number';
  }

  objectEntries(value: unknown, prototype: unknown): ObjectEntry[] {
    if (!this.isRecord(value)) {
      return [];
    }

    const valueKeys = Object.keys(value);
    const prototypeKeys = this.isRecord(prototype) ? Object.keys(prototype) : [];
    const mergedKeys = [...valueKeys, ...prototypeKeys.filter((key) => !valueKeys.includes(key))];

    return mergedKeys.map((key) => {
      const prototypeValue = this.isRecord(prototype) ? prototype[key] : undefined;
      const hasOwnValue = Object.prototype.hasOwnProperty.call(value, key);

      return {
        key,
        value: hasOwnValue ? value[key] : this.createEmptyValue(prototypeValue),
        prototype: prototypeValue
      };
    });
  }

  humanize(value: string): string {
    return value
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/^\w/, (character) => character.toUpperCase());
  }

  fieldIconClass(rawKey: string, value: unknown): string {
    if (this.isImageField(rawKey, value)) {
      return 'fa-regular fa-image';
    }

    if (this.isMediaField(rawKey, value)) {
      return 'fa-regular fa-file-lines';
    }

    if (this.isBoolean(value)) {
      return 'fa-solid fa-toggle-on';
    }

    if (this.isNumber(value)) {
      return 'fa-solid fa-hashtag';
    }

    if (this.usesTextarea(rawKey, value)) {
      return 'fa-regular fa-pen-to-square';
    }

    if (/(title|heading|label|name)/i.test(rawKey)) {
      return 'fa-solid fa-heading';
    }

    if (/(phone|mobile)/i.test(rawKey)) {
      return 'fa-solid fa-phone';
    }

    if (/(email)/i.test(rawKey)) {
      return 'fa-regular fa-envelope';
    }

    if (/(address|location|city|state)/i.test(rawKey)) {
      return 'fa-solid fa-location-dot';
    }

    return 'fa-solid fa-keyboard';
  }

  isWideField(rawKey: string, value: unknown): boolean {
    return this.isMediaField(rawKey, value) || this.usesTextarea(rawKey, value);
  }

  summarizeItem(value: unknown, index: number): string {
    if (typeof value === 'string') {
      return value.trim() || `Item ${index + 1}`;
    }

    if (this.isRecord(value)) {
      const preferredKeys = ['title', 'name', 'label', 'heading', 'question', 'email', 'fullName'];

      for (const key of preferredKeys) {
        const candidate = value[key];
        if (typeof candidate === 'string' && candidate.trim()) {
          return candidate;
        }
      }
    }

    return `Item ${index + 1}`;
  }

  usesTextarea(rawKey: string, value: unknown): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    const normalizedKey = rawKey.toLowerCase();
    return (
      value.length > 90 ||
      value.includes('\n') ||
      ['description', 'summary', 'copy', 'note', 'body', 'quote', 'address', 'bio'].some((token) =>
        normalizedKey.includes(token)
      )
    );
  }

  isImageField(rawKey: string, value: unknown): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    const normalizedKey = rawKey.toLowerCase();
    return (
      /(image|photo|avatar|logo|src|poster)/.test(normalizedKey) ||
      /\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i.test(value)
    );
  }

  isMediaField(rawKey: string, value: unknown): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    const normalizedKey = rawKey.toLowerCase();

    return (
      this.isImageField(rawKey, value) ||
      /(document|file|brochure|pdf|attachment|banner)/.test(normalizedKey) ||
      /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt)(\?.*)?$/i.test(value)
    );
  }

  imageUrl(value: unknown): string {
    if (typeof value !== 'string') {
      return '';
    }

    return value.trim();
  }

  isImagePreviewBroken(url: string): boolean {
    return this.failedImageUrls.has(url);
  }

  markImagePreviewBroken(url: string): void {
    if (!url) {
      return;
    }

    this.failedImageUrls.add(url);
  }

  markImagePreviewLoaded(url: string): void {
    if (!url) {
      return;
    }

    this.failedImageUrls.delete(url);
  }

  openImagePreview(url: unknown, label: string): void {
    const normalizedUrl = this.imageUrl(url);

    if (!normalizedUrl) {
      this.toastService.error('Image URL is empty.');
      return;
    }

    this.previewImageUrl = normalizedUrl;
    this.previewImageLabel = label;
  }

  closeImagePreview(): void {
    this.previewImageUrl = null;
    this.previewImageLabel = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.previewImageUrl) {
      return;
    }

    this.closeImagePreview();
  }

  mediaKindsForField(rawKey: string, value: unknown): MediaKind[] {
    if (this.isImageField(rawKey, value)) {
      return ['image'];
    }

    const normalizedKey = rawKey.toLowerCase();

    if (/(document|file|brochure|pdf|attachment)/.test(normalizedKey)) {
      return ['document', 'other'];
    }

    return ['image', 'document', 'other'];
  }

  mediaAcceptValue(rawKey: string, value: unknown): string {
    const allowedKinds = this.mediaKindsForField(rawKey, value);

    if (allowedKinds.length === 1 && allowedKinds[0] === 'image') {
      return 'image/*';
    }

    if (allowedKinds.every((kind) => kind !== 'image')) {
      return '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt';
    }

    return 'image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt';
  }

  async chooseMediaFromLibrary(
    parent: unknown,
    keyOrIndex: string | number | null,
    rawKey: string,
    label: string,
    currentValue: unknown
  ): Promise<void> {
    const asset = await this.mediaDialogService.open({
      title: `Select ${label}`,
      description: 'Choose an existing item from Media Libraries.',
      allowedKinds: this.mediaKindsForField(rawKey, currentValue),
      currentUrl: typeof currentValue === 'string' ? currentValue : ''
    });

    if (!asset) {
      return;
    }

    this.updatePrimitive(parent, keyOrIndex, asset.url);
  }

  async uploadMediaForField(
    parent: unknown,
    keyOrIndex: string | number | null,
    rawKey: string,
    currentValue: unknown
  ): Promise<void> {
    const files = await this.pickFiles(this.mediaAcceptValue(rawKey, currentValue));

    if (!files.length) {
      return;
    }

    try {
      const asset = await this.mediaLibraryService.uploadFile(files[0]);
      this.updatePrimitive(parent, keyOrIndex, asset.url);
      this.toastService.success('Media uploaded and linked successfully.');
    } catch {
      this.toastService.error('Media upload failed.');
    }
  }

  async replaceMediaForField(
    parent: unknown,
    keyOrIndex: string | number | null,
    rawKey: string,
    currentValue: unknown
  ): Promise<void> {
    await this.uploadMediaForField(parent, keyOrIndex, rawKey, currentValue);
  }

  inputType(rawKey: string): string {
    const normalizedKey = rawKey.toLowerCase();

    if (/(email)/.test(normalizedKey)) {
      return 'email';
    }

    if (/(phone|mobile)/.test(normalizedKey)) {
      return 'tel';
    }

    if (/(url|href|path|src)/.test(normalizedKey)) {
      return 'url';
    }

    return 'text';
  }

  updatePrimitive(parent: unknown, keyOrIndex: string | number | null, value: string | number | boolean): void {
    if (parent === null || keyOrIndex === null) {
      return;
    }

    if (Array.isArray(parent) && typeof keyOrIndex === 'number') {
      parent[keyOrIndex] = value;
      return;
    }

    if (this.isRecord(parent) && typeof keyOrIndex === 'string') {
      parent[keyOrIndex] = value;
    }
  }

  addArrayItem(array: unknown[], prototype: unknown): void {
    const sample = Array.isArray(prototype) && prototype.length > 0 ? prototype[0] : array[0] ?? '';
    array.push(this.createEmptyValue(sample));
  }

  arrayPrototypeItem(prototype: unknown, index: number): unknown {
    return Array.isArray(prototype) ? prototype[index] ?? prototype[0] : undefined;
  }

  removeArrayItem(array: unknown[], index: number): void {
    array.splice(index, 1);
  }

  private pickFiles(accept: string): Promise<File[]> {
    if (typeof document === 'undefined') {
      return Promise.resolve([]);
    }

    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;

      input.onchange = () => {
        resolve(Array.from(input.files ?? []));
      };

      input.click();
    });
  }

  private createEmptyValue(value: unknown): unknown {
    if (Array.isArray(value)) {
      return [];
    }

    if (this.isRecord(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, entryValue]) => [key, this.createEmptyValue(entryValue)])
      );
    }

    if (typeof value === 'boolean') {
      return false;
    }

    if (typeof value === 'number') {
      return 0;
    }

    return '';
  }
}
