/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export { BaseStorage };
var CookieStorage = /** @class */ (function (_super) {
    tslib_1.__extends(CookieStorage, _super);
    function CookieStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CookieStorage;
}(BaseStorage));
export { CookieStorage };
var WebLocalStorage = /** @class */ (function (_super) {
    tslib_1.__extends(WebLocalStorage, _super);
    function WebLocalStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebLocalStorage;
}(BaseStorage));
export { WebLocalStorage };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvIiwic291cmNlcyI6WyJsaWIvZ25vbW1vLWJhc2Uvc3RvcmFnZS9zdG9yYWdlLmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxJQUFBOzs7Ozs7O0lBQ0kseUJBQUc7Ozs7SUFBSCxVQUFJLEdBQVcsS0FBUzs7Ozs7OztJQUN4Qix5QkFBRzs7Ozs7O0lBQUgsVUFBSSxHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWMsS0FBVTs7Ozs7SUFDckQsNEJBQU07Ozs7SUFBTixVQUFPLEdBQVcsS0FBVTtzQkFKaEM7SUFLQyxDQUFBO0FBSkQsdUJBSUM7QUFFRCxJQUFBO0lBQW1DLHlDQUFXOzs7O3dCQVA5QztFQU9tQyxXQUFXLEVBQUcsQ0FBQTtBQUFqRCx5QkFBaUQ7QUFDakQsSUFBQTtJQUFxQywyQ0FBVzs7OzswQkFSaEQ7RUFRcUMsV0FBVyxFQUFHLENBQUE7QUFBbkQsMkJBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgQmFzZVN0b3JhZ2Uge1xuICAgIGdldChrZXk6IHN0cmluZyk6IGFuecKge31cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBEYXRlKTogdm9pZCB7fVxuICAgIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge31cbn1cblxuZXhwb3J0IGNsYXNzIENvb2tpZVN0b3JhZ2UgZXh0ZW5kcyBCYXNlU3RvcmFnZcKge31cbmV4cG9ydCBjbGFzcyBXZWJMb2NhbFN0b3JhZ2UgZXh0ZW5kcyBCYXNlU3RvcmFnZSB7fVxuIl19