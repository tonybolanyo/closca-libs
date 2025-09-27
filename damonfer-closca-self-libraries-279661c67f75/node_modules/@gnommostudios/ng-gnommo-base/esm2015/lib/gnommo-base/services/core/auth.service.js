/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { CookieStorage } from '../../storage/storage.handler';
import { AuthToken } from '../../models/auth-token.model';
/** @type {?} */
const TOKEN_ID = 'token_id';
/** @type {?} */
const TOKEN_TTL = 'token_ttl';
/** @type {?} */
const TOKEN_CREATED = 'token_created';
export class AuthService {
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
if (false) {
    /** @type {?} */
    AuthService.prototype.token;
    /** @type {?} */
    AuthService.prototype.storage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvIiwic291cmNlcyI6WyJsaWIvZ25vbW1vLWJhc2Uvc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBRTFELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQzs7QUFDNUIsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDOztBQUM5QixNQUFNLGFBQWEsR0FBRyxlQUFlLENBQUM7QUFJdEMsTUFBTTs7OztJQUlGLFlBQTZDLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7cUJBRm5ELElBQUksU0FBUyxFQUFFO1FBRzNCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3hEOzs7O0lBRU0sUUFBUTtRQUNYLE1BQU0sbUJBQVksSUFBSSxDQUFDLEtBQUssRUFBQzs7Ozs7O0lBRzFCLFFBQVEsQ0FBQyxPQUFlOztRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQzlCLEtBQUssQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDNUQsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzs7Ozs7SUFHL0MsV0FBVztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzs7Ozs7Ozs7SUFHMUIsT0FBTyxDQUFDLGNBQXNCLEVBQUUsS0FBVSxFQUFFLE9BQWM7UUFDN0QsSUFBSSxDQUFDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ1osR0FBRyxjQUFjLEVBQUUsRUFDbkIsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUMzRCxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMzQixDQUFDO1NBQ0w7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7U0FFZDs7Ozs7SUFHRSxXQUFXOztRQUNkLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBRzFCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSTs7UUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7OztZQXJEckIsVUFBVTs7OztZQVJGLGFBQWEsdUJBYUwsTUFBTSxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvb2tpZVN0b3JhZ2UgfSBmcm9tICcuLi8uLi9zdG9yYWdlL3N0b3JhZ2UuaGFuZGxlcic7XG5pbXBvcnQgeyBBdXRoVG9rZW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvYXV0aC10b2tlbi5tb2RlbCc7XG5cbmNvbnN0IFRPS0VOX0lEID0gJ3Rva2VuX2lkJztcbmNvbnN0IFRPS0VOX1RUTCA9ICd0b2tlbl90dGwnO1xuY29uc3QgVE9LRU5fQ1JFQVRFRCA9ICd0b2tlbl9jcmVhdGVkJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSB0b2tlbiA9IG5ldyBBdXRoVG9rZW4oKTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoQ29va2llU3RvcmFnZSkgcHJvdGVjdGVkIHN0b3JhZ2U6IENvb2tpZVN0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy50b2tlbi5pZCA9IHRoaXMuc3RvcmFnZS5nZXQoVE9LRU5fSUQpO1xuICAgICAgICB0aGlzLnRva2VuLnR0bCA9IHRoaXMuc3RvcmFnZS5nZXQoVE9LRU5fVFRMKTtcbiAgICAgICAgdGhpcy50b2tlbi5jcmVhdGVkID0gdGhpcy5zdG9yYWdlLmdldChUT0tFTl9DUkVBVEVEKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VG9rZW4oKTogQXV0aFRva2VuIHtcbiAgICAgICAgcmV0dXJuIDxBdXRoVG9rZW4+dGhpcy50b2tlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VG9rZW4odG9rZW5JZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbmV3IEF1dGhUb2tlbigpO1xuICAgICAgICB0b2tlbi5pZCA9IHRva2VuSWQ7XG4gICAgICAgIHRoaXMucGVyc2lzdChUT0tFTl9JRCwgdG9rZW4uaWQsIHRoaXMuZXhwaXJlc1RpbWUoKSk7XG4gICAgICAgIHRoaXMucGVyc2lzdChUT0tFTl9UVEwsIHRoaXMuZXhwaXJlc1RpbWUoKSwgdGhpcy5leHBpcmVzVGltZSgpKTtcbiAgICAgICAgdGhpcy5wZXJzaXN0KFRPS0VOX0NSRUFURUQsIG5ldyBEYXRlKCksIHRoaXMuZXhwaXJlc1RpbWUoKSk7XG4gICAgICAgIHRva2VuLnR0bCA9IHRoaXMuZXhwaXJlc1RpbWUoKTtcbiAgICAgICAgdG9rZW4uY3JlYXRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMudG9rZW4gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRva2VuLCB0b2tlbik7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZVRva2VuKCkge1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKFRPS0VOX0lEKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZShUT0tFTl9UVEwpO1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKFRPS0VOX0NSRUFURUQpO1xuICAgICAgICB0aGlzLnRva2VuID0gbmV3IEF1dGhUb2tlbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwZXJzaXN0KHRva2VuX3Byb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBEYXRlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KFxuICAgICAgICAgICAgICAgIGAke3Rva2VuX3Byb3BlcnR5fWAsXG4gICAgICAgICAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWUsXG4gICAgICAgICAgICAgICAgZXhwaXJlcyA/IGV4cGlyZXMgOiBudWxsXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZXhwaXJlc1RpbWUoKSB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRGF5cyh0b2RheSwgMyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGREYXlzKGRhdGUsIGRheXMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgKyBkYXlzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbn1cblxuXG4iXX0=