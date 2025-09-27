export abstract class BaseStorage {
  abstract get(key: string): any;
  abstract set(key: string, value: any, expires?: Date): void;
  abstract remove(key: string): void;
}

export class CookieStorage extends BaseStorage {
  get(key: string): any {
    // Implementation will be provided by CookieHandler
    throw new Error('CookieStorage should be provided via dependency injection');
  }

  set(key: string, value: any, expires?: Date): void {
    // Implementation will be provided by CookieHandler
    throw new Error('CookieStorage should be provided via dependency injection');
  }

  remove(key: string): void {
    // Implementation will be provided by CookieHandler
    throw new Error('CookieStorage should be provided via dependency injection');
  }
}

export class WebLocalStorage extends BaseStorage {
  get(key: string): any {
    // Implementation will be provided by LocalStorageHandler
    throw new Error('WebLocalStorage should be provided via dependency injection');
  }

  set(key: string, value: any, expires?: Date): void {
    // Implementation will be provided by LocalStorageHandler
    throw new Error('WebLocalStorage should be provided via dependency injection');
  }

  remove(key: string): void {
    // Implementation will be provided by LocalStorageHandler
    throw new Error('WebLocalStorage should be provided via dependency injection');
  }
}