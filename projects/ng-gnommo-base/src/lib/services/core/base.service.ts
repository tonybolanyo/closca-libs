import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../../models/base.model';
import { HttpHeaderMap } from '../../interfaces/http-types.interface';

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

  getAll(headers?: HttpHeaderMap): Observable<T[]> {
    const options = this.createHttpHeaders(headers);
    return this.http.get<T[]>(`${this.url}/${this.endpoint}`, options);
  }

  getById(_id: string, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.get<T>(`${this.url}/${this.endpoint}/${_id}`, options);
  }

  create(item: T, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.post<T>(`${this.url}/${this.endpoint}`, item, options);
  }

  update(_id: string, item: T, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.patch<T>(`${this.url}/${this.endpoint}/${_id}`, item, options);
  }

  updateComplete(_id: string, item: T, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.put<T>(`${this.url}/${this.endpoint}/${_id}`, item, options);
  }

  delete(_id: string, headers?: HttpHeaderMap): Observable<void> {
    const options = this.createHttpHeaders(headers);
    return this.http.delete<void>(`${this.url}/${this.endpoint}/${_id}`, options);
  }

  createHttpHeaders(headers?: HttpHeaderMap): { headers: HttpHeaders } {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (headers) {
      Object.keys(headers).forEach(key => {
        const value = headers[key];
        if (typeof value === 'string') {
          httpHeaders = httpHeaders.set(key, value);
        } else if (Array.isArray(value)) {
          httpHeaders = httpHeaders.set(key, value.join(', '));
        }
      });
    }

    return { headers: httpHeaders };
  }

  httpHeadersWithoutAuth(headers?: HttpHeaderMap): { headers: HttpHeaders } {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (headers) {
      Object.keys(headers).forEach(key => {
        if (key.toLowerCase() !== 'authorization') {
          const value = headers[key];
          if (typeof value === 'string') {
            httpHeaders = httpHeaders.set(key, value);
          } else if (Array.isArray(value)) {
            httpHeaders = httpHeaders.set(key, value.join(', '));
          }
        }
      });
    }

    return { headers: httpHeaders };
  }
}