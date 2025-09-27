import { Injectable, Inject, NgModule } from '@angular/core';
import { __extends } from 'tslib';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CookieHandler = /** @class */ (function () {
    function CookieHandler() {
        this.cookies = {};
    }
    /**
     * @param {?} key
     * @return {?}
     */
    CookieHandler.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (!this.cookies[key]) {
            /** @type {?} */
            var cookie = window.document
                .cookie.split('; ')
                .filter(function (item) { return item.split('=')[0] === key; }).pop();
            if (!cookie) {
                return null;
            }
            this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
        }
        return this.cookies[key];
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    CookieHandler.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    function (key, value, expires) {
        this.cookies[key] = value;
        /** @type {?} */
        var cookie = key + "=" + encodeURI(value) + "; path=/" + (expires ? "; expires=" + expires.toUTCString() : '');
        window.document.cookie = cookie;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CookieHandler.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        delete this.cookies[key];
    };
    /**
     * @param {?} value
     * @return {?}
     */
    CookieHandler.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        try {
            return JSON.parse(decodeURI(value));
        }
        catch (e) {
            return value;
        }
    };
    CookieHandler.decorators = [
        { type: Injectable },
    ];
    return CookieHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LocalStorageHandler = /** @class */ (function () {
    function LocalStorageHandler() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    LocalStorageHandler.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var data = localStorage.getItem(key);
        return this.parse(data);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    LocalStorageHandler.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    function (key, value, expires) {
        localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    LocalStorageHandler.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    LocalStorageHandler.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    };
    return LocalStorageHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var BaseStorage = /** @class */ (function () {
    function BaseStorage() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    BaseStorage.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) { };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    BaseStorage.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @return {?}
     */
    function (key, value, expires) { };
    /**
     * @param {?} key
     * @return {?}
     */
    BaseStorage.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) { };
    return BaseStorage;
}());
var CookieStorage = /** @class */ (function (_super) {
    __extends(CookieStorage, _super);
    function CookieStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CookieStorage;
}(BaseStorage));
var WebLocalStorage = /** @class */ (function (_super) {
    __extends(WebLocalStorage, _super);
    function WebLocalStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebLocalStorage;
}(BaseStorage));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template T
 */
var LoginBaseService = /** @class */ (function (_super) {
    __extends(LoginBaseService, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AuthToken = /** @class */ (function () {
    function AuthToken(data) {
        this.id = null;
        this.ttl = null;
        this.created = null;
        this.userId = null;
        Object.assign(this, data);
    }
    return AuthToken;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var InterceptorSkipHeader = 'X-Skip-Interceptor';
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(authService) {
        this.authService = authService;
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    ErrorInterceptor.prototype.intercept = /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (request, next) {
        var _this = this;
        return next.handle(request).pipe(catchError(function (error) {
            /** @type {?} */
            var errorMsg;
            if (error.status === 401) {
                // auto logout if 401 response returned from api
                // location.reload(true);
                // auto logout if 401 response returned from api
                // location.reload(true);
                _this.authService.removeToken();
                errorMsg = "Error: No tiene autorizaci\u00F3n";
            }
            else {
                errorMsg = error.error.message || error.statusText;
            }
            return throwError(error);
        }));
    };
    ErrorInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ErrorInterceptor.ctorParameters = function () { return [
        { type: AuthService }
    ]; };
    return ErrorInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var BaseModel = /** @class */ (function () {
    function BaseModel() {
    }
    return BaseModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GnommoBaseModule = /** @class */ (function () {
    function GnommoBaseModule() {
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    GnommoBaseModule.forRoot = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
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
    };
    GnommoBaseModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, HttpClientModule],
                },] },
    ];
    return GnommoBaseModule;
}());
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ25vbW1vc3R1ZGlvcy1uZy1nbm9tbW8tYmFzZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvbGliL2dub21tby1iYXNlL3N0b3JhZ2UvY29va2llLmhhbmRsZXIudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9zdG9yYWdlL2xvY2FsLXN0b3JhZ2UuaGFuZGxlci50cyIsIm5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvbGliL2dub21tby1iYXNlL3N0b3JhZ2Uvc3RvcmFnZS5oYW5kbGVyLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9iYXNlLnNlcnZpY2UudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9zZXJ2aWNlcy9jb3JlL2xvZ2luLWJhc2Uuc2VydmljZS50cyIsIm5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvbGliL2dub21tby1iYXNlL21vZGVscy9hdXRoLXRva2VuLm1vZGVsLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9oZWxwZXJzL2F1dGguaW50ZXJjZXB0b3IudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9oZWxwZXJzL2Vycm9yLmludGVyY2VwdG9yLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2UvbW9kZWxzL2Jhc2UubW9kZWwudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9nbm9tbW8tYmFzZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBDb29raWVJbnRlcmZhY2Uge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvb2tpZUhhbmRsZXIge1xuICBwcml2YXRlIGNvb2tpZXM6IENvb2tpZUludGVyZmFjZSA9IHt9O1xuXG4gIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZXNba2V5XSkge1xuICAgICAgY29uc3QgY29va2llID0gd2luZG93LmRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgLmNvb2tpZS5zcGxpdCgnOyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbS5zcGxpdCgnPScpWzBdID09PSBrZXkpLnBvcCgpO1xuICAgICAgaWYgKCFjb29raWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29va2llc1trZXldID0gdGhpcy5wYXJzZShjb29raWUuc3BsaXQoJz0nKS5zbGljZSgxKS5qb2luKCc9JykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvb2tpZXNba2V5XTtcbiAgfVxuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcbiAgICB0aGlzLmNvb2tpZXNba2V5XSA9IHZhbHVlO1xuICAgIGNvbnN0IGNvb2tpZSA9IGAke2tleX09JHtlbmNvZGVVUkkodmFsdWUpfTsgcGF0aD0vJHtleHBpcmVzID8gYDsgZXhwaXJlcz0keyBleHBpcmVzLnRvVVRDU3RyaW5nKCkgfWAgOiAnJ31gO1xuICAgIHdpbmRvdy5kb2N1bWVudC5jb29raWUgPSBjb29raWU7XG4gIH1cblxuICByZW1vdmUoa2V5OiBzdHJpbmcpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSBrZXkgKyAnPTsgcGF0aD0vOyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UOyc7XG4gICAgZGVsZXRlIHRoaXMuY29va2llc1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJKHZhbHVlKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iLCJcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUhhbmRsZXIge1xuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGRhdGEpO1xuICAgIH1cblxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZVtrZXldKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEJhc2VTdG9yYWdlIHtcbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBhbnnDgsKge31cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBEYXRlKTogdm9pZCB7fVxuICAgIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge31cbn1cblxuZXhwb3J0IGNsYXNzIENvb2tpZVN0b3JhZ2UgZXh0ZW5kcyBCYXNlU3RvcmFnZcOCwqB7fVxuZXhwb3J0IGNsYXNzIFdlYkxvY2FsU3RvcmFnZSBleHRlbmRzIEJhc2VTdG9yYWdlIHt9XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEh0dHBIZWFkZXJzLCBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNlcnZpY2U8VCBleHRlbmRzIEJhc2VNb2RlbD4gIHtcbiAgICBodHRwT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICdBY2NlcHQnOiAnKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9KVxuICAgIH07XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoJ3VybCcpIHByb3RlY3RlZCB1cmw6IHN0cmluZyxcbiAgICAgICAgQEluamVjdCgnZW5kcG9pbnQnKSBwcm90ZWN0ZWQgZW5kcG9pbnQ6IHN0cmluZyxcblxuICAgICAgICAvLyBwcml2YXRlIHVybDogc3RyaW5nLFxuICAgICkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbChoZWFkZXJzPyk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9YCwgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogVFtdKSA9PiBkYXRhKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QnlJZChfaWQ6IHN0cmluZywgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vJHtfaWR9YCwgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogVCkgPT4gZGF0YSksXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUoaXRlbTogVCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFQ+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9YCwgaXRlbSwgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogVCkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShfaWQ6IHN0cmluZywgaXRlbTogVCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgaXRlbS5faWQgPSBfaWQ7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2g8VD4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCBpdGVtLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUNvbXBsZXRlKF9pZDogc3RyaW5nLCBpdGVtOiBULCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBpdGVtLl9pZCA9IF9pZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8VD4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCBpdGVtLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShfaWQ6IHN0cmluZywgaGVhZGVycz8pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTxUPihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS8ke19pZH1gLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycz8pIHtcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmh0dHBPcHRpb25zKTtcbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpLmZvckVhY2goKGhlYWRlcktleSkgPT4ge1xuICAgICAgICAgICAgICAgIGh0dHBPcHRpb25zLmhlYWRlcnMgPSBodHRwT3B0aW9ucy5oZWFkZXJzLmFwcGVuZChoZWFkZXJLZXksIGhlYWRlcnNbaGVhZGVyS2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHVibGljIGh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycz8pIHtcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnKicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnWC1Ta2lwLUludGVyY2VwdG9yJzogJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpLmZvckVhY2goKGhlYWRlcktleSkgPT4ge1xuICAgICAgICAgICAgICAgIGh0dHBPcHRpb25zLmhlYWRlcnMgPSBodHRwT3B0aW9ucy5oZWFkZXJzLmFwcGVuZChoZWFkZXJLZXksIGhlYWRlcnNbaGVhZGVyS2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHR0cE9wdGlvbnM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9naW5CYXNlU2VydmljZTxUIGV4dGVuZHMgQmFzZU1vZGVsPiBleHRlbmRzIEJhc2VTZXJ2aWNlPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBASW5qZWN0KCd1cmwnKSBwcm90ZWN0ZWQgdXJsOiBzdHJpbmcsXG4gICAgICAgIEBJbmplY3QoJ2VuZHBvaW50JykgcHJvdGVjdGVkIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgaHR0cCwgdXJsLCBlbmRwb2ludFxuICAgICAgICApO1xuXG4gICAgfVxuICAgIHB1YmxpYyBsb2dpbihjcmVkZW50aWFscywgaGVhZGVycz8pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS9sb2dpbmAsIGNyZWRlbnRpYWxzLCB0aGlzLmh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGEpID0+IGRhdGEpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXNzd29yZFJlY292ZXJ5KGVtYWlsLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9L3Bhc3N3b3JkLXJlY292ZXJ5YCwgZW1haWwsIHRoaXMuaHR0cEhlYWRlcnNXaXRob3V0QXV0aChoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuICAgIHB1YmxpYyByZXNldFBhc3N3b3JkKG5ld1Bhc3N3b3JkLCBoYXNoLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9L3Jlc2V0LXBhc3N3b3JkYCxcbiAgICAgICAgICAgIHsgJ25ld1Bhc3N3b3JkJzogbmV3UGFzc3dvcmQsICdoYXNoJzogaGFzaCB9LCB0aGlzLmh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGEpID0+IGRhdGEpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDdXJyZW50VXNlcih0b2tlbiwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy51cmwgKyAnL3VzZXJzLW1lJywgdGhpcy5jcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzKSlcbiAgICAgICAgLnBpcGUobWFwKChkYXRhOiBhbnkpID0+IGRhdGEpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXIoaXRlbTogVCwgaGVhZGVycz8pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vcmVnaXN0ZXJgLCBpdGVtICwgdGhpcy5odHRwSGVhZGVyc1dpdGhvdXRBdXRoKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBhbnkpID0+IGRhdGEpXG4gICAgICAgICAgICApO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQXV0aFRva2VuSW50ZXJmYWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdXRoLXRva2VuLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBBdXRoVG9rZW4gaW1wbGVtZW50cyBBdXRoVG9rZW5JbnRlcmZhY2Uge1xuICAgIGlkID0gbnVsbDtcbiAgICB0dGwgPSBudWxsO1xuICAgIGNyZWF0ZWQgPSBudWxsO1xuICAgIHVzZXJJZCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhPzogQXV0aFRva2VuSW50ZXJmYWNlKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb29raWVTdG9yYWdlIH0gZnJvbSAnLi4vLi4vc3RvcmFnZS9zdG9yYWdlLmhhbmRsZXInO1xuaW1wb3J0IHsgQXV0aFRva2VuIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2F1dGgtdG9rZW4ubW9kZWwnO1xuXG5jb25zdCBUT0tFTl9JRCA9ICd0b2tlbl9pZCc7XG5jb25zdCBUT0tFTl9UVEwgPSAndG9rZW5fdHRsJztcbmNvbnN0IFRPS0VOX0NSRUFURUQgPSAndG9rZW5fY3JlYXRlZCc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgdG9rZW4gPSBuZXcgQXV0aFRva2VuKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KENvb2tpZVN0b3JhZ2UpIHByb3RlY3RlZCBzdG9yYWdlOiBDb29raWVTdG9yYWdlKSB7XG4gICAgICAgIHRoaXMudG9rZW4uaWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFRPS0VOX0lEKTtcbiAgICAgICAgdGhpcy50b2tlbi50dGwgPSB0aGlzLnN0b3JhZ2UuZ2V0KFRPS0VOX1RUTCk7XG4gICAgICAgIHRoaXMudG9rZW4uY3JlYXRlZCA9IHRoaXMuc3RvcmFnZS5nZXQoVE9LRU5fQ1JFQVRFRCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRva2VuKCk6IEF1dGhUb2tlbiB7XG4gICAgICAgIHJldHVybiA8QXV0aFRva2VuPnRoaXMudG9rZW47XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRva2VuKHRva2VuSWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB0b2tlbiA9IG5ldyBBdXRoVG9rZW4oKTtcbiAgICAgICAgdG9rZW4uaWQgPSB0b2tlbklkO1xuICAgICAgICB0aGlzLnBlcnNpc3QoVE9LRU5fSUQsIHRva2VuLmlkLCB0aGlzLmV4cGlyZXNUaW1lKCkpO1xuICAgICAgICB0aGlzLnBlcnNpc3QoVE9LRU5fVFRMLCB0aGlzLmV4cGlyZXNUaW1lKCksIHRoaXMuZXhwaXJlc1RpbWUoKSk7XG4gICAgICAgIHRoaXMucGVyc2lzdChUT0tFTl9DUkVBVEVELCBuZXcgRGF0ZSgpLCB0aGlzLmV4cGlyZXNUaW1lKCkpO1xuICAgICAgICB0b2tlbi50dGwgPSB0aGlzLmV4cGlyZXNUaW1lKCk7XG4gICAgICAgIHRva2VuLmNyZWF0ZWQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnRva2VuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy50b2tlbiwgdG9rZW4pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVUb2tlbigpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZShUT0tFTl9JRCk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoVE9LRU5fVFRMKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZShUT0tFTl9DUkVBVEVEKTtcbiAgICAgICAgdGhpcy50b2tlbiA9IG5ldyBBdXRoVG9rZW4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGVyc2lzdCh0b2tlbl9wcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogRGF0ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChcbiAgICAgICAgICAgICAgICBgJHt0b2tlbl9wcm9wZXJ0eX1gLFxuICAgICAgICAgICAgICAgICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IHZhbHVlLFxuICAgICAgICAgICAgICAgIGV4cGlyZXMgPyBleHBpcmVzIDogbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGV4cGlyZXNUaW1lKCkge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZERheXModG9kYXksIDMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRGF5cyhkYXRlLCBkYXlzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG59XG5cblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3QsIEh0dHBIYW5kbGVyLCBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UnO1xuXG5cbmV4cG9ydCBjb25zdCBJbnRlcmNlcHRvclNraXBIZWFkZXIgPSAnWC1Ta2lwLUludGVyY2VwdG9yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHt9XG5cbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcikge1xuICAgICAgICAvLyBHZXQgdGhlIGF1dGggdG9rZW4gZnJvbSB0aGUgY29va2llU3RvcmFnZS5cbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmdldFRva2VuKCk7XG4gICAgICAgIGNvbnN0IGF1dGhUb2tlbiA9IGBCZWFyZXIgJHt0b2tlbi5pZH1gOyAvLyBnZXQgVE9LRU5cblxuICAgICAgICAvLyBDbG9uZSByZXF1ZXN0IGFuZCB1cGRhdGUgd2l0aCBBdXRoXG4gICAgICAgIGlmIChyZXEuaGVhZGVycy5oYXMoSW50ZXJjZXB0b3JTa2lwSGVhZGVyKSkge1xuICAgICAgICAgICAgY29uc3Qgbm9BdXRoUmVxID0gcmVxLmNsb25lKHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5kZWxldGUoSW50ZXJjZXB0b3JTa2lwSGVhZGVyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUobm9BdXRoUmVxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGF1dGhSZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgYXV0aFRva2VuKVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzZW5kIGNsb25lZCByZXF1ZXN0IHdpdGggaGVhZGVyIHRvIHRoZSBuZXh0IGhhbmRsZXIuXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yLCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvcmUvYXV0aC5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxuXG4gICAgaW50ZXJjZXB0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KS5waXBlKGNhdGNoRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAgICAgbGV0IGVycm9yTXNnO1xuICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgLy8gYXV0byBsb2dvdXQgaWYgNDAxIHJlc3BvbnNlIHJldHVybmVkIGZyb20gYXBpXG4gICAgICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVtb3ZlVG9rZW4oKTtcbiAgICAgICAgICAgICAgICBlcnJvck1zZyA9IGBFcnJvcjogTm8gdGllbmUgYXV0b3JpemFjacODwrNuYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBlcnJvci5lcnJvci5tZXNzYWdlIHx8IGVycm9yLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbn1cbiIsIlxuXG5leHBvcnQgY2xhc3MgQmFzZU1vZGVsIHtcbiAgICBfaWQ6IHN0cmluZztcbiAgICBpbnN0YW5jZTogYW55O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUywgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbi8vIGltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciwgRXJyb3JJbnRlcmNlcHRvciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb2dpbkJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2xvZ2luLWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICcuL2hlbHBlcnMvYXV0aC5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBFcnJvckludGVyY2VwdG9yIH0gZnJvbSAnLi9oZWxwZXJzL2Vycm9yLmludGVyY2VwdG9yJztcbmltcG9ydCB7IFdlYkxvY2FsU3RvcmFnZSwgQ29va2llU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmhhbmRsZXInO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlSGFuZGxlciB9IGZyb20gJy4vc3RvcmFnZS9sb2NhbC1zdG9yYWdlLmhhbmRsZXInO1xuaW1wb3J0IHsgQ29va2llSGFuZGxlciB9IGZyb20gJy4vc3RvcmFnZS9jb29raWUuaGFuZGxlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBHbm9tbW9CYXNlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoeyB9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBHbm9tbW9CYXNlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC8vIFNlcnZpY2VzXG4gICAgICAgICBCYXNlU2VydmljZSxcbiAgICAgICAgIEF1dGhTZXJ2aWNlLFxuICAgICAgICAgTG9naW5CYXNlU2VydmljZSxcblxuICAgICAgICAvLyAvLyBJbnRlcmNlcHRvcnNcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEF1dGhJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEVycm9ySW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXG5cbiAgICAgICAgLy8gLy8gU3RvcmFnZVxuICAgICAgICB7IHByb3ZpZGU6IFdlYkxvY2FsU3RvcmFnZSwgdXNlQ2xhc3M6IExvY2FsU3RvcmFnZUhhbmRsZXIgfSxcbiAgICAgICAgeyBwcm92aWRlOiBDb29raWVTdG9yYWdlLCB1c2VDbGFzczogQ29va2llSGFuZGxlciB9XG5cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbi8vIGV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcyc7XG4vLyBleHBvcnQgKiBmcm9tICcuL2hlbHBlcnMnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcyc7XG4vLyBleHBvcnQgKiBmcm9tICcuL3N0b3JhZ2UnO1xuXG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O3VCQU9xQyxFQUFFOzs7Ozs7SUFFckMsMkJBQUc7Ozs7SUFBSCxVQUFJLEdBQVc7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTs7WUFDdEIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVE7aUJBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ2xCLE1BQU0sQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFBLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM1RSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENB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