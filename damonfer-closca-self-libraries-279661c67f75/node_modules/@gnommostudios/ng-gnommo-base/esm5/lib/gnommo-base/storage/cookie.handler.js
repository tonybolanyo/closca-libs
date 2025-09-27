/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * @record
 */
export function CookieInterface() { }
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
export { CookieHandler };
if (false) {
    /** @type {?} */
    CookieHandler.prototype.cookies;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ25vbW1vc3R1ZGlvcy9uZy1nbm9tbW8tYmFzZS8iLCJzb3VyY2VzIjpbImxpYi9nbm9tbW8tYmFzZS9zdG9yYWdlL2Nvb2tpZS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O3VCQU9OLEVBQUU7Ozs7OztJQUVyQywyQkFBRzs7OztJQUFILFVBQUksR0FBVztRQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3ZCLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRO2lCQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNsQixNQUFNLENBQUMsVUFBQyxJQUFTLElBQUssT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzVFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDWixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxQjs7Ozs7OztJQUVELDJCQUFHOzs7Ozs7SUFBSCxVQUFJLEdBQVcsRUFBRSxLQUFVLEVBQUUsT0FBYztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzs7UUFDMUIsSUFBTSxNQUFNLEdBQU0sR0FBRyxTQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUJBQVcsT0FBTyxDQUFDLENBQUMsQ0FBQyxlQUFjLE9BQU8sQ0FBQyxXQUFXLEVBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLENBQUM7UUFDNUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ2pDOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxHQUFXO1FBQ2hCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLG1EQUFtRCxDQUFDO1FBQzVFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxQjs7Ozs7SUFFTyw2QkFBSzs7OztjQUFDLEtBQVU7UUFDdEIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNULE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7OztnQkFuQ0osVUFBVTs7d0JBTFg7O1NBTWEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgQ29va2llSW50ZXJmYWNlIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb29raWVIYW5kbGVyIHtcbiAgcHJpdmF0ZSBjb29raWVzOiBDb29raWVJbnRlcmZhY2UgPSB7fTtcblxuICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICghdGhpcy5jb29raWVzW2tleV0pIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IHdpbmRvdy5kb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgIC5jb29raWUuc3BsaXQoJzsgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChpdGVtOiBhbnkpID0+IGl0ZW0uc3BsaXQoJz0nKVswXSA9PT0ga2V5KS5wb3AoKTtcbiAgICAgIGlmICghY29va2llKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvb2tpZXNba2V5XSA9IHRoaXMucGFyc2UoY29va2llLnNwbGl0KCc9Jykuc2xpY2UoMSkuam9pbignPScpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb29raWVzW2tleV07XG4gIH1cblxuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5jb29raWVzW2tleV0gPSB2YWx1ZTtcbiAgICBjb25zdCBjb29raWUgPSBgJHtrZXl9PSR7ZW5jb2RlVVJJKHZhbHVlKX07IHBhdGg9LyR7ZXhwaXJlcyA/IGA7IGV4cGlyZXM9JHsgZXhwaXJlcy50b1VUQ1N0cmluZygpIH1gIDogJyd9YDtcbiAgICB3aW5kb3cuZG9jdW1lbnQuY29va2llID0gY29va2llO1xuICB9XG5cbiAgcmVtb3ZlKGtleTogc3RyaW5nKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz07IHBhdGg9LzsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAxIEdNVDsnO1xuICAgIGRlbGV0ZSB0aGlzLmNvb2tpZXNba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2UodmFsdWU6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRlY29kZVVSSSh2YWx1ZSkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19