import { StorageValue } from '../interfaces/http-types.interface';

/**
 * Abstract base class for all storage handlers.
 * 
 * Provides a common interface for different storage mechanisms such as
 * localStorage, sessionStorage, cookies, etc. All storage implementations
 * should extend this class and implement the required methods.
 * 
 * @abstract
 * 
 * @example
 * ```typescript
 * class CustomStorage extends BaseStorage {
 *   get(key: string): StorageValue {
 *     // Custom implementation
 *     return customStorageApi.get(key);
 *   }
 *   
 *   set(key: string, value: StorageValue, expires?: Date): void {
 *     // Custom implementation
 *     customStorageApi.set(key, value, expires);
 *   }
 *   
 *   remove(key: string): void {
 *     // Custom implementation
 *     customStorageApi.remove(key);
 *   }
 * }
 * ```
 */
export abstract class BaseStorage {
  /**
   * Retrieves a value from storage by key.
   * 
   * @abstract
   * @param {string} key - The storage key to retrieve
   * @returns {StorageValue} The stored value or null if not found
   */
  abstract get(key: string): StorageValue;
  
  /**
   * Stores a value in storage with optional expiration.
   * 
   * @abstract
   * @param {string} key - The storage key
   * @param {StorageValue} value - The value to store
   * @param {Date} [expires] - Optional expiration date
   */
  abstract set(key: string, value: StorageValue, expires?: Date): void;
  
  /**
   * Removes a value from storage by key.
   * 
   * @abstract
   * @param {string} key - The storage key to remove
   */
  abstract remove(key: string): void;
}

/**
 * Abstract cookie storage handler.
 * 
 * Specialized base class for cookie-based storage implementations.
 * Provides the same interface as BaseStorage but with cookie-specific semantics.
 * 
 * @abstract
 * @extends BaseStorage
 * 
 * @example
 * ```typescript
 * @Injectable()
 * class MyCookieStorage extends CookieStorage {
 *   // Implementation details...
 * }
 * ```
 */
export abstract class CookieStorage extends BaseStorage {
  /**
   * Retrieves a value from cookie storage by key.
   * 
   * @abstract
   * @override
   * @param {string} key - The cookie name to retrieve
   * @returns {StorageValue} The cookie value or null if not found
   */
  abstract override get(key: string): StorageValue;
  
  /**
   * Stores a value in cookie storage with optional expiration.
   * 
   * @abstract
   * @override
   * @param {string} key - The cookie name
   * @param {StorageValue} value - The value to store
   * @param {Date} [expires] - Optional expiration date
   */
  abstract override set(key: string, value: StorageValue, expires?: Date): void;
  
  /**
   * Removes a cookie by name.
   * 
   * @abstract
   * @override
   * @param {string} key - The cookie name to remove
   */
  abstract override remove(key: string): void;
}

/**
 * Abstract web localStorage handler.
 * 
 * Specialized base class for localStorage/sessionStorage-based implementations.
 * Provides the same interface as BaseStorage but with localStorage-specific semantics.
 * 
 * @abstract
 * @extends BaseStorage
 * 
 * @example
 * ```typescript
 * @Injectable()
 * class MyLocalStorage extends WebLocalStorage {
 *   // Implementation details...
 * }
 * ```
 */
export abstract class WebLocalStorage extends BaseStorage {
  /**
   * Retrieves a value from web localStorage by key.
   * 
   * @abstract
   * @override
   * @param {string} key - The localStorage key to retrieve
   * @returns {StorageValue} The stored value or null if not found
   */
  abstract override get(key: string): StorageValue;
  
  /**
   * Stores a value in web localStorage with optional expiration.
   * 
   * @abstract
   * @override
   * @param {string} key - The localStorage key
   * @param {StorageValue} value - The value to store
   * @param {Date} [expires] - Optional expiration date
   */
  abstract override set(key: string, value: StorageValue, expires?: Date): void;
  
  /**
   * Removes a value from web localStorage by key.
   * 
   * @abstract
   * @override
   * @param {string} key - The localStorage key to remove
   */
  abstract override remove(key: string): void;
}