/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { AuthService } from '../services/core/auth.service';
/** @type {?} */
export var InterceptorSkipHeader = 'X-Skip-Interceptor';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authService) {
        this.authService = authService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    AuthInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        /** @type {?} */
        var token = this.authService.getToken();
        /** @type {?} */
        var authToken = "Bearer " + token.id; // get TOKEN
        // Clone request and update with Auth
        if (req.headers.has(InterceptorSkipHeader)) {
            /** @type {?} */
            var noAuthReq = req.clone({
                headers: req.headers.delete(InterceptorSkipHeader)
            });
            return next.handle(noAuthReq);
        }
        /** @type {?} */
        var authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        // send cloned request with header to the next handler.
        return next.handle(authReq);
    };
    AuthInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthInterceptor.ctorParameters = function () { return [
        { type: AuthService }
    ]; };
    return AuthInterceptor;
}());
export { AuthInterceptor };
if (false) {
    /** @type {?} */
    AuthInterceptor.prototype.authService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlLyIsInNvdXJjZXMiOlsibGliL2dub21tby1iYXNlL2hlbHBlcnMvYXV0aC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBRzVELFdBQWEscUJBQXFCLEdBQUcsb0JBQW9CLENBQUM7O0lBS3RELHlCQUNZO1FBQUEsZ0JBQVcsR0FBWCxXQUFXO0tBQWlCOzs7Ozs7SUFFeEMsbUNBQVM7Ozs7O0lBQVQsVUFBVSxHQUFxQixFQUFFLElBQWlCOztRQUU5QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDOztRQUMxQyxJQUFNLFNBQVMsR0FBRyxZQUFVLEtBQUssQ0FBQyxFQUFJLENBQUM7O1FBR3ZDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUN6QyxJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUN4QixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7YUFDckQsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakM7O1FBRUQsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN0QixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQztTQUN2RCxDQUFDLENBQUM7O1FBR0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDL0I7O2dCQXpCSixVQUFVOzs7O2dCQUxGLFdBQVc7OzBCQUhwQjs7U0FTYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3QsIEh0dHBIYW5kbGVyLCBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UnO1xuXG5cbmV4cG9ydCBjb25zdCBJbnRlcmNlcHRvclNraXBIZWFkZXIgPSAnWC1Ta2lwLUludGVyY2VwdG9yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHt9XG5cbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcikge1xuICAgICAgICAvLyBHZXQgdGhlIGF1dGggdG9rZW4gZnJvbSB0aGUgY29va2llU3RvcmFnZS5cbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmdldFRva2VuKCk7XG4gICAgICAgIGNvbnN0IGF1dGhUb2tlbiA9IGBCZWFyZXIgJHt0b2tlbi5pZH1gOyAvLyBnZXQgVE9LRU5cblxuICAgICAgICAvLyBDbG9uZSByZXF1ZXN0IGFuZCB1cGRhdGUgd2l0aCBBdXRoXG4gICAgICAgIGlmIChyZXEuaGVhZGVycy5oYXMoSW50ZXJjZXB0b3JTa2lwSGVhZGVyKSkge1xuICAgICAgICAgICAgY29uc3Qgbm9BdXRoUmVxID0gcmVxLmNsb25lKHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5kZWxldGUoSW50ZXJjZXB0b3JTa2lwSGVhZGVyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUobm9BdXRoUmVxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF1dGhSZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgYXV0aFRva2VuKVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzZW5kIGNsb25lZCByZXF1ZXN0IHdpdGggaGVhZGVyIHRvIHRoZSBuZXh0IGhhbmRsZXIuXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcbiAgICB9XG59XG4iXX0=