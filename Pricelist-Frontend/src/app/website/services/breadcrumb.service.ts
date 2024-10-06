import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbSource = new BehaviorSubject<{ label: string, url: string }[]>([]);
  private breadcrumbsSubject = new BehaviorSubject<{ label: string; url: string }[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();


  setBreadcrumb(...labelsAndUrls: (string | { label: string; url: string })[]): void {
    const breadcrumbs = labelsAndUrls.map(labelOrUrl => {
      if (typeof labelOrUrl === 'string') {
        return { label: labelOrUrl, url: '' };
      } else {
        return labelOrUrl;
      }
    });
    this.breadcrumbsSubject.next(breadcrumbs);
  }


  updateBreadcrumb(breadcrumbs: { label: string, url: string }[]): void {
    this.breadcrumbSource.next(breadcrumbs);
  }
}
