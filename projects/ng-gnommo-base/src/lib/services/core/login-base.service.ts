import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../../models/base.model';
import { BaseService } from './base.service';
import { 
  LoginCredentials, 
  PasswordRecoveryRequest, 
  PasswordResetRequest, 
  AuthenticationResponse,
  HttpHeaderMap 
} from '../../interfaces/http-types.interface';

@Injectable()
export class LoginBaseService<T extends BaseModel> extends BaseService<T> {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  initializeConfig(url: string, endpoint: string): void {
    this.setApiConfig(url, endpoint);
  }

  login(credentials: LoginCredentials, headers?: HttpHeaderMap): Observable<AuthenticationResponse> {
    const options = this.createHttpHeaders(headers);
    return this.http.post<AuthenticationResponse>(`${this.url}/${this.endpoint}/login`, credentials, options);
  }

  passwordRecovery(email: string, headers?: HttpHeaderMap): Observable<AuthenticationResponse> {
    const options = this.createHttpHeaders(headers);
    const request: PasswordRecoveryRequest = { email };
    return this.http.post<AuthenticationResponse>(`${this.url}/${this.endpoint}/reset`, request, options);
  }

  resetPassword(newPassword: string, hash: string, headers?: HttpHeaderMap): Observable<AuthenticationResponse> {
    const options = this.createHttpHeaders(headers);
    const request: PasswordResetRequest = { newPassword, hash };
    return this.http.post<AuthenticationResponse>(`${this.url}/${this.endpoint}/reset-password`, request, options);
  }

  getCurrentUser(token: string, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.get<T>(`${this.url}/${this.endpoint}/me`, options);
  }

  register(item: T, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.post<T>(`${this.url}/${this.endpoint}/register`, item, options);
  }
}