import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/core/auth.service';
export declare const InterceptorSkipHeader = "X-Skip-Interceptor";
export declare class AuthInterceptor implements HttpInterceptor {
    private authService;
    constructor(authService: AuthService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
