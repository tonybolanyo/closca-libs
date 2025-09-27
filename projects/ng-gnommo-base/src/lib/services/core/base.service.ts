import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../../models/base.model';

@Injectable()
export abstract class BaseService<T extends BaseModel> {
  
  protected url: string = '';
  protected endpoint: string = '';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected http: HttpClient) {}

  protected setApiConfig(url: string, endpoint: string): void {
    this.url = url;
    this.endpoint = endpoint;
  }

  getAll(headers?: any): Observable<T[]> {
    const options = this.createHttpHeaders(headers);
    return this.http.get<T[]>(`${this.url}/${this.endpoint}`, options);
  }

  getById(_id: string, headers?: any): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.get<T>(`${this.url}/${this.endpoint}/${_id}`, options);
  }

  create(item: T, headers?: any): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.post<T>(`${this.url}/${this.endpoint}`, item, options);
  }

  update(_id: string, item: T, headers?: any): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.patch<T>(`${this.url}/${this.endpoint}/${_id}`, item, options);
  }

  updateComplete(_id: string, item: T, headers?: any): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.put<T>(`${this.url}/${this.endpoint}/${_id}`, item, options);
  }

  delete(_id: string, headers?: any): Observable<any> {
    const options = this.createHttpHeaders(headers);
    return this.http.delete(`${this.url}/${this.endpoint}/${_id}`, options);
  }

  createHttpHeaders(headers?: any): { headers: HttpHeaders } {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (headers) {
      Object.keys(headers).forEach(key => {
        httpHeaders = httpHeaders.set(key, headers[key]);
      });
    }

    return { headers: httpHeaders };
  }

  httpHeadersWithoutAuth(headers?: any): { headers: HttpHeaders } {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (headers) {
      Object.keys(headers).forEach(key => {
        if (key.toLowerCase() !== 'authorization') {
          httpHeaders = httpHeaders.set(key, headers[key]);
        }
      });
    }

    return { headers: httpHeaders };
  }
}