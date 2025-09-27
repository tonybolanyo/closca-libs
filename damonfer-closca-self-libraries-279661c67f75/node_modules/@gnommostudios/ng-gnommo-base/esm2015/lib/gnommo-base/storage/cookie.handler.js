/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * @record
 */
export function CookieInterface() { }
export class CookieHandler {
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
if (false) {
    /** @type {?} */
    CookieHandler.prototype.cookies;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS8iLCJzb3VyY2VzIjpbImxpYi9nbm9tbW8tYmFzZS9zdG9yYWdlL2Nvb2tpZS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQU0zQyxNQUFNOzt1QkFDK0IsRUFBRTs7Ozs7O0lBRXJDLEdBQUcsQ0FBQyxHQUFXO1FBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDdkIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVE7aUJBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ2xCLE1BQU0sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM1RSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osTUFBTSxDQUFDLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUI7Ozs7Ozs7SUFFRCxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVUsRUFBRSxPQUFjO1FBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDOztRQUMxQixNQUFNLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFjLE9BQU8sQ0FBQyxXQUFXLEVBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUM1RyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDakM7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsbURBQW1ELENBQUM7UUFDNUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUVPLEtBQUssQ0FBQyxLQUFVO1FBQ3RCLElBQUksQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDVCxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCOzs7O1lBbkNKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIENvb2tpZUludGVyZmFjZSB7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29va2llSGFuZGxlciB7XG4gIHByaXZhdGUgY29va2llczogQ29va2llSW50ZXJmYWNlID0ge307XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoIXRoaXMuY29va2llc1trZXldKSB7XG4gICAgICBjb25zdCBjb29raWUgPSB3aW5kb3cuZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAuY29va2llLnNwbGl0KCc7ICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoaXRlbTogYW55KSA9PiBpdGVtLnNwbGl0KCc9JylbMF0gPT09IGtleSkucG9wKCk7XG4gICAgICBpZiAoIWNvb2tpZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb29raWVzW2tleV0gPSB0aGlzLnBhcnNlKGNvb2tpZS5zcGxpdCgnPScpLnNsaWNlKDEpLmpvaW4oJz0nKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29va2llc1trZXldO1xuICB9XG5cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuY29va2llc1trZXldID0gdmFsdWU7XG4gICAgY29uc3QgY29va2llID0gYCR7a2V5fT0ke2VuY29kZVVSSSh2YWx1ZSl9OyBwYXRoPS8ke2V4cGlyZXMgPyBgOyBleHBpcmVzPSR7IGV4cGlyZXMudG9VVENTdHJpbmcoKSB9YCA6ICcnfWA7XG4gICAgd2luZG93LmRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcbiAgfVxuXG4gIHJlbW92ZShrZXk6IHN0cmluZykge1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGtleSArICc9OyBwYXRoPS87IGV4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMSBHTVQ7JztcbiAgICBkZWxldGUgdGhpcy5jb29raWVzW2tleV07XG4gIH1cblxuICBwcml2YXRlIHBhcnNlKHZhbHVlOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkZWNvZGVVUkkodmFsdWUpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==