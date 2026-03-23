import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-admin-pagination',
  standalone: true,
  template: `
    @if (totalPages() > 1) {
      <div class="admin-pagination">
        <button type="button" (click)="selectPage(currentPage() - 1)" [disabled]="currentPage() === 1">
          Prev
        </button>

        <div class="admin-pagination__pages">
          @for (page of visiblePages(); track page) {
            <button
              type="button"
              [class.admin-pagination__page--active]="page === currentPage()"
              (click)="selectPage(page)"
            >
              {{ page }}
            </button>
          }
        </div>

        <button type="button" (click)="selectPage(currentPage() + 1)" [disabled]="currentPage() === totalPages()">
          Next
        </button>
      </div>
    }
  `,
  styles: [
    `
      .admin-pagination {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        gap: 0.45rem;
      }

      .admin-pagination button {
        border: 1px solid rgba(31, 24, 20, 0.1);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.86);
        padding: 0.5rem 0.82rem;
        font-size: 0.76rem;
        font-weight: 700;
        color: #241d17;
        cursor: pointer;
      }

      .admin-pagination button[disabled] {
        cursor: not-allowed;
        opacity: 0.45;
      }

      .admin-pagination__pages {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }

      .admin-pagination__page--active {
        border-color: rgba(234, 122, 21, 0.28) !important;
        background: rgba(234, 122, 21, 0.12) !important;
        color: #b65d0b !important;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPaginationComponent {
  readonly totalItems = input.required<number>();
  readonly currentPage = input(1);
  readonly pageSize = input(6);
  readonly pageChange = output<number>();

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())));
  readonly visiblePages = computed(() => {
    const totalPages = this.totalPages();
    const currentPage = Math.min(Math.max(this.currentPage(), 1), totalPages);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  });

  selectPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }

    this.pageChange.emit(page);
  }
}
