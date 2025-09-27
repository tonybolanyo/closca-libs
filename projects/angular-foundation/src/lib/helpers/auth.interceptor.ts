import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/core/auth.service';

/**
 * Header key used to skip the authentication interceptor for specific requests.
 * 
 * Add this header to HTTP requests that should not include authentication tokens.
 * Useful for public endpoints, login requests, or external API calls.
 * 
 * @constant
 * 
 * @example
 * ```typescript
 * import { HttpHeaders } from '@angular/common/http';
 * import { InterceptorSkipHeader } from '@gnommostudios/ng-gnommo-base';
 * 
 * const headers = new HttpHeaders().set(InterceptorSkipHeader, 'true');
 * this.http.get('/public/endpoint', { headers });
 * ```
 */
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

/**
 * AuthInterceptor automatically adds authentication tokens to HTTP requests.
 * 
 * This interceptor automatically injects the Authorization header with the current
 * authentication token for all HTTP requests, except those marked with the skip header.
 * It retrieves the token from the AuthService and formats it as a Bearer token.
 * 
 * The interceptor is automatically registered when importing NgGnommoBaseModule.forRoot().
 * 
 * @implements {HttpInterceptor}
 * 
 * @example
 * ```typescript
 * // The interceptor works automatically, but you can skip it for specific requests:
 * 
 * // This request will include the auth token
 * this.http.get('/api/protected-data').subscribe(...);
 * 
 * // This request will NOT include the auth token
 * const headers = new HttpHeaders().set(InterceptorSkipHeader, 'true');
 * this.http.get('/api/public-data', { headers }).subscribe(...);
 * ```
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Creates an instance of AuthInterceptor.
   * 
   * @param {AuthService} authService - The authentication service to retrieve tokens from
   */
  constructor(private authService: AuthService) {}

  /**
   * Intercepts HTTP requests and adds authentication tokens automatically.
   * 
   * This method is called for every HTTP request. It checks if the request
   * has the skip header, and if not, attempts to add the Authorization header
   * with the current authentication token from AuthService.
   * 
   * @param {HttpRequest<any>} req - The outgoing HTTP request
   * @param {HttpHandler} next - The next handler in the interceptor chain
   * @returns {Observable<HttpEvent<any>>} Observable of the HTTP event
   * 
   * @example
   * ```typescript
   * // This method is called automatically by Angular's HTTP client
   * // You don't need to call it directly, but here's what it does:
   * 
   * // For requests without skip header:
   * // Original: GET /api/users
   * // Modified: GET /api/users with Authorization: Bearer <token>
   * 
   * // For requests with skip header:
   * // Original: GET /api/public with X-Skip-Interceptor: true
   * // Modified: GET /api/public (skip header removed, no auth added)
   * ```
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request has the skip header
    if (req.headers.has(InterceptorSkipHeader)) {
      const newReq = req.clone({
        headers: req.headers.delete(InterceptorSkipHeader)
      });
      return next.handle(newReq);
    }

    // Get the auth token
    const authToken = this.authService.getToken();
    
    // Clone the request and add the authorization header if token exists
    if (authToken && authToken.id) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken.id}`)
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}