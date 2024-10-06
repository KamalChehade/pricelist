import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductImage } from '../models/product-image';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  private baseUrl = `${environment.apiUrl}/product-images`; // Update the URL with apiUrl from environment

  constructor(private http: HttpClient) { }

  getProductImageById(id: number): Observable<ProductImage> {
    return this.http.get<ProductImage>(`${this.baseUrl}/${id}/image`);
  }

  getProductImagesByProductId(productId: number): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>(`${this.baseUrl}/${productId}`);
  }

  uploadProductImages(productId: number, files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]); // Ensure 'files' is the correct key expected by your backend
    }
    return this.http.post<any>(`${this.baseUrl}/${productId}/uploadImage`, formData);
  }

  updateProductImage(id: number, updatedProductImage: ProductImage): Observable<ProductImage> {
    return this.http.put<ProductImage>(`${this.baseUrl}/${id}`, updatedProductImage);
  }

  deleteProductImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
