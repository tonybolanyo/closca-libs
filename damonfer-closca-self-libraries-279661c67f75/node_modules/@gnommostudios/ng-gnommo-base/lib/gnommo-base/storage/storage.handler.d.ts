export declare class BaseStorage {
    get(key: string): any;
    set(key: string, value: any, expires?: Date): void;
    remove(key: string): void;
}
export declare class CookieStorage extends BaseStorage {
}
export declare class WebLocalStorage extends BaseStorage {
}
