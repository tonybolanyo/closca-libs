/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { CookieStorage } from '../../storage/storage.handler';
import { AuthToken } from '../../models/auth-token.model';
/** @type {?} */
var TOKEN_ID = 'token_id';
/** @type {?} */
var TOKEN_TTL = 'token_ttl';
/** @type {?} */
var TOKEN_CREATED = 'token_created';
var AuthService = /** @class */ (function () {
    function AuthService(storage) {
        this.storage = storage;
        this.token = new AuthToken();
        this.token.id = this.storage.get(TOKEN_ID);
        this.token.ttl = this.storage.get(TOKEN_TTL);
        this.token.created = this.storage.get(TOKEN_CREATED);
    }
    /**
     * @return {?}
     */
    AuthService.prototype.getToken = /**
     * @return {?}
     */
    function () {
        return /** @type {?} */ (this.token);
    };
    /**
     * @param {?} tokenId
     * @return {?}
     */
    AuthService.prototype.setToken = /**
     * @param {?} tokenId
     * @return {?}
     */
    function (tokenId) {
        /** @type {?} */
        var token = new AuthToken();
        token.id = tokenId;
        this.persist(TOKEN_ID, token.id, this.expiresTime());
        this.persist(TOKEN_TTL, this.expiresTime(), this.expiresTime());
        this.persist(TOKEN_CREATED, new Date(), this.expiresTime());
        token.ttl = this.expiresTime();
        token.created = new Date();
        this.token = Object.assign({}, this.token, token);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.removeToken = /**
     * @return {?}
     */
    function () {
        this.storage.remove(TOKEN_ID);
        this.storage.remove(TOKEN_TTL);
        this.storage.remove(TOKEN_CREATED);
        this.token = new AuthToken();
    };
    /**
     * @param {?} token_property
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    AuthService.prototype.persist = /**
     * @param {?} token_property
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    function (token_property, value, expires) {
        try {
            this.storage.set("" + token_property, (typeof value === 'object') ? JSON.stringify(value) : value, expires ? expires : null);
        }
        catch (err) {
            // console.error('Cannot access local/session storage:', err);
        }
    };
    /**
     * @return {?}
     */
    AuthService.prototype.expiresTime = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var today = new Date();
        return this.addDays(today, 3);
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    AuthService.prototype.addDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        /** @type {?} */
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    AuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: CookieStorage, decorators: [{ type: Inject, args: [CookieStorage,] }] }
    ]; };
    return AuthService;
}());
export { AuthService };
if (false) {
    /** @type {?} */
    AuthService.prototype.token;
    /** @type {?} */
    AuthService.prototype.storage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvIiwic291cmNlcyI6WyJsaWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBRTFELElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQzs7QUFDNUIsSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDOztBQUM5QixJQUFNLGFBQWEsR0FBRyxlQUFlLENBQUM7O0lBUWxDLHFCQUE2QyxPQUFzQjtRQUF0QixZQUFPLEdBQVAsT0FBTyxDQUFlO3FCQUZuRCxJQUFJLFNBQVMsRUFBRTtRQUczQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN4RDs7OztJQUVNLDhCQUFROzs7O1FBQ1gsTUFBTSxtQkFBWSxJQUFJLENBQUMsS0FBSyxFQUFDOzs7Ozs7SUFHMUIsOEJBQVE7Ozs7Y0FBQyxPQUFlOztRQUMzQixJQUFNLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQzlCLEtBQUssQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDNUQsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzs7Ozs7SUFHL0MsaUNBQVc7Ozs7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7Ozs7Ozs7O0lBRzFCLDZCQUFPOzs7Ozs7Y0FBQyxjQUFzQixFQUFFLEtBQVUsRUFBRSxPQUFjO1FBQzdELElBQUksQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNaLEtBQUcsY0FBZ0IsRUFDbkIsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUMzRCxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMzQixDQUFDO1NBQ0w7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7U0FFZDs7Ozs7SUFHRSxpQ0FBVzs7Ozs7UUFDZCxJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQUcxQiw2QkFBTzs7Ozs7Y0FBQyxJQUFJLEVBQUUsSUFBSTs7UUFDdEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7O2dCQXJEckIsVUFBVTs7OztnQkFSRixhQUFhLHVCQWFMLE1BQU0sU0FBQyxhQUFhOztzQkFkckM7O1NBVWEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29va2llU3RvcmFnZSB9IGZyb20gJy4uLy4uL3N0b3JhZ2Uvc3RvcmFnZS5oYW5kbGVyJztcbmltcG9ydCB7IEF1dGhUb2tlbiB9IGZyb20gJy4uLy4uL21vZGVscy9hdXRoLXRva2VuLm1vZGVsJztcblxuY29uc3QgVE9LRU5fSUQgPSAndG9rZW5faWQnO1xuY29uc3QgVE9LRU5fVFRMID0gJ3Rva2VuX3R0bCc7XG5jb25zdCBUT0tFTl9DUkVBVEVEID0gJ3Rva2VuX2NyZWF0ZWQnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHRva2VuID0gbmV3IEF1dGhUb2tlbigpO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChDb29raWVTdG9yYWdlKSBwcm90ZWN0ZWQgc3RvcmFnZTogQ29va2llU3RvcmFnZSkge1xuICAgICAgICB0aGlzLnRva2VuLmlkID0gdGhpcy5zdG9yYWdlLmdldChUT0tFTl9JRCk7XG4gICAgICAgIHRoaXMudG9rZW4udHRsID0gdGhpcy5zdG9yYWdlLmdldChUT0tFTl9UVEwpO1xuICAgICAgICB0aGlzLnRva2VuLmNyZWF0ZWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFRPS0VOX0NSRUFURUQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUb2tlbigpOiBBdXRoVG9rZW4ge1xuICAgICAgICByZXR1cm4gPEF1dGhUb2tlbj50aGlzLnRva2VuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRUb2tlbih0b2tlbklkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBuZXcgQXV0aFRva2VuKCk7XG4gICAgICAgIHRva2VuLmlkID0gdG9rZW5JZDtcbiAgICAgICAgdGhpcy5wZXJzaXN0KFRPS0VOX0lELCB0b2tlbi5pZCwgdGhpcy5leHBpcmVzVGltZSgpKTtcbiAgICAgICAgdGhpcy5wZXJzaXN0KFRPS0VOX1RUTCwgdGhpcy5leHBpcmVzVGltZSgpLCB0aGlzLmV4cGlyZXNUaW1lKCkpO1xuICAgICAgICB0aGlzLnBlcnNpc3QoVE9LRU5fQ1JFQVRFRCwgbmV3IERhdGUoKSwgdGhpcy5leHBpcmVzVGltZSgpKTtcbiAgICAgICAgdG9rZW4udHRsID0gdGhpcy5leHBpcmVzVGltZSgpO1xuICAgICAgICB0b2tlbi5jcmVhdGVkID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy50b2tlbiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudG9rZW4sIHRva2VuKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4oKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoVE9LRU5fSUQpO1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKFRPS0VOX1RUTCk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoVE9LRU5fQ1JFQVRFRCk7XG4gICAgICAgIHRoaXMudG9rZW4gPSBuZXcgQXV0aFRva2VuKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHBlcnNpc3QodG9rZW5fcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoXG4gICAgICAgICAgICAgICAgYCR7dG9rZW5fcHJvcGVydHl9YCxcbiAgICAgICAgICAgICAgICAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBleHBpcmVzID8gZXhwaXJlcyA6IG51bGxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBleHBpcmVzVGltZSgpIHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGREYXlzKHRvZGF5LCAzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZERheXMoZGF0ZSwgZGF5cykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGRheXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxufVxuXG5cbiJdfQ==