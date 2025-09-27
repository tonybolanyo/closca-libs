/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
var BaseService = /** @class */ (function () {
    function BaseService(http, url, endpoint) {
        this.http = http;
        this.url = url;
        this.endpoint = endpoint;
        this.httpOptions = {
            headers: new HttpHeaders({
                // tslint:disable-next-line:max-line-length
                'Accept': '*',
                'Content-type': 'application/json',
            })
        };
    }
    /**
     * @param {?=} headers
     * @return {?}
     */
    BaseService.prototype.getAll = /**
     * @param {?=} headers
     * @return {?}
     */
    function (headers) {
        return this.http.get(this.url + "/" + this.endpoint, this.createHttpHeaders(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?} _id
     * @param {?=} headers
     * @return {?}
     */
    BaseService.prototype.getById = /**
     * @param {?} _id
     * @param {?=} headers
     * @return {?}
     */
    function (_id, headers) {
        return this.http.get(this.url + "/" + this.endpoint + "/" + _id, this.createHttpHeaders(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    BaseService.prototype.create = /**
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    function (item, headers) {
        return this.http.post(this.url + "/" + this.endpoint, item, this.createHttpHeaders(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?} _id
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    BaseService.prototype.update = /**
     * @param {?} _id
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    function (_id, item, headers) {
        item._id = _id;
        return this.http.patch(this.url + "/" + this.endpoint, item, this.createHttpHeaders(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?} _id
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    BaseService.prototype.updateComplete = /**
     * @param {?} _id
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    function (_id, item, headers) {
        item._id = _id;
        return this.http.put(this.url + "/" + this.endpoint, item, this.createHttpHeaders(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?} _id
     * @param {?=} headers
     * @return {?}
     */
    BaseService.prototype.delete = /**
     * @param {?} _id
     * @param {?=} headers
     * @return {?}
     */
    function (_id, headers) {
        return this.http.delete(this.url + "/" + this.endpoint + "/" + _id, this.createHttpHeaders(headers))
            .pipe(map(function (data) { return data; }));
    };
    /**
     * @param {?=} headers
     * @return {?}
     */
    BaseService.prototype.createHttpHeaders = /**
     * @param {?=} headers
     * @return {?}
     */
    function (headers) {
        /** @type {?} */
        var httpOptions = Object.assign({}, this.httpOptions);
        if (headers) {
            Object.keys(headers).forEach(function (headerKey) {
                httpOptions.headers = httpOptions.headers.append(headerKey, headers[headerKey]);
            });
        }
        return httpOptions;
    };
    /**
     * @param {?=} headers
     * @return {?}
     */
    BaseService.prototype.httpHeadersWithoutAuth = /**
     * @param {?=} headers
     * @return {?}
     */
    function (headers) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Accept': '*',
                'Content-type': 'application/json',
                'X-Skip-Interceptor': ''
            })
        };
        if (headers) {
            Object.keys(headers).forEach(function (headerKey) {
                httpOptions.headers = httpOptions.headers.append(headerKey, headers[headerKey]);
            });
        }
        return httpOptions;
    };
    BaseService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BaseService.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
        { type: String, decorators: [{ type: Inject, args: ['url',] }] },
        { type: String, decorators: [{ type: Inject, args: ['endpoint',] }] }
    ]; };
    return BaseService;
}());
export { BaseService };
if (false) {
    /** @type {?} */
    BaseService.prototype.httpOptions;
    /** @type {?} */
    BaseService.prototype.http;
    /** @type {?} */
    BaseService.prototype.url;
    /** @type {?} */
    BaseService.prototype.endpoint;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvIiwic291cmNlcyI6WyJsaWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9iYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7OztJQVk5RSxxQkFDa0MsSUFBZ0IsRUFDckIsR0FBVyxFQUNOLFFBQWdCO1FBRmhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNOLGFBQVEsR0FBUixRQUFRLENBQVE7MkJBVnBDO1lBQ1YsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDOztnQkFFckIsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsY0FBYyxFQUFFLGtCQUFrQjthQUNyQyxDQUFDO1NBQ0w7S0FTQTs7Ozs7SUFFTSw0QkFBTTs7OztjQUFDLE9BQVE7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxHQUFHLFNBQUksSUFBSSxDQUFDLFFBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEYsSUFBSSxDQUNELEdBQUcsQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FDM0IsQ0FDQTs7Ozs7OztJQUdGLDZCQUFPOzs7OztjQUFDLEdBQVcsRUFBRSxPQUFRO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsR0FBRyxTQUFJLElBQUksQ0FBQyxRQUFR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QU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBUztnQkFDbkMsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDbkYsQ0FBQyxDQUFDO1NBQ047UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDOzs7Z0JBeEYxQixVQUFVOzs7O2dCQUhXLFVBQVUsdUJBYXZCLE1BQU0sU0FBQyxVQUFVOzZDQUNqQixNQUFNLFNBQUMsS0FBSzs2Q0FDWixNQUFNLFNBQUMsVUFBVTs7c0JBbkIxQjs7U0FRc0IsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgSHR0cEhlYWRlcnMsIEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2VydmljZTxUIGV4dGVuZHMgQmFzZU1vZGVsPiAge1xuICAgIGh0dHBPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgJ0FjY2VwdCc6ICcqJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0pXG4gICAgfTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgQEluamVjdCgndXJsJykgcHJvdGVjdGVkIHVybDogc3RyaW5nLFxuICAgICAgICBASW5qZWN0KCdlbmRwb2ludCcpIHByb3RlY3RlZCBlbmRwb2ludDogc3RyaW5nLFxuXG4gICAgICAgIC8vIHByaXZhdGUgdXJsOiBzdHJpbmcsXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsKGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUW10pID0+IGRhdGEpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCeUlkKF9pZDogc3RyaW5nLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS8ke19pZH1gLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZShpdGVtOiBULCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCBpdGVtLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKF9pZDogc3RyaW5nLCBpdGVtOiBULCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBpdGVtLl9pZCA9IF9pZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaDxUPihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fWAsIGl0ZW0sIHRoaXMuY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IFQpID0+IGRhdGEpLFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQ29tcGxldGUoX2lkOiBzdHJpbmcsIGl0ZW06IFQsIGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGl0ZW0uX2lkID0gX2lkO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dDxUPihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fWAsIGl0ZW0sIHRoaXMuY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IFQpID0+IGRhdGEpLFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlKF9pZDogc3RyaW5nLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPFQ+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9LyR7X2lkfWAsIHRoaXMuY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IFQpID0+IGRhdGEpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzPykge1xuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaHR0cE9wdGlvbnMpO1xuICAgICAgICBpZiAoaGVhZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaCgoaGVhZGVyS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaHR0cE9wdGlvbnMuaGVhZGVycyA9IGh0dHBPcHRpb25zLmhlYWRlcnMuYXBwZW5kKGhlYWRlcktleSwgaGVhZGVyc1toZWFkZXJLZXldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwT3B0aW9ucztcbiAgICB9XG5cbiAgICBwdWJsaWMgaHR0cEhlYWRlcnNXaXRob3V0QXV0aChoZWFkZXJzPykge1xuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICcqJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdYLVNraXAtSW50ZXJjZXB0b3InOiAnJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaGVhZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaCgoaGVhZGVyS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaHR0cE9wdGlvbnMuaGVhZGVycyA9IGh0dHBPcHRpb25zLmhlYWRlcnMuYXBwZW5kKGhlYWRlcktleSwgaGVhZGVyc1toZWFkZXJLZXldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwT3B0aW9ucztcbiAgICB9XG59XG4iXX0=