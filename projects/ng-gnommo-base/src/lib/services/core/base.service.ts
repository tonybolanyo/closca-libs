import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../../models/base.model';
import { HttpHeaderMap } from '../../interfaces/http-types.interface';

/**
 * BaseService provides a generic foundation for HTTP-based CRUD operations.
 * 
 * This abstract service class provides standard Create, Read, Update, Delete (CRUD)
 * operations for any entity that extends BaseModel. It includes methods for handling
 * HTTP headers, authentication, and common API patterns.
 * 
 * @template T - The entity type that extends BaseModel
 * 
 * @example
 * ```typescript
 * interface User extends BaseModel {
 *   name: string;
 *   email: string;
 * }
 * 
 * @Injectable()
 * export class UserService extends BaseService<User> {
 *   constructor(http: HttpClient) {
 *     super(http);
 *     this.setApiConfig('https://api.example.com', 'users');
 *   }
 * }
 * ```
 */
@Injectable()
export abstract class BaseService<T extends BaseModel> {
  /**
   * Base URL for the API endpoint.
   * @protected
   */
  protected url: string = '';
  
  /**
   * Specific endpoint path for this service.
   * @protected
   */
  protected endpoint: string = '';
  
  /**
   * Default HTTP options with JSON content type.
   * @deprecated Use createHttpHeaders() method instead
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Creates an instance of BaseService.
   * 
   * @param {HttpClient} http - Angular HttpClient for making HTTP requests
   */
  constructor(protected http: HttpClient) {}

  /**
   * Configures the API base URL and endpoint for this service.
   * 
   * @protected
   * @param {string} url - The base URL of the API
   * @param {string} endpoint - The specific endpoint path for this service
   * 
   * @example
   * ```typescript
   * constructor(http: HttpClient) {
   *   super(http);
   *   this.setApiConfig('https://api.example.com', 'users');
   * }
   * ```
   */
  protected setApiConfig(url: string, endpoint: string): void {
    this.url = url;
    this.endpoint = endpoint;
  }

  /**
   * Retrieves all entities from the API endpoint.
   * 
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<T[]>} Observable containing array of entities
   * 
   * @example
   * ```typescript
   * this.userService.getAll().subscribe(users => {
   *   console.log('All users:', users);
   * });
   * 
   * // With custom headers
   * this.userService.getAll({ 'Custom-Header': 'value' }).subscribe(users => {
   *   console.log('Users with custom header:', users);
   * });
   * ```
   */
  getAll(headers?: HttpHeaderMap): Observable<T[]> {
    const options = this.createHttpHeaders(headers);
    return this.http.get<T[]>(`${this.url}/${this.endpoint}`, options);
  }

  /**
   * Retrieves a specific entity by its ID.
   * 
   * @param {string} _id - The unique identifier of the entity
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<T>} Observable containing the requested entity
   * 
   * @example
   * ```typescript
   * this.userService.getById('123').subscribe(user => {
   *   console.log('User:', user);
   * });
   * ```
   */
  getById(_id: string, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.get<T>(`${this.url}/${this.endpoint}/${_id}`, options);
  }

  /**
   * Creates a new entity via POST request.
   * 
   * @param {T} item - The entity to create
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<T>} Observable containing the created entity
   * 
   * @example
   * ```typescript
   * const newUser = { name: 'John Doe', email: 'john@example.com' };
   * this.userService.create(newUser).subscribe(createdUser => {
   *   console.log('Created user:', createdUser);
   * });
   * ```
   */
  create(item: T, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.post<T>(`${this.url}/${this.endpoint}`, item, options);
  }

  /**
   * Partially updates an entity via PATCH request.
   * 
   * Use this method when you want to update only specific fields of an entity.
   * 
   * @param {string} _id - The unique identifier of the entity to update
   * @param {T} item - The partial entity data to update
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<T>} Observable containing the updated entity
   * 
   * @example
   * ```typescript
   * const updates = { name: 'Jane Doe' };
   * this.userService.update('123', updates).subscribe(updatedUser => {
   *   console.log('Updated user:', updatedUser);
   * });
   * ```
   */
  update(_id: string, item: T, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.patch<T>(`${this.url}/${this.endpoint}/${_id}`, item, options);
  }

  /**
   * Completely replaces an entity via PUT request.
   * 
   * Use this method when you want to replace the entire entity with new data.
   * 
   * @param {string} _id - The unique identifier of the entity to replace
   * @param {T} item - The complete entity data
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<T>} Observable containing the updated entity
   * 
   * @example
   * ```typescript
   * const completeUser = { name: 'Jane Smith', email: 'jane@example.com' };
   * this.userService.updateComplete('123', completeUser).subscribe(updatedUser => {
   *   console.log('Completely updated user:', updatedUser);
   * });
   * ```
   */
  updateComplete(_id: string, item: T, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.put<T>(`${this.url}/${this.endpoint}/${_id}`, item, options);
  }

  /**
   * Deletes an entity via DELETE request.
   * 
   * @param {string} _id - The unique identifier of the entity to delete
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<void>} Observable that completes when deletion is successful
   * 
   * @example
   * ```typescript
   * this.userService.delete('123').subscribe(() => {
   *   console.log('User deleted successfully');
   * });
   * ```
   */
  delete(_id: string, headers?: HttpHeaderMap): Observable<void> {
    const options = this.createHttpHeaders(headers);
    return this.http.delete<void>(`${this.url}/${this.endpoint}/${_id}`, options);
  }

  /**
   * Creates HttpHeaders with automatic authentication token injection.
   * 
   * This method automatically includes the Authorization header with the current
   * authentication token (if available) and merges any additional headers provided.
   * 
   * @param {HttpHeaderMap} [headers] - Optional additional headers to include
   * @returns {{ headers: HttpHeaders }} Object containing the configured HttpHeaders
   * 
   * @example
   * ```typescript
   * const options = this.createHttpHeaders({ 'Custom-Header': 'value' });
   * return this.http.get('/api/data', options);
   * ```
   */
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

  /**
   * Creates HttpHeaders without authentication token injection.
   * 
   * This method creates headers excluding the Authorization header, useful for
   * public endpoints or when manual authentication handling is required.
   * 
   * @param {HttpHeaderMap} [headers] - Optional additional headers to include
   * @returns {{ headers: HttpHeaders }} Object containing the configured HttpHeaders (without auth)
   * 
   * @example
   * ```typescript
   * const options = this.httpHeadersWithoutAuth({ 'Public-API-Key': 'key123' });
   * return this.http.get('/public/data', options);
   * ```
   */
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