import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = `${environment.apiUrl}/images`; // Update the URL to use apiUrl from environment

  constructor(private http: HttpClient) { }

  getImage(filename: string): Observable<Blob> {
    const imageUrl = `${this.apiUrl}/${filename}`;
    return this.http.get(imageUrl, { responseType: 'blob' });
  }
  getProductImageUrl(productId: number): Observable<string> {
    const imageUrl = `${this.apiUrl}/${productId}/imageUrl`;
    return this.http.get<string>(imageUrl);
  }
}
