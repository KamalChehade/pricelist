import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environment/environment';
import { Promo } from '../models/models/promo';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`; // Update the URL to use apiUrl from environment

  constructor(private http: HttpClient) { }

  searchProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params: { query } });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getAllProductsWithImages(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/withImages`);
  }

  getProductImage(productId: number): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/products/${productId}/image`, { responseType: 'blob' });
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    const url = `${this.apiUrl}/byCategory/${categoryId}`;
    return this.http.get<Product[]>(url);
  }

  getProductsBySubcategoryId(subcategoryId: number): Observable<Product[]> {
    const url = `${this.apiUrl}/bySubcategory/${subcategoryId}`;
    return this.http.get<Product[]>(url);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<Product>(url, product);
  }

  updateProductIsNew(productId: number, isNew: boolean): Observable<void> {
    const url = `${this.apiUrl}/${productId}/isNew`;
    return this.http.put<void>(url, isNew);
  }

  updateProductOnDiscount(productId: number, onDiscount: boolean): Observable<void> {
    const url = `${this.apiUrl}/${productId}/onDiscount`;
    return this.http.put<void>(url, { onDiscount });
  }

  updateProductMoq(productId: number, moq: boolean): Observable<void> {
    const url = `${this.apiUrl}/${productId}/moq`;
    return this.http.put<void>(url, { moq });
  }

  updateProductDiscountPrice(productId: number, discountPrice: number): Observable<void> {
    const url = `${this.apiUrl}/${productId}/discountPrice`;
    return this.http.put<void>(url, discountPrice);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  uploadProductImage(id: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const uploadUrl = `${this.apiUrl}/${id}/uploadImage`;
    return this.http.post<any>(uploadUrl, formData);
  }

  uploadProductAdvertisementImage(productId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const uploadUrl = `${this.apiUrl}/advertisement/${productId}/uploadImage`;
    return this.http.post<any>(uploadUrl, formData);
  }

  updateProductStatus(productId: number, status: boolean): Observable<void> {
    const url = `${this.apiUrl}/${productId}/status`;
    return this.http.put<void>(url, status);
  }

  getProductStatus(productId: number): Observable<boolean> {
    const url = `${this.apiUrl}/${productId}/status`;
    return this.http.get<boolean>(url);
  }

  getSuggestions(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/products/suggestions`, { params: { query } });
  }

  getCategoryByProductId(productId: number): Observable<string> {
    const url = `${this.apiUrl}/${productId}/category`;
    return this.http.get(url, { responseType: 'text' });
  }

  updateProductIsAdvertised(productId: number, isAdvertised: boolean): Observable<void> {
    const url = `${this.apiUrl}/${productId}/isAdvertised`;
    return this.http.put<void>(url, isAdvertised).pipe(
      catchError(error => {
        console.error('Error updating isAdvertised:', error);
        throw error; // Rethrow the error to propagate it
      })
    );
  }

  getProductsByIds(ids: number[]): Observable<Product[]> {
    const params = { ids: ids.join(',') };
    return this.http.get<Product[]>(`${this.apiUrl}/byIds`, { params });
  }

  getProductPromos(productId: number): Observable<Promo[]> {
    const url = `${environment.apiUrl}/promos/products/${productId}`;
    return this.http.get<Promo[]>(url);
  }

  getBrandIdByProductId(productId: number): Observable<number> {
    const url = `${this.apiUrl}/${productId}/brand-id`;
    return this.http.get<number>(url);
  }

  // New method to get product name by ID
  getProductNameById(productId: number): Observable<string> {
    const url = `${this.apiUrl}/${productId}/name`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }
  getYoutubeLink(productId: number): Observable<string> {
    const url = `${this.apiUrl}/${productId}/youtubeLink`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }
  // New method to update YouTube link and receive the embedded iframe
  updateYoutubeLink(productId: number, youtubeLink: string): Observable<string> {
    const url = `${this.apiUrl}/${productId}/youtubeLink`;
    return this.http.put<string>(url, { youtubeLink }, { responseType: 'text' as 'json' });
  }

  // New method to update additional description
  getAdditionalDescription(productId: number): Observable<string> {
    const url = `${this.apiUrl}/${productId}/additionalDescription`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }
  updateAdditionalDescription(productId: number, additionalDescription: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}/additionalDescription`;
    return this.http.put<Product>(url, { additionalDescription });
  }
}
