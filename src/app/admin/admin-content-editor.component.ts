import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

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
  readonly label = input.required<string>();
  readonly rawKey = input.required<string>();
  readonly model = input.required<unknown>();
  readonly prototype = input<unknown>(undefined);
  readonly parent = input<unknown | null>(null);
  readonly keyOrIndex = input<string | number | null>(null);
  readonly depth = input(0);

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

    return Object.entries(value).map(([key, entryValue]) => ({
      key,
      value: entryValue,
      prototype: this.isRecord(prototype) ? prototype[key] : undefined
    }));
  }

  humanize(value: string): string {
    return value
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/^\w/, (character) => character.toUpperCase());
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
