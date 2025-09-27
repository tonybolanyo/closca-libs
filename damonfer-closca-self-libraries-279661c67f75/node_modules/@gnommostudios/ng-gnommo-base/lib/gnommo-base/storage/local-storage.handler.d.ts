export declare class LocalStorageHandler {
    get(key: string): any;
    set(key: string, value: any, expires?: Date): void;
    remove(key: string): void;
    private parse(value);
}
