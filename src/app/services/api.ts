import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api/customer';
  private token: string | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.token = await this.storage.get('token');
  }

  setToken(token: string) {
    this.token = token;
    this.storage.set('token', token);
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
  }

  // AUTH
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  // MENU
  getMenus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/menu`, this.getHeaders());
  }

  // CHECKOUT
  checkout(items: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, { items }, this.getHeaders());
  }
}
