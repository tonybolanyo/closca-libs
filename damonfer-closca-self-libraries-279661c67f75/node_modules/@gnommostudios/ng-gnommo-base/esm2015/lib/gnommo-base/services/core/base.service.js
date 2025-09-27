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
export class BaseService {
    /**
     * @param {?} http
     * @param {?} url
     * @param {?} endpoint
     */
    constructor(http, url, endpoint) {
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
    getAll(headers) {
        return this.http.get(`${this.url}/${this.endpoint}`, this.createHttpHeaders(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?} _id
     * @param {?=} headers
     * @return {?}
     */
    getById(_id, headers) {
        return this.http.get(`${this.url}/${this.endpoint}/${_id}`, this.createHttpHeaders(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    create(item, headers) {
        return this.http.post(`${this.url}/${this.endpoint}`, item, this.createHttpHeaders(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?} _id
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    update(_id, item, headers) {
        item._id = _id;
        return this.http.patch(`${this.url}/${this.endpoint}`, item, this.createHttpHeaders(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?} _id
     * @param {?} item
     * @param {?=} headers
     * @return {?}
     */
    updateComplete(_id, item, headers) {
        item._id = _id;
        return this.http.put(`${this.url}/${this.endpoint}`, item, this.createHttpHeaders(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?} _id
     * @param {?=} headers
     * @return {?}
     */
    delete(_id, headers) {
        return this.http.delete(`${this.url}/${this.endpoint}/${_id}`, this.createHttpHeaders(headers))
            .pipe(map((data) => data));
    }
    /**
     * @param {?=} headers
     * @return {?}
     */
    createHttpHeaders(headers) {
        /** @type {?} */
        const httpOptions = Object.assign({}, this.httpOptions);
        if (headers) {
            Object.keys(headers).forEach((headerKey) => {
                httpOptions.headers = httpOptions.headers.append(headerKey, headers[headerKey]);
            });
        }
        return httpOptions;
    }
    /**
     * @param {?=} headers
     * @return {?}
     */
    httpHeadersWithoutAuth(headers) {
        /** @type {?} */
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': '*',
                'Content-type': 'application/json',
                'X-Skip-Interceptor': ''
            })
        };
        if (headers) {
            Object.keys(headers).forEach((headerKey) => {
                httpOptions.headers = httpOptions.headers.append(headerKey, headers[headerKey]);
            });
        }
        return httpOptions;
    }
}
BaseService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BaseService.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: String, decorators: [{ type: Inject, args: ['url',] }] },
    { type: String, decorators: [{ type: Inject, args: ['endpoint',] }] }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvIiwic291cmNlcyI6WyJsaWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9iYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7O0FBSWxGLE1BQU07Ozs7OztJQVFGLFlBQ2tDLElBQWdCLEVBQ3JCLEdBQVcsRUFDTixRQUFnQjtRQUZoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ3JCLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFDTixhQUFRLEdBQVIsUUFBUSxDQUFROzJCQVZwQztZQUNWLE9BQU8sRUFBRSxJQUFJLFdBQVcsQ0FBQzs7Z0JBRXJCLFFBQVEsRUFBRSxHQUFHO2dCQUNiLGNBQWMsRUFBRSxrQkFBa0I7YUFDckMsQ0FBQztTQUNMO0tBU0E7Ozs7O0lBRU0sTUFBTSxDQUFDLE9BQVE7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hGLElBQUksQ0FDRCxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUMzQixDQUNBOzs7Ozs7O0lBR0YsT0FBTyxDQUFDLEdBQVcsRUFBRSxPQUFRO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUks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QUFDLENBQUM7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN2QyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNuRixDQUFDLENBQUM7U0FDTjtRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7Ozs7WUF4RjFCLFVBQVU7Ozs7WUFIVyxVQUFVLHVCQWF2QixNQUFNLFNBQUMsVUFBVTt5Q0FDakIsTUFBTSxTQUFDLEtBQUs7eUNBQ1osTUFBTSxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEh0dHBIZWFkZXJzLCBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNlcnZpY2U8VCBleHRlbmRzIEJhc2VNb2RlbD4gIHtcbiAgICBodHRwT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICdBY2NlcHQnOiAnKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9KVxuICAgIH07XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoJ3VybCcpIHByb3RlY3RlZCB1cmw6IHN0cmluZyxcbiAgICAgICAgQEluamVjdCgnZW5kcG9pbnQnKSBwcm90ZWN0ZWQgZW5kcG9pbnQ6IHN0cmluZyxcblxuICAgICAgICAvLyBwcml2YXRlIHVybDogc3RyaW5nLFxuICAgICkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbChoZWFkZXJzPyk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9YCwgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogVFtdKSA9PiBkYXRhKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QnlJZChfaWQ6IHN0cmluZywgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vJHtfaWR9YCwgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogVCkgPT4gZGF0YSksXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUoaXRlbTogVCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFQ+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9YCwgaXRlbSwgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogVCkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShfaWQ6IHN0cmluZywgaXRlbTogVCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgaXRlbS5faWQgPSBfaWQ7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2g8VD4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCBpdGVtLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUNvbXBsZXRlKF9pZDogc3RyaW5nLCBpdGVtOiBULCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBpdGVtLl9pZCA9IF9pZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8VD4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCBpdGVtLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShfaWQ6IHN0cmluZywgaGVhZGVycz8pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTxUPihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS8ke19pZH1gLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycz8pIHtcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmh0dHBPcHRpb25zKTtcbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpLmZvckVhY2goKGhlYWRlcktleSkgPT4ge1xuICAgICAgICAgICAgICAgIGh0dHBPcHRpb25zLmhlYWRlcnMgPSBodHRwT3B0aW9ucy5oZWFkZXJzLmFwcGVuZChoZWFkZXJLZXksIGhlYWRlcnNbaGVhZGVyS2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHVibGljIGh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycz8pIHtcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnKicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnWC1Ta2lwLUludGVyY2VwdG9yJzogJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpLmZvckVhY2goKGhlYWRlcktleSkgPT4ge1xuICAgICAgICAgICAgICAgIGh0dHBPcHRpb25zLmhlYWRlcnMgPSBodHRwT3B0aW9ucy5oZWFkZXJzLmFwcGVuZChoZWFkZXJLZXksIGhlYWRlcnNbaGVhZGVyS2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cE9wdGlvbnM7XG4gICAgfVxufVxuIl19