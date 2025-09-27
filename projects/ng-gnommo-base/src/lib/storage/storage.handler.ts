import { StorageValue } from '../interfaces/http-types.interface';

export abstract class BaseStorage {
  abstract get(key: string): StorageValue;
  abstract set(key: string, value: StorageValue, expires?: Date): void;
  abstract remove(key: string): void;
}

export abstract class CookieStorage extends BaseStorage {
  abstract override get(key: string): StorageValue;
  abstract override set(key: string, value: StorageValue, expires?: Date): void;
  abstract override remove(key: string): void;
}

export abstract class WebLocalStorage extends BaseStorage {
  abstract override get(key: string): StorageValue;
  abstract override set(key: string, value: StorageValue, expires?: Date): void;
  abstract override remove(key: string): void;
}