export abstract class BaseStorage {
  abstract get(key: string): any;
  abstract set(key: string, value: any, expires?: Date): void;
  abstract remove(key: string): void;
}

export abstract class CookieStorage extends BaseStorage {
  abstract get(key: string): any;
  abstract set(key: string, value: any, expires?: Date): void;
  abstract remove(key: string): void;
}

export abstract class WebLocalStorage extends BaseStorage {
  abstract get(key: string): any;
  abstract set(key: string, value: any, expires?: Date): void;
  abstract remove(key: string): void;
}