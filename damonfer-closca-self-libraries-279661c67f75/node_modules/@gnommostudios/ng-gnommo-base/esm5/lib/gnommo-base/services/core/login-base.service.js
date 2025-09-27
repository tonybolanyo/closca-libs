/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
// unsupported: template constraints.
/**
 * @template T
 */
var LoginBaseService = /** @class */ (function (_super) {
    tslib_1.__extends(LoginBaseService, _super);
    function LoginBaseService(http, url, endpoint) {
        var _this = _super.call(this, http, url, endpoint) || this;
        _this.http = http;
        _this.url = url;
        _this.endpoint = endpoint;
        return _this;
    }
    /**
     * @param {?} credentials
     * @param {?=} headers
     * @return {?}
     */
    LoginBaseService.prototype.login = /**
     * @param {?} credentials
     * @param {?=} headers
     * @return {?}
     */
    function (credentials, headers) {
        return this.http.post(this.url + "/" + this.endpoint + "/login", credentials, this.httpHeadersWithoutAuth(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?} email
     * @param {?=} headers
     * @return {?}
     */
    LoginBaseService.prototype.passwordRecovery = /**
     * @param {?} email
     * @param {?=} headers
     * @return {?}
     */
    function (email, headers) {
        return this.http.post(this.url + "/" + this.endpoint + "/password-recovery", email, this.httpHeadersWithoutAuth(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?} newPassword
     * @param {?} hash
     * @param {?=} headers
     * @return {?}
     */
    LoginBaseService.prototype.resetPassword = /**
     * @param {?} newPassword
     * @param {?} hash
     * @param {?=} headers
     * @return {?}
     */
    function (newPassword, hash, headers) {
        return this.http.post(this.url + "/" + this.endpoint + "/reset-password", { 'newPassword': newPassword, 'hash': hash }, this.httpHeadersWithoutAuth(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?} token
     * @param {?=} headers
     * @return {?}
     */
    LoginBaseService.prototype.getCurrentUser = /**
     * @param {?} token
     * @param {?=} headers
     * @return {?}
     */
    function (token, headers) {
        return this.http.get(this.url + '/users-me', this.createHttpHeaders(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    LoginBaseService.prototype.register = /**
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    function (item, headers) {
        return this.http.post(this.url + "/" + this.endpoint + "/register", item, this.httpHeadersWithoutAuth(headers))
            .pipe(map(function (data) { return data; }));
    };
    LoginBaseService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LoginBaseService.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: String, decorators: [{ type: Inject, args: ['url',] }] },
        { type: String, decorators: [{ type: Inject, args: ['endpoint',] }] }
    ]; };
    return LoginBaseService;
}(BaseService));
export { LoginBaseService };
if (false) {
    /** @type {?} */
    LoginBaseService.prototype.http;
    /** @type {?} */
    LoginBaseService.prototype.url;
    /** @type {?} */
    LoginBaseService.prototype.endpoint;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvIiwic291cmNlcyI6WyJsaWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9sb2dpbi1iYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFlLE1BQU0sc0JBQXNCLENBQUM7QUFFL0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0lBR2MsNENBQWM7SUFFckUsMEJBQ2tDLElBQWdCLEVBQ3JCLEdBQVcsRUFDTixRQUFnQjtRQUhsRCxZQUtJLGtCQUNJLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUN0QixTQUVKO1FBUmlDLFVBQUksR0FBSixJQUFJLENBQVk7UUFDckIsU0FBRyxHQUFILEdBQUcsQ0FBUTtRQUNOLGNBQVEsR0FBUixRQUFRLENBQVE7O0tBTWpEOzs7Ozs7SUFDTSxnQ0FBSzs7Ozs7Y0FBQyxXQUFXLEVBQUUsT0FBUTtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVMsSUFBSSxDQUFDLEdBQUcsU0FBSSxJQUFJLENBQUMsUUFBUSxXQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM5RyxJQUFJLENBQ0QsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUN0QixDQUFDOzs7Ozs7O0lBR0gsMkNBQWdCOzs7OztjQUFDLEtBQUssRUFBRSxPQUFRO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBUyxJQUFJLENBQUMsR0FBRyxTQUFJLElBQUksQ0FBQyxRQUFRLHVCQUFvQixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEgsSUFBSSxDQUNELEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FDdEIsQ0FBQzs7Ozs7Ozs7SUFFSCx3Q0FBYTs7Ozs7O2NBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFRO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBUyxJQUFJLENBQUMsR0FBRyxTQUFJLElBQUksQ0FBQyxRQUFRLG9CQUFpQixFQUNwRSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsRixJQUFJLENBQ0QsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUN0QixDQUFDOzs7Ozs7O0lBR0gseUNBQWM7Ozs7O2NBQUMsS0FBSyxFQUFFLE9BQVE7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1RSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7SUFHN0IsbUNBQVE7Ozs7O2NBQUMsSUFBTyxFQUFFLE9BQVE7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFTLElBQUksQ0FBQyxHQUFHLFNBQUksSUFBSSxDQUFDLFFBQVEsY0FBVyxFQUFFLElBQUksRUFBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0csSUFBSSxDQUNELEdBQUcsQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FDM0IsQ0FBQzs7O2dCQTNDYixVQUFVOzs7O2dCQU5GLFVBQVUsdUJBVVYsTUFBTSxTQUFDLFVBQVU7NkNBQ2pCLE1BQU0sU0FBQyxLQUFLOzZDQUNaLE1BQU0sU0FBQyxVQUFVOzsyQkFiMUI7RUFRMkQsV0FBVztTQUF6RCxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2Uuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkJhc2VTZXJ2aWNlPFQgZXh0ZW5kcyBCYXNlTW9kZWw+IGV4dGVuZHMgQmFzZVNlcnZpY2U8VD4ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoJ3VybCcpIHByb3RlY3RlZCB1cmw6IHN0cmluZyxcbiAgICAgICAgQEluamVjdCgnZW5kcG9pbnQnKSBwcm90ZWN0ZWQgZW5kcG9pbnQ6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBodHRwLCB1cmwsIGVuZHBvaW50XG4gICAgICAgICk7XG5cbiAgICB9XG4gICAgcHVibGljIGxvZ2luKGNyZWRlbnRpYWxzLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9L2xvZ2luYCwgY3JlZGVudGlhbHMsIHRoaXMuaHR0cEhlYWRlcnNXaXRob3V0QXV0aChoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHBhc3N3b3JkUmVjb3ZlcnkoZW1haWwsIGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vcGFzc3dvcmQtcmVjb3ZlcnlgLCBlbWFpbCwgdGhpcy5odHRwSGVhZGVyc1dpdGhvdXRBdXRoKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhKSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG4gICAgcHVibGljIHJlc2V0UGFzc3dvcmQobmV3UGFzc3dvcmQsIGhhc2gsIGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vcmVzZXQtcGFzc3dvcmRgLFxuICAgICAgICAgICAgeyAnbmV3UGFzc3dvcmQnOiBuZXdQYXNzd29yZCwgJ2hhc2gnOiBoYXNoIH0sIHRoaXMuaHR0cEhlYWRlcnNXaXRob3V0QXV0aChoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEN1cnJlbnRVc2VyKHRva2VuLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnVybCArICcvdXNlcnMtbWUnLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAucGlwZShtYXAoKGRhdGE6IGFueSkgPT4gZGF0YSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlcihpdGVtOiBULCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS9yZWdpc3RlcmAsIGl0ZW0gLCB0aGlzLmh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG59XG4iXX0=