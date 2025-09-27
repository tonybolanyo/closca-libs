import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../../models/base.model';
import { BaseService } from './base.service';

@Injectable()
export class LoginBaseService<T extends BaseModel> extends BaseService<T> {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  initializeConfig(url: string, endpoint: string): void {
    this.setApiConfig(url, endpoint);
  }

  login(credentials: any, headers?: any): Observable<any> {
    const options = this.createHttpHeaders(headers);
    return this.http.post(`${this.url}/${this.endpoint}/login`, credentials, options);
  }

  passwordRecovery(email: any, headers?: any): Observable<any> {
    const options = this.createHttpHeaders(headers);
    return this.http.post(`${this.url}/${this.endpoint}/reset`, { email }, options);
  }

  resetPassword(newPassword: any, hash: any, headers?: any): Observable<any> {
    const options = this.createHttpHeaders(headers);
    return this.http.post(`${this.url}/${this.endpoint}/reset-password`, { 
      newPassword, 
      hash 
    }, options);
  }

  getCurrentUser(token: any, headers?: any): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.get<T>(`${this.url}/${this.endpoint}/me`, options);
  }

  register(item: T, headers?: any): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.post<T>(`${this.url}/${this.endpoint}/register`, item, options);
  }
}