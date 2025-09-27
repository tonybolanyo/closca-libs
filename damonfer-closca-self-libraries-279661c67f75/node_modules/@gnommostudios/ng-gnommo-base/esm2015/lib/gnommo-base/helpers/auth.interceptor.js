/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { AuthService } from '../services/core/auth.service';
/** @type {?} */
export const InterceptorSkipHeader = 'X-Skip-Interceptor';
export class AuthInterceptor {
    /**
     * @param {?} authService
     */
    constructor(authService) {
        this.authService = authService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        /** @type {?} */
        const token = this.authService.getToken();
        /** @type {?} */
        const authToken = `Bearer ${token.id}`; // get TOKEN
        // Clone request and update with Auth
        if (req.headers.has(InterceptorSkipHeader)) {
            /** @type {?} */
            const noAuthReq = req.clone({
                headers: req.headers.delete(InterceptorSkipHeader)
            });
            return next.handle(noAuthReq);
        }
        /** @type {?} */
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}
AuthInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthInterceptor.ctorParameters = () => [
    { type: AuthService }
];
if (false) {
    /** @type {?} */
    AuthInterceptor.prototype.authService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlLyIsInNvdXJjZXMiOlsibGliL2dub21tby1iYXNlL2hlbHBlcnMvYXV0aC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBRzVELGFBQWEscUJBQXFCLEdBQUcsb0JBQW9CLENBQUM7QUFHMUQsTUFBTTs7OztJQUVGLFlBQ1k7UUFBQSxnQkFBVyxHQUFYLFdBQVc7S0FBaUI7Ozs7OztJQUV4QyxTQUFTLENBQUMsR0FBcUIsRUFBRSxJQUFpQjs7UUFFOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFDMUMsTUFBTSxTQUFTLEdBQUcsVUFBVSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUM7O1FBR3ZDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUN6QyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUN4QixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7YUFDckQsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakM7O1FBRUQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN0QixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQztTQUN2RCxDQUFDLENBQUM7O1FBR0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDL0I7OztZQXpCSixVQUFVOzs7O1lBTEYsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50LCBIdHRwSW50ZXJjZXB0b3IgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvcmUvYXV0aC5zZXJ2aWNlJztcblxuXG5leHBvcnQgY29uc3QgSW50ZXJjZXB0b3JTa2lwSGVhZGVyID0gJ1gtU2tpcC1JbnRlcmNlcHRvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7fVxuXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBhdXRoIHRva2VuIGZyb20gdGhlIGNvb2tpZVN0b3JhZ2UuXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5hdXRoU2VydmljZS5nZXRUb2tlbigpO1xuICAgICAgICBjb25zdCBhdXRoVG9rZW4gPSBgQmVhcmVyICR7dG9rZW4uaWR9YDsgLy8gZ2V0IFRPS0VOXG5cbiAgICAgICAgLy8gQ2xvbmUgcmVxdWVzdCBhbmQgdXBkYXRlIHdpdGggQXV0aFxuICAgICAgICBpZiAocmVxLmhlYWRlcnMuaGFzKEludGVyY2VwdG9yU2tpcEhlYWRlcikpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vQXV0aFJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMuZGVsZXRlKEludGVyY2VwdG9yU2tpcEhlYWRlcilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKG5vQXV0aFJlcSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhdXRoUmVxID0gcmVxLmNsb25lKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsIGF1dGhUb2tlbilcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2VuZCBjbG9uZWQgcmVxdWVzdCB3aXRoIGhlYWRlciB0byB0aGUgbmV4dCBoYW5kbGVyLlxuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUoYXV0aFJlcSk7XG4gICAgfVxufVxuIl19