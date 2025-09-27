import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * ErrorInterceptor provides centralized HTTP error handling and logging.
 * 
 * This interceptor catches HTTP errors from all requests and provides
 * consistent error logging and processing. It distinguishes between
 * client-side and server-side errors and logs them appropriately.
 * 
 * The interceptor is automatically registered when importing NgGnommoBaseModule.forRoot().
 * 
 * @implements {HttpInterceptor}
 * 
 * @example
 * ```typescript
 * // The interceptor works automatically for all HTTP requests:
 * 
 * this.http.get('/api/data').subscribe({
 *   next: (data) => console.log(data),
 *   error: (error) => {
 *     // Error has already been logged by the interceptor
 *     // Handle the error in your component
 *     console.log('Component handling error:', error);
 *   }
 * });
 * ```
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * Creates an instance of ErrorInterceptor.
   */
  constructor() {}

  /**
   * Intercepts HTTP requests and handles any errors that occur.
   * 
   * This method catches HTTP errors, logs them to the console with
   * appropriate formatting, and then re-throws the error for handling
   * by the calling component or service.
   * 
   * @param {HttpRequest<any>} req - The outgoing HTTP request
   * @param {HttpHandler} next - The next handler in the interceptor chain
   * @returns {Observable<HttpEvent<any>>} Observable of the HTTP event
   * 
   * @example
   * ```typescript
   * // This method is called automatically by Angular's HTTP client
   * // It will log errors like:
   * 
   * // For client-side errors:
   * // "HTTP Error: Client Error: Network connection failed"
   * 
   * // For server-side errors:
   * // "HTTP Error: Server Error Code: 404\nMessage: Not Found"
   * ```
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log the error to console (in production, you might want to send this to a logging service)
        console.error('HTTP Error occurred:', error);
        
        return throwError(error);
      })
    );
  }
}