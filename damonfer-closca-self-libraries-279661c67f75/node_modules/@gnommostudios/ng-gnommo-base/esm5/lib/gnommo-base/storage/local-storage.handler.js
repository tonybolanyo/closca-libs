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
export { LocalStorageHandler };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvIiwic291cmNlcyI6WyJsaWIvZ25vbW1vLWJhc2Uvc3RvcmFnZS9sb2NhbC1zdG9yYWdlLmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLElBQUE7Ozs7Ozs7SUFDSSxpQ0FBRzs7OztJQUFILFVBQUksR0FBVzs7UUFDWCxJQUFNLElBQUksR0FBVyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCOzs7Ozs7O0lBRUQsaUNBQUc7Ozs7OztJQUFILFVBQUksR0FBVyxFQUFFLEtBQVUsRUFBRSxPQUFjO1FBQ3ZDLFlBQVksQ0FBQyxPQUFPLENBQ2hCLEdBQUcsRUFDSCxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDNUQsQ0FBQztLQUNMOzs7OztJQUVELG9DQUFNOzs7O0lBQU4sVUFBTyxHQUFXO1FBQ2QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO0tBQ0o7Ozs7O0lBRU8sbUNBQUs7Ozs7Y0FBQyxLQUFVO1FBQ3BCLElBQUksQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDVCxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCOzs4QkExQlQ7SUE0QkMsQ0FBQTtBQTFCRCwrQkEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUhhbmRsZXIge1xuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlKGRhdGEpO1xuICAgIH1cblxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZVtrZXldKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==