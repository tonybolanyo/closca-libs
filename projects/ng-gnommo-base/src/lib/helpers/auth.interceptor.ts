import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/core/auth.service';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

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