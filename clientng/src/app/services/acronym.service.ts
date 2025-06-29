import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acronym } from '../models/acronym.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcronymService {
  private apiUrl = `${environment.apiUrl}/acronyms`;

  constructor(private http: HttpClient) {}

  /**
   * Get all acronyms
   */
  getAll(): Observable<Acronym[]> {
    return this.http.get<Acronym[]>(this.apiUrl);
  }

  /**
   * Search acronyms by acronym text or definition
   */
  search(query: string, type: 'acronym' | 'definition'): Observable<Acronym[]> {
    let params = new HttpParams();
    params = params.set(type, query);

    return this.http.get<Acronym[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Create a new acronym
   */
  create(acronym: Omit<Acronym, 'id'>): Observable<Acronym> {
    return this.http.post<Acronym>(this.apiUrl, acronym);
  }

  /**
   * Update an existing acronym
   */
  update(id: number, acronym: Omit<Acronym, 'id'>): Observable<Acronym> {
    return this.http.put<Acronym>(`${this.apiUrl}/${id}`, acronym);
  }

  /**
   * Delete an acronym
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
