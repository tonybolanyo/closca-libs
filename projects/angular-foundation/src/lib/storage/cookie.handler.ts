import { Injectable } from '@angular/core';
import { BaseStorage, CookieStorage } from './storage.handler';
import { StorageValue } from '../interfaces/http-types.interface';

/**
 * CookieHandler provides browser cookie-based storage implementation.
 * 
 * This service implements the BaseStorage interface using browser cookies.
 * It provides JSON serialization/deserialization and automatic expiration
 * handling. Cookies are accessible across different tabs and persist based
 * on their expiration settings.
 * 
 * @implements {BaseStorage}
 * 
 * @example
 * ```typescript
 * // Inject and use directly
 * constructor(private storage: CookieHandler) {}
 * 
 * // Store simple data (session cookie)
 * this.storage.set('user_id', '12345');
 * 
 * // Store with expiration
 * const expiresAt = new Date(Date.now() + 86400000); // 24 hours
 * this.storage.set('remember_token', 'abc123', expiresAt);
 * 
 * // Store object (automatically JSON-serialized)
 * this.storage.set('user_prefs', { theme: 'dark' });
 * 
 * // Retrieve data
 * const userId = this.storage.get('user_id');
 * 
 * // Remove cookie
 * this.storage.remove('user_id');
 * ```
 */
@Injectable()
export class CookieHandler extends CookieStorage {
  
  /**
   * Retrieves a value from cookies by name.
   * 
   * Parses the document.cookie string to find the specified cookie.
   * Attempts to parse values as JSON, falling back to string values
   * if parsing fails. Returns null if the cookie doesn't exist.
   * 
   * @param {string} key - The cookie name to retrieve
   * @returns {StorageValue} The cookie value (parsed as JSON if possible) or null
   * 
   * @example
   * ```typescript
   * // Get simple string cookie
   * const userId = this.storage.get('user_id'); // returns: "12345"
   * 
   * // Get object cookie (automatically parsed from JSON)
   * const prefs = this.storage.get('user_prefs'); // returns: { theme: 'dark' }
   * 
   * // Non-existent cookie
   * const missing = this.storage.get('nonexistent'); // returns: null
   * ```
   */
  get(key: string): StorageValue {
    const nameEQ = key + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length);
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
    }
    return null;
  }

  /**
   * Sets a cookie with the specified name, value, and optional expiration.
   * 
   * Objects are automatically JSON-serialized, while other values are converted
   * to strings. The cookie is set with path=/ to be accessible site-wide.
   * 
   * @param {string} key - The cookie name
   * @param {StorageValue} value - The value to store
   * @param {Date} [expires] - Optional expiration date (creates session cookie if omitted)
   * 
   * @example
   * ```typescript
   * // Set session cookie (expires when browser closes)
   * this.storage.set('session_id', 'abc123');
   * 
   * // Set cookie with expiration
   * const oneWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
   * this.storage.set('remember_token', 'xyz789', oneWeek);
   * 
   * // Set object cookie (automatically JSON-serialized)
   * this.storage.set('user_prefs', { theme: 'dark', lang: 'en' });
   * ```
   */
  set(key: string, value: StorageValue, expires?: Date): void {
    let cookie = key + '=' + (typeof value === 'object' ? JSON.stringify(value) : String(value));
    if (expires) {
      cookie += '; expires=' + expires.toUTCString();
    }
    cookie += '; path=/';
    document.cookie = cookie;
  }

  /**
   * Removes a cookie by setting its expiration to a past date.
   * 
   * Uses the standard method of cookie deletion by setting the expiration
   * to January 1, 1970. The cookie is removed with path=/ to match the
   * path used when setting cookies.
   * 
   * @param {string} key - The cookie name to remove
   * 
   * @example
   * ```typescript
   * // Remove a cookie
   * this.storage.remove('user_session');
   * 
   * // Cookie is immediately inaccessible after this call
   * const session = this.storage.get('user_session'); // returns: null
   * ```
   */
  remove(key: string): void {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}