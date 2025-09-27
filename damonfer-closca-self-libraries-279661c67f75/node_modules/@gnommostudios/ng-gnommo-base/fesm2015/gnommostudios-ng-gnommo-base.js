import { Injectable, Inject, NgModule } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CookieHandler {
    constructor() {
        this.cookies = {};
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        if (!this.cookies[key]) {
            /** @type {?} */
            const cookie = window.document
                .cookie.split('; ')
                .filter((item) => item.split('=')[0] === key).pop();
            if (!cookie) {
                return null;
            }
            this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
        }
        return this.cookies[key];
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    set(key, value, expires) {
        this.cookies[key] = value;
        /** @type {?} */
        const cookie = `${key}=${encodeURI(value)}; path=/${expires ? `; expires=${expires.toUTCString()}` : ''}`;
        window.document.cookie = cookie;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        delete this.cookies[key];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        try {
            return JSON.parse(decodeURI(value));
        }
        catch (e) {
            return value;
        }
    }
}
CookieHandler.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class LocalStorageHandler {
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        /** @type {?} */
        const data = localStorage.getItem(key);
        return this.parse(data);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    set(key, value, expires) {
        localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class BaseStorage {
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) { }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    set(key, value, expires) { }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) { }
}
class CookieStorage extends BaseStorage {
}
class WebLocalStorage extends BaseStorage {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template T
 */
class BaseService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template T
 */
class LoginBaseService extends BaseService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AuthToken {
    /**
     * @param {?=} data
     */
    constructor(data) {
        this.id = null;
        this.ttl = null;
        this.created = null;
        this.userId = null;
        Object.assign(this, data);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const TOKEN_ID = 'token_id';
/** @type {?} */
const TOKEN_TTL = 'token_ttl';
/** @type {?} */
const TOKEN_CREATED = 'token_created';
class AuthService {
    /**
     * @param {?} storage
     */
    constructor(storage) {
        this.storage = storage;
        this.token = new AuthToken();
        this.token.id = this.storage.get(TOKEN_ID);
        this.token.ttl = this.storage.get(TOKEN_TTL);
        this.token.created = this.storage.get(TOKEN_CREATED);
    }
    /**
     * @return {?}
     */
    getToken() {
        return /** @type {?} */ (this.token);
    }
    /**
     * @param {?} tokenId
     * @return {?}
     */
    setToken(tokenId) {
        /** @type {?} */
        const token = new AuthToken();
        token.id = tokenId;
        this.persist(TOKEN_ID, token.id, this.expiresTime());
        this.persist(TOKEN_TTL, this.expiresTime(), this.expiresTime());
        this.persist(TOKEN_CREATED, new Date(), this.expiresTime());
        token.ttl = this.expiresTime();
        token.created = new Date();
        this.token = Object.assign({}, this.token, token);
    }
    /**
     * @return {?}
     */
    removeToken() {
        this.storage.remove(TOKEN_ID);
        this.storage.remove(TOKEN_TTL);
        this.storage.remove(TOKEN_CREATED);
        this.token = new AuthToken();
    }
    /**
     * @param {?} token_property
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    persist(token_property, value, expires) {
        try {
            this.storage.set(`${token_property}`, (typeof value === 'object') ? JSON.stringify(value) : value, expires ? expires : null);
        }
        catch (err) {
            // console.error('Cannot access local/session storage:', err);
        }
    }
    /**
     * @return {?}
     */
    expiresTime() {
        /** @type {?} */
        const today = new Date();
        return this.addDays(today, 3);
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addDays(date, days) {
        /** @type {?} */
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}
AuthService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: CookieStorage, decorators: [{ type: Inject, args: [CookieStorage,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const InterceptorSkipHeader = 'X-Skip-Interceptor';
class AuthInterceptor {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ErrorInterceptor {
    /**
     * @param {?} authService
     */
    constructor(authService) {
        this.authService = authService;
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        return next.handle(request).pipe(catchError(error => {
            /** @type {?} */
            let errorMsg;
            if (error.status === 401) {
                // auto logout if 401 response returned from api
                // location.reload(true);
                this.authService.removeToken();
                errorMsg = `Error: No tiene autorización`;
            }
            else {
                errorMsg = error.error.message || error.statusText;
            }
            return throwError(error);
        }));
    }
}
ErrorInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ErrorInterceptor.ctorParameters = () => [
    { type: AuthService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class BaseModel {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GnommoBaseModule {
    /**
     * @param {?} __0
     * @return {?}
     */
    static forRoot({}) {
        return {
            ngModule: GnommoBaseModule,
            providers: [
                BaseService,
                AuthService,
                LoginBaseService,
                // // Interceptors
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                // // Storage
                { provide: WebLocalStorage, useClass: LocalStorageHandler },
                { provide: CookieStorage, useClass: CookieHandler }
            ]
        };
    }
}
GnommoBaseModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, HttpClientModule],
            },] },
];
// export * from './interfaces';
// export * from './helpers';
// export * from './models';
// export * from './services';
// export * from './storage';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { CookieHandler, LocalStorageHandler, BaseStorage, WebLocalStorage, CookieStorage, BaseService, LoginBaseService, AuthService, AuthInterceptor, ErrorInterceptor, AuthToken, BaseModel, GnommoBaseModule, AuthInterceptor as ɵg, ErrorInterceptor as ɵh, AuthService as ɵb, BaseService as ɵa, LoginBaseService as ɵf, CookieHandler as ɵj, LocalStorageHandler as ɵi, BaseStorage as ɵc, CookieStorage as ɵd, WebLocalStorage as ɵe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ25vbW1vc3R1ZGlvcy1uZy1nbm9tbW8tYmFzZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvbGliL2dub21tby1iYXNlL3N0b3JhZ2UvY29va2llLmhhbmRsZXIudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9zdG9yYWdlL2xvY2FsLXN0b3JhZ2UuaGFuZGxlci50cyIsIm5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvbGliL2dub21tby1iYXNlL3N0b3JhZ2Uvc3RvcmFnZS5oYW5kbGVyLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9iYXNlLnNlcnZpY2UudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9zZXJ2aWNlcy9jb3JlL2xvZ2luLWJhc2Uuc2VydmljZS50cyIsIm5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvbGliL2dub21tby1iYXNlL21vZGVscy9hdXRoLXRva2VuLm1vZGVsLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9oZWxwZXJzL2F1dGguaW50ZXJjZXB0b3IudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9oZWxwZXJzL2Vycm9yLmludGVyY2VwdG9yLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2UvbW9kZWxzL2Jhc2UubW9kZWwudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9nbm9tbW8tYmFzZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBDb29raWVJbnRlcmZhY2Uge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvb2tpZUhhbmRsZXIge1xuICBwcml2YXRlIGNvb2tpZXM6IENvb2tpZUludGVyZmFjZSA9IHt9O1xuXG4gIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZXNba2V5XSkge1xuICAgICAgY29uc3QgY29va2llID0gd2luZG93LmRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgLmNvb2tpZS5zcGxpdCgnOyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbS5zcGxpdCgnPScpWzBdID09PSBrZXkpLnBvcCgpO1xuICAgICAgaWYgKCFjb29raWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29va2llc1trZXldID0gdGhpcy5wYXJzZShjb29raWUuc3BsaXQoJz0nKS5zbGljZSgxKS5qb2luKCc9JykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvb2tpZXNba2V5XTtcbiAgfVxuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcbiAgICB0aGlzLmNvb2tpZXNba2V5XSA9IHZhbHVlO1xuICAgIGNvbnN0IGNvb2tpZSA9IGAke2tleX09JHtlbmNvZGVVUkkodmFsdWUpfTsgcGF0aD0vJHtleHBpcmVzID8gYDsgZXhwaXJlcz0keyBleHBpcmVzLnRvVVRDU3RyaW5nKCkgfWAgOiAnJ31gO1xuICAgIHdpbmRvdy5kb2N1bWVudC5jb29raWUgPSBjb29raWU7XG4gIH1cblxuICByZW1vdmUoa2V5OiBzdHJpbmcpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSBrZXkgKyAnPTsgcGF0aD0vOyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UOyc7XG4gICAgZGVsZXRlIHRoaXMuY29va2llc1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJKHZhbHVlKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iLCJcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUhhbmRsZXIge1xuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGRhdGEpO1xuICAgIH1cblxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZVtrZXldKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEJhc2VTdG9yYWdlIHtcbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBhbnnDgsKge31cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBEYXRlKTogdm9pZCB7fVxuICAgIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge31cbn1cblxuZXhwb3J0IGNsYXNzIENvb2tpZVN0b3JhZ2UgZXh0ZW5kcyBCYXNlU3RvcmFnZcOCwqB7fVxuZXhwb3J0IGNsYXNzIFdlYkxvY2FsU3RvcmFnZSBleHRlbmRzIEJhc2VTdG9yYWdlIHt9XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEh0dHBIZWFkZXJzLCBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNlcnZpY2U8VCBleHRlbmRzIEJhc2VNb2RlbD4gIHtcbiAgICBodHRwT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICdBY2NlcHQnOiAnKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9KVxuICAgIH07XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoJ3VybCcpIHByb3RlY3RlZCB1cmw6IHN0cmluZyxcbiAgICAgICAgQEluamVjdCgnZW5kcG9pbnQnKSBwcm90ZWN0ZWQgZW5kcG9pbnQ6IHN0cmluZyxcblxuICAgICAgICAvLyBwcml2YXRlIHVybDogc3RyaW5nLFxuICAgICkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbChoZWFkZXJzPyk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9YCwgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogVFtdKSA9PiBkYXRhKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QnlJZChfaWQ6IHN0cmluZywgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vJHtfaWR9YCwgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogVCkgPT4gZGF0YSksXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUoaXRlbTogVCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFQ+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9YCwgaXRlbSwgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogVCkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShfaWQ6IHN0cmluZywgaXRlbTogVCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgaXRlbS5faWQgPSBfaWQ7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2g8VD4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCBpdGVtLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUNvbXBsZXRlKF9pZDogc3RyaW5nLCBpdGVtOiBULCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBpdGVtLl9pZCA9IF9pZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8VD4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCBpdGVtLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShfaWQ6IHN0cmluZywgaGVhZGVycz8pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTxUPihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS8ke19pZH1gLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycz8pIHtcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmh0dHBPcHRpb25zKTtcbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpLmZvckVhY2goKGhlYWRlcktleSkgPT4ge1xuICAgICAgICAgICAgICAgIGh0dHBPcHRpb25zLmhlYWRlcnMgPSBodHRwT3B0aW9ucy5oZWFkZXJzLmFwcGVuZChoZWFkZXJLZXksIGhlYWRlcnNbaGVhZGVyS2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHVibGljIGh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycz8pIHtcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnKicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnWC1Ta2lwLUludGVyY2VwdG9yJzogJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpLmZvckVhY2goKGhlYWRlcktleSkgPT4ge1xuICAgICAgICAgICAgICAgIGh0dHBPcHRpb25zLmhlYWRlcnMgPSBodHRwT3B0aW9ucy5oZWFkZXJzLmFwcGVuZChoZWFkZXJLZXksIGhlYWRlcnNbaGVhZGVyS2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cE9wdGlvbnM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9naW5CYXNlU2VydmljZTxUIGV4dGVuZHMgQmFzZU1vZGVsPiBleHRlbmRzIEJhc2VTZXJ2aWNlPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBASW5qZWN0KCd1cmwnKSBwcm90ZWN0ZWQgdXJsOiBzdHJpbmcsXG4gICAgICAgIEBJbmplY3QoJ2VuZHBvaW50JykgcHJvdGVjdGVkIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgaHR0cCwgdXJsLCBlbmRwb2ludFxuICAgICAgICApO1xuXG4gICAgfVxuICAgIHB1YmxpYyBsb2dpbihjcmVkZW50aWFscywgaGVhZGVycz8pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS9sb2dpbmAsIGNyZWRlbnRpYWxzLCB0aGlzLmh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGEpID0+IGRhdGEpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXNzd29yZFJlY292ZXJ5KGVtYWlsLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9L3Bhc3N3b3JkLXJlY292ZXJ5YCwgZW1haWwsIHRoaXMuaHR0cEhlYWRlcnNXaXRob3V0QXV0aChoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuICAgIHB1YmxpYyByZXNldFBhc3N3b3JkKG5ld1Bhc3N3b3JkLCBoYXNoLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9L3Jlc2V0LXBhc3N3b3JkYCxcbiAgICAgICAgICAgIHsgJ25ld1Bhc3N3b3JkJzogbmV3UGFzc3dvcmQsICdoYXNoJzogaGFzaCB9LCB0aGlzLmh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGEpID0+IGRhdGEpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDdXJyZW50VXNlcih0b2tlbiwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy51cmwgKyAnL3VzZXJzLW1lJywgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgLnBpcGUobWFwKChkYXRhOiBhbnkpID0+IGRhdGEpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXIoaXRlbTogVCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vcmVnaXN0ZXJgLCBpdGVtICwgdGhpcy5odHRwSGVhZGVyc1dpdGhvdXRBdXRoKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBhbnkpID0+IGRhdGEpXG4gICAgICAgICAgICApO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQXV0aFRva2VuSW50ZXJmYWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdXRoLXRva2VuLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBBdXRoVG9rZW4gaW1wbGVtZW50cyBBdXRoVG9rZW5JbnRlcmZhY2Uge1xuICAgIGlkID0gbnVsbDtcbiAgICB0dGwgPSBudWxsO1xuICAgIGNyZWF0ZWQgPSBudWxsO1xuICAgIHVzZXJJZCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhPzogQXV0aFRva2VuSW50ZXJmYWNlKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb29raWVTdG9yYWdlIH0gZnJvbSAnLi4vLi4vc3RvcmFnZS9zdG9yYWdlLmhhbmRsZXInO1xuaW1wb3J0IHsgQXV0aFRva2VuIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2F1dGgtdG9rZW4ubW9kZWwnO1xuXG5jb25zdCBUT0tFTl9JRCA9ICd0b2tlbl9pZCc7XG5jb25zdCBUT0tFTl9UVEwgPSAndG9rZW5fdHRsJztcbmNvbnN0IFRPS0VOX0NSRUFURUQgPSAndG9rZW5fY3JlYXRlZCc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgdG9rZW4gPSBuZXcgQXV0aFRva2VuKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KENvb2tpZVN0b3JhZ2UpIHByb3RlY3RlZCBzdG9yYWdlOiBDb29raWVTdG9yYWdlKSB7XG4gICAgICAgIHRoaXMudG9rZW4uaWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFRPS0VOX0lEKTtcbiAgICAgICAgdGhpcy50b2tlbi50dGwgPSB0aGlzLnN0b3JhZ2UuZ2V0KFRPS0VOX1RUTCk7XG4gICAgICAgIHRoaXMudG9rZW4uY3JlYXRlZCA9IHRoaXMuc3RvcmFnZS5nZXQoVE9LRU5fQ1JFQVRFRCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRva2VuKCk6IEF1dGhUb2tlbiB7XG4gICAgICAgIHJldHVybiA8QXV0aFRva2VuPnRoaXMudG9rZW47XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRva2VuKHRva2VuSWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB0b2tlbiA9IG5ldyBBdXRoVG9rZW4oKTtcbiAgICAgICAgdG9rZW4uaWQgPSB0b2tlbklkO1xuICAgICAgICB0aGlzLnBlcnNpc3QoVE9LRU5fSUQsIHRva2VuLmlkLCB0aGlzLmV4cGlyZXNUaW1lKCkpO1xuICAgICAgICB0aGlzLnBlcnNpc3QoVE9LRU5fVFRMLCB0aGlzLmV4cGlyZXNUaW1lKCksIHRoaXMuZXhwaXJlc1RpbWUoKSk7XG4gICAgICAgIHRoaXMucGVyc2lzdChUT0tFTl9DUkVBVEVELCBuZXcgRGF0ZSgpLCB0aGlzLmV4cGlyZXNUaW1lKCkpO1xuICAgICAgICB0b2tlbi50dGwgPSB0aGlzLmV4cGlyZXNUaW1lKCk7XG4gICAgICAgIHRva2VuLmNyZWF0ZWQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnRva2VuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy50b2tlbiwgdG9rZW4pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVUb2tlbigpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZShUT0tFTl9JRCk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoVE9LRU5fVFRMKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZShUT0tFTl9DUkVBVEVEKTtcbiAgICAgICAgdGhpcy50b2tlbiA9IG5ldyBBdXRoVG9rZW4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGVyc2lzdCh0b2tlbl9wcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogRGF0ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChcbiAgICAgICAgICAgICAgICBgJHt0b2tlbl9wcm9wZXJ0eX1gLFxuICAgICAgICAgICAgICAgICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IHZhbHVlLFxuICAgICAgICAgICAgICAgIGV4cGlyZXMgPyBleHBpcmVzIDogbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGV4cGlyZXNUaW1lKCkge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZERheXModG9kYXksIDMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRGF5cyhkYXRlLCBkYXlzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG59XG5cblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3QsIEh0dHBIYW5kbGVyLCBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UnO1xuXG5cbmV4cG9ydCBjb25zdCBJbnRlcmNlcHRvclNraXBIZWFkZXIgPSAnWC1Ta2lwLUludGVyY2VwdG9yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHt9XG5cbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcikge1xuICAgICAgICAvLyBHZXQgdGhlIGF1dGggdG9rZW4gZnJvbSB0aGUgY29va2llU3RvcmFnZS5cbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmdldFRva2VuKCk7XG4gICAgICAgIGNvbnN0IGF1dGhUb2tlbiA9IGBCZWFyZXIgJHt0b2tlbi5pZH1gOyAvLyBnZXQgVE9LRU5cblxuICAgICAgICAvLyBDbG9uZSByZXF1ZXN0IGFuZCB1cGRhdGUgd2l0aCBBdXRoXG4gICAgICAgIGlmIChyZXEuaGVhZGVycy5oYXMoSW50ZXJjZXB0b3JTa2lwSGVhZGVyKSkge1xuICAgICAgICAgICAgY29uc3Qgbm9BdXRoUmVxID0gcmVxLmNsb25lKHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5kZWxldGUoSW50ZXJjZXB0b3JTa2lwSGVhZGVyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUobm9BdXRoUmVxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF1dGhSZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgYXV0aFRva2VuKVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzZW5kIGNsb25lZCByZXF1ZXN0IHdpdGggaGVhZGVyIHRvIHRoZSBuZXh0IGhhbmRsZXIuXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yLCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvcmUvYXV0aC5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxuXG4gICAgaW50ZXJjZXB0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KS5waXBlKGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgICAgbGV0IGVycm9yTXNnO1xuICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgLy8gYXV0byBsb2dvdXQgaWYgNDAxIHJlc3BvbnNlIHJldHVybmVkIGZyb20gYXBpXG4gICAgICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVtb3ZlVG9rZW4oKTtcbiAgICAgICAgICAgICAgICBlcnJvck1zZyA9IGBFcnJvcjogTm8gdGllbmUgYXV0b3JpemFjacODwrNuYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBlcnJvci5lcnJvci5tZXNzYWdlIHx8IGVycm9yLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbn1cbiIsIlxuXG5leHBvcnQgY2xhc3MgQmFzZU1vZGVsIHtcbiAgICBfaWQ6IHN0cmluZztcbiAgICBpbnN0YW5jZTogYW55O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUywgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbi8vIGltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciwgRXJyb3JJbnRlcmNlcHRvciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb2dpbkJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2xvZ2luLWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICcuL2hlbHBlcnMvYXV0aC5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBFcnJvckludGVyY2VwdG9yIH0gZnJvbSAnLi9oZWxwZXJzL2Vycm9yLmludGVyY2VwdG9yJztcbmltcG9ydCB7IFdlYkxvY2FsU3RvcmFnZSwgQ29va2llU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmhhbmRsZXInO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlSGFuZGxlciB9IGZyb20gJy4vc3RvcmFnZS9sb2NhbC1zdG9yYWdlLmhhbmRsZXInO1xuaW1wb3J0IHsgQ29va2llSGFuZGxlciB9IGZyb20gJy4vc3RvcmFnZS9jb29raWUuaGFuZGxlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBHbm9tbW9CYXNlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoeyB9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBHbm9tbW9CYXNlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC8vIFNlcnZpY2VzXG4gICAgICAgICBCYXNlU2VydmljZSxcbiAgICAgICAgIEF1dGhTZXJ2aWNlLFxuICAgICAgICAgTG9naW5CYXNlU2VydmljZSxcblxuICAgICAgICAvLyAvLyBJbnRlcmNlcHRvcnNcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEF1dGhJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEVycm9ySW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXG5cbiAgICAgICAgLy8gLy8gU3RvcmFnZVxuICAgICAgICB7IHByb3ZpZGU6IFdlYkxvY2FsU3RvcmFnZSwgdXNlQ2xhc3M6IExvY2FsU3RvcmFnZUhhbmRsZXIgfSxcbiAgICAgICAgeyBwcm92aWRlOiBDb29raWVTdG9yYWdlLCB1c2VDbGFzczogQ29va2llSGFuZGxlciB9XG5cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbi8vIGV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcyc7XG4vLyBleHBvcnQgKiBmcm9tICcuL2hlbHBlcnMnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcyc7XG4vLyBleHBvcnQgKiBmcm9tICcuL3N0b3JhZ2UnO1xuXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzt1QkFPcUMsRUFBRTs7Ozs7O0lBRXJDLEdBQUcsQ0FBQyxHQUFXO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7O1lBQ3RCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRO2lCQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNsQixNQUFNLENBQUMsQ0FBQyxJQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM1RSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUI7Ozs7Ozs7SUFFRCxHQUFHLENBQUMsR0FBVyxFQUFF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