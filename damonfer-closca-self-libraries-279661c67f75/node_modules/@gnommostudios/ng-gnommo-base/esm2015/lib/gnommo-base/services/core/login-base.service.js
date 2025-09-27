/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
// unsupported: template constraints.
/**
 * @template T
 */
export class LoginBaseService extends BaseService {
    /**
     * @param {?} http
     * @param {?} url
     * @param {?} endpoint
     */
    constructor(http, url, endpoint) {
        super(http, url, endpoint);
        this.http = http;
        this.url = url;
        this.endpoint = endpoint;
    }
    /**
     * @param {?} credentials
     * @param {?=} headers
     * @return {?}
     */
    login(credentials, headers) {
        return this.http.post(`${this.url}/${this.endpoint}/login`, credentials, this.httpHeadersWithoutAuth(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?} email
     * @param {?=} headers
     * @return {?}
     */
    passwordRecovery(email, headers) {
        return this.http.post(`${this.url}/${this.endpoint}/password-recovery`, email, this.httpHeadersWithoutAuth(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?} newPassword
     * @param {?} hash
     * @param {?=} headers
     * @return {?}
     */
    resetPassword(newPassword, hash, headers) {
        return this.http.post(`${this.url}/${this.endpoint}/reset-password`, { 'newPassword': newPassword, 'hash': hash }, this.httpHeadersWithoutAuth(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?} token
     * @param {?=} headers
     * @return {?}
     */
    getCurrentUser(token, headers) {
        return this.http.get(this.url + '/users-me', this.createHttpHeaders(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    register(item, headers) {
        return this.http.post(`${this.url}/${this.endpoint}/register`, item, this.httpHeadersWithoutAuth(headers))
            .pipe(map((data) => data));
    }
}
LoginBaseService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LoginBaseService.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: String, decorators: [{ type: Inject, args: ['url',] }] },
    { type: String, decorators: [{ type: Inject, args: ['endpoint',] }] }
];
if (false) {
    /** @type {?} */
    LoginBaseService.prototype.http;
    /** @type {?} */
    LoginBaseService.prototype.url;
    /** @type {?} */
    LoginBaseService.prototype.endpoint;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvIiwic291cmNlcyI6WyJsaWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9sb2dpbi1iYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQWUsTUFBTSxzQkFBc0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUc3QyxNQUFNLHVCQUE2QyxTQUFRLFdBQWM7Ozs7OztJQUVyRSxZQUNrQyxJQUFnQixFQUNyQixHQUFXLEVBQ04sUUFBZ0I7UUFFOUMsS0FBSyxDQUNELElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUN0QixDQUFDO1FBTjRCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNOLGFBQVEsR0FBUixRQUFRLENBQVE7S0FNakQ7Ozs7OztJQUNNLEtBQUssQ0FBQyxXQUFXLEVBQUUsT0FBUTtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlHLElBQUksQ0FDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUN0QixDQUFDOzs7Ozs7O0lBR0gsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQVE7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BILElBQUksQ0FDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUN0QixDQUFDOzs7Ozs7OztJQUVILGFBQWEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQVE7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxpQkFBaUIsRUFDcEUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbEYsSUFBSSxDQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQ3RCLENBQUM7Ozs7Ozs7SUFHSCxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQVE7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1RSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBRzdCLFFBQVEsQ0FBQyxJQUFPLEVBQUUsT0FBUTtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLFdBQVcsRUFBRSxJQUFJLEVBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNHLElBQUksQ0FDRCxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUMzQixDQUFDOzs7O1lBM0NiLFVBQVU7Ozs7WUFORixVQUFVLHVCQVVWLE1BQU0sU0FBQyxVQUFVO3lDQUNqQixNQUFNLFNBQUMsS0FBSzt5Q0FDWixNQUFNLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4vYmFzZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2luQmFzZVNlcnZpY2U8VCBleHRlbmRzIEJhc2VNb2RlbD4gZXh0ZW5kcyBCYXNlU2VydmljZTxUPiB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgQEluamVjdCgndXJsJykgcHJvdGVjdGVkIHVybDogc3RyaW5nLFxuICAgICAgICBASW5qZWN0KCdlbmRwb2ludCcpIHByb3RlY3RlZCBlbmRwb2ludDogc3RyaW5nLFxuICAgICkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGh0dHAsIHVybCwgZW5kcG9pbnRcbiAgICAgICAgKTtcblxuICAgIH1cbiAgICBwdWJsaWMgbG9naW4oY3JlZGVudGlhbHMsIGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vbG9naW5gLCBjcmVkZW50aWFscywgdGhpcy5odHRwSGVhZGVyc1dpdGhvdXRBdXRoKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhKSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGFzc3dvcmRSZWNvdmVyeShlbWFpbCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS9wYXNzd29yZC1yZWNvdmVyeWAsIGVtYWlsLCB0aGlzLmh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGEpID0+IGRhdGEpXG4gICAgICAgICAgICApO1xuICAgIH1cbiAgICBwdWJsaWMgcmVzZXRQYXNzd29yZChuZXdQYXNzd29yZCwgaGFzaCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS9yZXNldC1wYXNzd29yZGAsXG4gICAgICAgICAgICB7ICduZXdQYXNzd29yZCc6IG5ld1Bhc3N3b3JkLCAnaGFzaCc6IGhhc2ggfSwgdGhpcy5odHRwSGVhZGVyc1dpdGhvdXRBdXRoKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhKSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q3VycmVudFVzZXIodG9rZW4sIGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMudXJsICsgJy91c2Vycy1tZScsIHRoaXMuY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycykpXG4gICAgICAgIC5waXBlKG1hcCgoZGF0YTogYW55KSA9PiBkYXRhKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyKGl0ZW06IFQsIGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9L3JlZ2lzdGVyYCwgaXRlbSAsIHRoaXMuaHR0cEhlYWRlcnNXaXRob3V0QXV0aChoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogYW55KSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbn1cbiJdfQ==