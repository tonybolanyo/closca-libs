(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/operators'), require('@angular/common/http'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@gnommostudios/ng-gnommo-base', ['exports', '@angular/core', 'rxjs/operators', '@angular/common/http', 'rxjs', '@angular/common'], factory) :
    (factory((global.gnommostudios = global.gnommostudios || {}, global.gnommostudios['ng-gnommo-base'] = {}),global.ng.core,global.rxjs.operators,global.ng.common.http,global.rxjs,global.ng.common));
}(this, (function (exports,core,operators,http,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var CookieHandler = (function () {
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
            { type: core.Injectable },
        ];
        return CookieHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LocalStorageHandler = (function () {
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var BaseStorage = (function () {
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
    var CookieStorage = (function (_super) {
        __extends(CookieStorage, _super);
        function CookieStorage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CookieStorage;
    }(BaseStorage));
    var WebLocalStorage = (function (_super) {
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
    var BaseService = (function () {
        function BaseService(http$$1, url, endpoint) {
            this.http = http$$1;
            this.url = url;
            this.endpoint = endpoint;
            this.httpOptions = {
                headers: new http.HttpHeaders({
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    headers: new http.HttpHeaders({
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        BaseService.ctorParameters = function () {
            return [
                { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
                { type: String, decorators: [{ type: core.Inject, args: ['url',] }] },
                { type: String, decorators: [{ type: core.Inject, args: ['endpoint',] }] }
            ];
        };
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
    var LoginBaseService = (function (_super) {
        __extends(LoginBaseService, _super);
        function LoginBaseService(http$$1, url, endpoint) {
            var _this = _super.call(this, http$$1, url, endpoint) || this;
            _this.http = http$$1;
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    .pipe(operators.map(function (data) { return data; }));
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
                    .pipe(operators.map(function (data) { return data; }));
            };
        LoginBaseService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        LoginBaseService.ctorParameters = function () {
            return [
                { type: http.HttpClient, decorators: [{ type: core.Inject, args: [http.HttpClient,] }] },
                { type: String, decorators: [{ type: core.Inject, args: ['url',] }] },
                { type: String, decorators: [{ type: core.Inject, args: ['endpoint',] }] }
            ];
        };
        return LoginBaseService;
    }(BaseService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AuthToken = (function () {
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
    var AuthService = (function () {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AuthService.ctorParameters = function () {
            return [
                { type: CookieStorage, decorators: [{ type: core.Inject, args: [CookieStorage,] }] }
            ];
        };
        return AuthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var InterceptorSkipHeader = 'X-Skip-Interceptor';
    var AuthInterceptor = (function () {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AuthInterceptor.ctorParameters = function () {
            return [
                { type: AuthService }
            ];
        };
        return AuthInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ErrorInterceptor = (function () {
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
                return next.handle(request).pipe(operators.catchError(function (error) {
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
                    return rxjs.throwError(error);
                }));
            };
        ErrorInterceptor.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        ErrorInterceptor.ctorParameters = function () {
            return [
                { type: AuthService }
            ];
        };
        return ErrorInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var BaseModel = (function () {
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
    var GnommoBaseModule = (function () {
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
                        { provide: http.HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                        { provide: http.HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                        // // Storage
                        { provide: WebLocalStorage, useClass: LocalStorageHandler },
                        { provide: CookieStorage, useClass: CookieHandler }
                    ]
                };
            };
        GnommoBaseModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, http.HttpClientModule],
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

    exports.CookieHandler = CookieHandler;
    exports.LocalStorageHandler = LocalStorageHandler;
    exports.BaseStorage = BaseStorage;
    exports.WebLocalStorage = WebLocalStorage;
    exports.CookieStorage = CookieStorage;
    exports.BaseService = BaseService;
    exports.LoginBaseService = LoginBaseService;
    exports.AuthService = AuthService;
    exports.AuthInterceptor = AuthInterceptor;
    exports.ErrorInterceptor = ErrorInterceptor;
    exports.AuthToken = AuthToken;
    exports.BaseModel = BaseModel;
    exports.GnommoBaseModule = GnommoBaseModule;
    exports.ɵg = AuthInterceptor;
    exports.ɵh = ErrorInterceptor;
    exports.ɵb = AuthService;
    exports.ɵa = BaseService;
    exports.ɵf = LoginBaseService;
    exports.ɵj = CookieHandler;
    exports.ɵi = LocalStorageHandler;
    exports.ɵc = BaseStorage;
    exports.ɵd = CookieStorage;
    exports.ɵe = WebLocalStorage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ25vbW1vc3R1ZGlvcy1uZy1nbm9tbW8tYmFzZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9zdG9yYWdlL2Nvb2tpZS5oYW5kbGVyLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2Uvc3RvcmFnZS9sb2NhbC1zdG9yYWdlLmhhbmRsZXIudHMiLG51bGwsIm5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvbGliL2dub21tby1iYXNlL3N0b3JhZ2Uvc3RvcmFnZS5oYW5kbGVyLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9iYXNlLnNlcnZpY2UudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9zZXJ2aWNlcy9jb3JlL2xvZ2luLWJhc2Uuc2VydmljZS50cyIsIm5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvbGliL2dub21tby1iYXNlL21vZGVscy9hdXRoLXRva2VuLm1vZGVsLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9oZWxwZXJzL2F1dGguaW50ZXJjZXB0b3IudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9oZWxwZXJzL2Vycm9yLmludGVyY2VwdG9yLnRzIiwibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS9saWIvZ25vbW1vLWJhc2UvbW9kZWxzL2Jhc2UubW9kZWwudHMiLCJuZzovL0Bnbm9tbW9zdHVkaW9zL25nLWdub21tby1iYXNlL2xpYi9nbm9tbW8tYmFzZS9nbm9tbW8tYmFzZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBDb29raWVJbnRlcmZhY2Uge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvb2tpZUhhbmRsZXIge1xuICBwcml2YXRlIGNvb2tpZXM6IENvb2tpZUludGVyZmFjZSA9IHt9O1xuXG4gIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZXNba2V5XSkge1xuICAgICAgY29uc3QgY29va2llID0gd2luZG93LmRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgLmNvb2tpZS5zcGxpdCgnOyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbS5zcGxpdCgnPScpWzBdID09PSBrZXkpLnBvcCgpO1xuICAgICAgaWYgKCFjb29raWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29va2llc1trZXldID0gdGhpcy5wYXJzZShjb29raWUuc3BsaXQoJz0nKS5zbGljZSgxKS5qb2luKCc9JykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvb2tpZXNba2V5XTtcbiAgfVxuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcbiAgICB0aGlzLmNvb2tpZXNba2V5XSA9IHZhbHVlO1xuICAgIGNvbnN0IGNvb2tpZSA9IGAke2tleX09JHtlbmNvZGVVUkkodmFsdWUpfTsgcGF0aD0vJHtleHBpcmVzID8gYDsgZXhwaXJlcz0keyBleHBpcmVzLnRvVVRDU3RyaW5nKCkgfWAgOiAnJ31gO1xuICAgIHdpbmRvdy5kb2N1bWVudC5jb29raWUgPSBjb29raWU7XG4gIH1cblxuICByZW1vdmUoa2V5OiBzdHJpbmcpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSBrZXkgKyAnPTsgcGF0aD0vOyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UOyc7XG4gICAgZGVsZXRlIHRoaXMuY29va2llc1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJKHZhbHVlKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iLCJcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUhhbmRsZXIge1xuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGRhdGEpO1xuICAgIH1cblxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZVtrZXldKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiXG5leHBvcnQgY2xhc3MgQmFzZVN0b3JhZ2Uge1xuICAgIGdldChrZXk6IHN0cmluZyk6IGFuecOCwqB7fVxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHt9XG4gICAgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7fVxufVxuXG5leHBvcnQgY2xhc3MgQ29va2llU3RvcmFnZSBleHRlbmRzIEJhc2VTdG9yYWdlw4LCoHt9XG5leHBvcnQgY2xhc3MgV2ViTG9jYWxTdG9yYWdlIGV4dGVuZHMgQmFzZVN0b3JhZ2Uge31cbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgSHR0cEhlYWRlcnMsIEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2VydmljZTxUIGV4dGVuZHMgQmFzZU1vZGVsPiAge1xuICAgIGh0dHBPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgJ0FjY2VwdCc6ICcqJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0pXG4gICAgfTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgQEluamVjdCgndXJsJykgcHJvdGVjdGVkIHVybDogc3RyaW5nLFxuICAgICAgICBASW5qZWN0KCdlbmRwb2ludCcpIHByb3RlY3RlZCBlbmRwb2ludDogc3RyaW5nLFxuXG4gICAgICAgIC8vIHByaXZhdGUgdXJsOiBzdHJpbmcsXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsKGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUW10pID0+IGRhdGEpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCeUlkKF9pZDogc3RyaW5nLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS8ke19pZH1gLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZShpdGVtOiBULCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH1gLCBpdGVtLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBUKSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKF9pZDogc3RyaW5nLCBpdGVtOiBULCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBpdGVtLl9pZCA9IF9pZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaDxUPihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fWAsIGl0ZW0sIHRoaXMuY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IFQpID0+IGRhdGEpLFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQ29tcGxldGUoX2lkOiBzdHJpbmcsIGl0ZW06IFQsIGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGl0ZW0uX2lkID0gX2lkO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dDxUPihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fWAsIGl0ZW0sIHRoaXMuY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IFQpID0+IGRhdGEpLFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlKF9pZDogc3RyaW5nLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPFQ+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9LyR7X2lkfWAsIHRoaXMuY3JlYXRlSHR0cEhlYWRlcnMoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IFQpID0+IGRhdGEpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVIdHRwSGVhZGVycyhoZWFkZXJzPykge1xuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaHR0cE9wdGlvbnMpO1xuICAgICAgICBpZiAoaGVhZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaCgoaGVhZGVyS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaHR0cE9wdGlvbnMuaGVhZGVycyA9IGh0dHBPcHRpb25zLmhlYWRlcnMuYXBwZW5kKGhlYWRlcktleSwgaGVhZGVyc1toZWFkZXJLZXldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwT3B0aW9ucztcbiAgICB9XG5cbiAgICBwdWJsaWMgaHR0cEhlYWRlcnNXaXRob3V0QXV0aChoZWFkZXJzPykge1xuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICcqJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdYLVNraXAtSW50ZXJjZXB0b3InOiAnJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaGVhZGVycykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaCgoaGVhZGVyS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaHR0cE9wdGlvbnMuaGVhZGVycyA9IGh0dHBPcHRpb25zLmhlYWRlcnMuYXBwZW5kKGhlYWRlcktleSwgaGVhZGVyc1toZWFkZXJLZXldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwT3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2Uuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkJhc2VTZXJ2aWNlPFQgZXh0ZW5kcyBCYXNlTW9kZWw+IGV4dGVuZHMgQmFzZVNlcnZpY2U8VD4ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoJ3VybCcpIHByb3RlY3RlZCB1cmw6IHN0cmluZyxcbiAgICAgICAgQEluamVjdCgnZW5kcG9pbnQnKSBwcm90ZWN0ZWQgZW5kcG9pbnQ6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBodHRwLCB1cmwsIGVuZHBvaW50XG4gICAgICAgICk7XG5cbiAgICB9XG4gICAgcHVibGljIGxvZ2luKGNyZWRlbnRpYWxzLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMudXJsfS8ke3RoaXMuZW5kcG9pbnR9L2xvZ2luYCwgY3JlZGVudGlhbHMsIHRoaXMuaHR0cEhlYWRlcnNXaXRob3V0QXV0aChoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHBhc3N3b3JkUmVjb3ZlcnkoZW1haWwsIGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vcGFzc3dvcmQtcmVjb3ZlcnlgLCBlbWFpbCwgdGhpcy5odHRwSGVhZGVyc1dpdGhvdXRBdXRoKGhlYWRlcnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhKSA9PiBkYXRhKVxuICAgICAgICAgICAgKTtcbiAgICB9XG4gICAgcHVibGljIHJlc2V0UGFzc3dvcmQobmV3UGFzc3dvcmQsIGhhc2gsIGhlYWRlcnM/KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy51cmx9LyR7dGhpcy5lbmRwb2ludH0vcmVzZXQtcGFzc3dvcmRgLFxuICAgICAgICAgICAgeyAnbmV3UGFzc3dvcmQnOiBuZXdQYXNzd29yZCwgJ2hhc2gnOiBoYXNoIH0sIHRoaXMuaHR0cEhlYWRlcnNXaXRob3V0QXV0aChoZWFkZXJzKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEN1cnJlbnRVc2VyKHRva2VuLCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnVybCArICcvdXNlcnMtbWUnLCB0aGlzLmNyZWF0ZUh0dHBIZWFkZXJzKGhlYWRlcnMpKVxuICAgICAgICAucGlwZShtYXAoKGRhdGE6IGFueSkgPT4gZGF0YSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlcihpdGVtOiBULCBoZWFkZXJzPyk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLnVybH0vJHt0aGlzLmVuZHBvaW50fS9yZWdpc3RlcmAsIGl0ZW0gLCB0aGlzLmh0dHBIZWFkZXJzV2l0aG91dEF1dGgoaGVhZGVycykpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4gZGF0YSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBBdXRoVG9rZW5JbnRlcmZhY2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2F1dGgtdG9rZW4uaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIEF1dGhUb2tlbiBpbXBsZW1lbnRzIEF1dGhUb2tlbkludGVyZmFjZSB7XG4gICAgaWQgPSBudWxsO1xuICAgIHR0bCA9IG51bGw7XG4gICAgY3JlYXRlZCA9IG51bGw7XG4gICAgdXNlcklkID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE/OiBBdXRoVG9rZW5JbnRlcmZhY2UpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvb2tpZVN0b3JhZ2UgfSBmcm9tICcuLi8uLi9zdG9yYWdlL3N0b3JhZ2UuaGFuZGxlcic7XG5pbXBvcnQgeyBBdXRoVG9rZW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvYXV0aC10b2tlbi5tb2RlbCc7XG5cbmNvbnN0IFRPS0VOX0lEID0gJ3Rva2VuX2lkJztcbmNvbnN0IFRPS0VOX1RUTCA9ICd0b2tlbl90dGwnO1xuY29uc3QgVE9LRU5fQ1JFQVRFRCA9ICd0b2tlbl9jcmVhdGVkJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSB0b2tlbiA9IG5ldyBBdXRoVG9rZW4oKTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoQ29va2llU3RvcmFnZSkgcHJvdGVjdGVkIHN0b3JhZ2U6IENvb2tpZVN0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy50b2tlbi5pZCA9IHRoaXMuc3RvcmFnZS5nZXQoVE9LRU5fSUQpO1xuICAgICAgICB0aGlzLnRva2VuLnR0bCA9IHRoaXMuc3RvcmFnZS5nZXQoVE9LRU5fVFRMKTtcbiAgICAgICAgdGhpcy50b2tlbi5jcmVhdGVkID0gdGhpcy5zdG9yYWdlLmdldChUT0tFTl9DUkVBVEVEKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VG9rZW4oKTogQXV0aFRva2VuIHtcbiAgICAgICAgcmV0dXJuIDxBdXRoVG9rZW4+dGhpcy50b2tlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VG9rZW4odG9rZW5JZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbmV3IEF1dGhUb2tlbigpO1xuICAgICAgICB0b2tlbi5pZCA9IHRva2VuSWQ7XG4gICAgICAgIHRoaXMucGVyc2lzdChUT0tFTl9JRCwgdG9rZW4uaWQsIHRoaXMuZXhwaXJlc1RpbWUoKSk7XG4gICAgICAgIHRoaXMucGVyc2lzdChUT0tFTl9UVEwsIHRoaXMuZXhwaXJlc1RpbWUoKSwgdGhpcy5leHBpcmVzVGltZSgpKTtcbiAgICAgICAgdGhpcy5wZXJzaXN0KFRPS0VOX0NSRUFURUQsIG5ldyBEYXRlKCksIHRoaXMuZXhwaXJlc1RpbWUoKSk7XG4gICAgICAgIHRva2VuLnR0bCA9IHRoaXMuZXhwaXJlc1RpbWUoKTtcbiAgICAgICAgdG9rZW4uY3JlYXRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMudG9rZW4gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRva2VuLCB0b2tlbik7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZVRva2VuKCkge1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKFRPS0VOX0lEKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZShUT0tFTl9UVEwpO1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKFRPS0VOX0NSRUFURUQpO1xuICAgICAgICB0aGlzLnRva2VuID0gbmV3IEF1dGhUb2tlbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwZXJzaXN0KHRva2VuX3Byb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBEYXRlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KFxuICAgICAgICAgICAgICAgIGAke3Rva2VuX3Byb3BlcnR5fWAsXG4gICAgICAgICAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWUsXG4gICAgICAgICAgICAgICAgZXhwaXJlcyA/IGV4cGlyZXMgOiBudWxsXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZXhwaXJlc1RpbWUoKSB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRGF5cyh0b2RheSwgMyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGREYXlzKGRhdGUsIGRheXMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgKyBkYXlzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbn1cblxuXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb3JlL2F1dGguc2VydmljZSc7XG5cblxuZXhwb3J0IGNvbnN0IEludGVyY2VwdG9yU2tpcEhlYWRlciA9ICdYLVNraXAtSW50ZXJjZXB0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge31cblxuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKSB7XG4gICAgICAgIC8vIEdldCB0aGUgYXV0aCB0b2tlbiBmcm9tIHRoZSBjb29raWVTdG9yYWdlLlxuICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMuYXV0aFNlcnZpY2UuZ2V0VG9rZW4oKTtcbiAgICAgICAgY29uc3QgYXV0aFRva2VuID0gYEJlYXJlciAke3Rva2VuLmlkfWA7IC8vIGdldCBUT0tFTlxuXG4gICAgICAgIC8vIENsb25lIHJlcXVlc3QgYW5kIHVwZGF0ZSB3aXRoIEF1dGhcbiAgICAgICAgaWYgKHJlcS5oZWFkZXJzLmhhcyhJbnRlcmNlcHRvclNraXBIZWFkZXIpKSB7XG4gICAgICAgICAgICBjb25zdCBub0F1dGhSZXEgPSByZXEuY2xvbmUoe1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLmRlbGV0ZShJbnRlcmNlcHRvclNraXBIZWFkZXIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShub0F1dGhSZXEpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXV0aFJlcSA9IHJlcS5jbG9uZSh7XG4gICAgICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCBhdXRoVG9rZW4pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNlbmQgY2xvbmVkIHJlcXVlc3Qgd2l0aCBoZWFkZXIgdG8gdGhlIG5leHQgaGFuZGxlci5cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKGF1dGhSZXEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50LCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvckludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XG5cbiAgICBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG5cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgICAgICBsZXQgZXJyb3JNc2c7XG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAvLyBhdXRvIGxvZ291dCBpZiA0MDEgcmVzcG9uc2UgcmV0dXJuZWQgZnJvbSBhcGlcbiAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5yZW1vdmVUb2tlbigpO1xuICAgICAgICAgICAgICAgIGVycm9yTXNnID0gYEVycm9yOiBObyB0aWVuZSBhdXRvcml6YWNpw4PCs25gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnJvck1zZyA9IGVycm9yLmVycm9yLm1lc3NhZ2UgfHwgZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxufVxuIiwiXG5cbmV4cG9ydCBjbGFzcyBCYXNlTW9kZWwge1xuICAgIF9pZDogc3RyaW5nO1xuICAgIGluc3RhbmNlOiBhbnk7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTLCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuLy8gaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yLCBFcnJvckludGVyY2VwdG9yIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29yZS9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ2luQmFzZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvbG9naW4tYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJy4vaGVscGVycy9hdXRoLmludGVyY2VwdG9yJztcbmltcG9ydCB7IEVycm9ySW50ZXJjZXB0b3IgfSBmcm9tICcuL2hlbHBlcnMvZXJyb3IuaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgV2ViTG9jYWxTdG9yYWdlLCBDb29raWVTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UuaGFuZGxlcic7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VIYW5kbGVyIH0gZnJvbSAnLi9zdG9yYWdlL2xvY2FsLXN0b3JhZ2UuaGFuZGxlcic7XG5pbXBvcnQgeyBDb29raWVIYW5kbGVyIH0gZnJvbSAnLi9zdG9yYWdlL2Nvb2tpZS5oYW5kbGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEdub21tb0Jhc2VNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCh7IH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEdub21tb0Jhc2VNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLy8gU2VydmljZXNcbiAgICAgICAgIEJhc2VTZXJ2aWNlLFxuICAgICAgICAgQXV0aFNlcnZpY2UsXG4gICAgICAgICBMb2dpbkJhc2VTZXJ2aWNlLFxuXG4gICAgICAgIC8vIC8vIEludGVyY2VwdG9yc1xuICAgICAgICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogQXV0aEludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9LFxuICAgICAgICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogRXJyb3JJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfSxcblxuICAgICAgICAvLyAvLyBTdG9yYWdlXG4gICAgICAgIHsgcHJvdmlkZTogV2ViTG9jYWxTdG9yYWdlLCB1c2VDbGFzczogTG9jYWxTdG9yYWdlSGFuZGxlciB9LFxuICAgICAgICB7IHByb3ZpZGU6IENvb2tpZVN0b3JhZ2UsIHVzZUNsYXNzOiBDb29raWVIYW5kbGVyIH1cblxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuLy8gZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2VzJztcbi8vIGV4cG9ydCAqIGZyb20gJy4vaGVscGVycyc7XG4vLyBleHBvcnQgKiBmcm9tICcuL21vZGVscyc7XG4vLyBleHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzJztcbi8vIGV4cG9ydCAqIGZyb20gJy4vc3RvcmFnZSc7XG5cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJodHRwIiwiSHR0cEhlYWRlcnMiLCJtYXAiLCJIdHRwQ2xpZW50IiwiSW5qZWN0IiwiY2F0Y2hFcnJvciIsInRocm93RXJyb3IiLCJIVFRQX0lOVEVSQ0VQVE9SUyIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzsyQkFPcUMsRUFBRTs7Ozs7O1FBRXJDLDJCQUFHOzs7O1lBQUgsVUFBSSxHQUFXO2dCQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztvQkFDdEIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVE7eUJBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7eUJBQ2xCLE1BQU0sQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFBLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDNUUsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDWCxPQUFPLElBQUksQ0FBQztxQkFDYjtvQkFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3RFO2dCQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxQjs7Ozs7OztRQUVELDJCQUFHOzs7Ozs7WUFBSCxVQUFJLEdBQVcsRUFBRSxLQUFVLEVBQUUsT0FBYztnQkFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7O2dCQUMxQixJQUFNLE1BQU0sR0FBTSxHQUFHLFNBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxpQkFBVyxPQUFPLEdBQUcsZUFBYyxPQUFPLENBQUMsV0FBVyxFQUFLLEdBQUcsRUFBRSxDQUFFLENBQUM7Z0JBQzVHLE1BQU0s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