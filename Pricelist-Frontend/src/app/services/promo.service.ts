// src/app/services/promo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Promo } from '../models/models/promo';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  private baseUrl = environment.apiUrl; // Update baseUrl to use apiUrl from environment

  constructor(private http: HttpClient) { }

  createPromo(promo: Promo): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/promos`, promo);
  }

  updatePromo(promo: Promo): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/promos/${promo.id}`, promo);
  }

  getPromoList(): Observable<Promo[]> {
    return this.http.get<Promo[]>(`${this.baseUrl}/promos`);
  }

  getPromo(id: number): Observable<Promo> {
    return this.http.get<Promo>(`${this.baseUrl}/promos/${id}`);
  }
  getProductPromos(productId: number): Observable<any[]> {
    const url = `${this.baseUrl}/promos/products/${productId}`; // Adjust URL according to your API endpoint
    return this.http.get<any[]>(url);
  }
  deletePromo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/promos/${id}`);
  }

  // Add additional methods as needed

}
