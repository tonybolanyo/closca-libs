import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        
        // Log the error to console (in production, you might want to send this to a logging service)
        console.error('HTTP Error:', errorMessage);
        
        return throwError(error);
      })
    );
  }
}