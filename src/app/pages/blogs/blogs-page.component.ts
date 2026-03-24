import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { BlogPost } from '../../data-records.model';
import { BlogService } from '../../blog.service';
import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { MotionPageDirective } from '../../directives/motion-page.directive';
import { SiteContentService } from '../../site-content.service';

@Component({
  selector: 'app-blogs-page',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, MotionPageDirective],
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsPageComponent {
  readonly content = inject(SiteContentService).content;
  private readonly blogService = inject(BlogService);

  readonly publishedPosts = computed(() =>
    this.blogService
      .posts()
      .filter((post) => post.isPublished)
      .sort(
        (first, second) =>
          (second.publishedAt || second.updatedAt || second.createdAt) -
          (first.publishedAt || first.updatedAt || first.createdAt)
      )
  );

  formatDate(timestamp: number): string {
    if (!timestamp) {
      return 'Draft';
    }

    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  previewText(post: BlogPost): string {
    const excerpt = post.excerpt.trim();

    if (excerpt) {
      return excerpt;
    }

    const copy = post.content.trim().replace(/\s+/g, ' ');
    return copy.length > 170 ? `${copy.slice(0, 167)}...` : copy;
  }

  readingDuration(content: string): string {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 220));
    return `${minutes} min read`;
  }
}
