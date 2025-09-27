export interface CookieInterface {
    [key: string]: any;
}
export declare class CookieHandler {
    private cookies;
    get(key: string): any;
    set(key: string, value: any, expires?: Date): void;
    remove(key: string): void;
    private parse(value);
}
