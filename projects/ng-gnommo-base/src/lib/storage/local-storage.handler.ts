import { Injectable } from '@angular/core';
import { BaseStorage } from './storage.handler';
import { StorageValue } from '../interfaces/http-types.interface';

/**
 * LocalStorageHandler provides browser localStorage-based storage implementation.
 * 
 * This service implements the BaseStorage interface using the browser's localStorage API.
 * It provides JSON serialization/deserialization and handles expiration through
 * additional timestamp entries. The storage persists across browser sessions.
 * 
 * @implements {BaseStorage}
 * 
 * @example
 * ```typescript
 * // Inject and use directly
 * constructor(private storage: LocalStorageHandler) {}
 * 
 * // Store data
 * this.storage.set('user_preferences', { theme: 'dark' });
 * 
 * // Store with expiration
 * const expiresAt = new Date(Date.now() + 86400000); // 24 hours
 * this.storage.set('temp_data', 'some value', expiresAt);
 * 
 * // Retrieve data
 * const preferences = this.storage.get('user_preferences');
 * 
 * // Remove data
 * this.storage.remove('user_preferences');
 * ```
 */
@Injectable()
export class LocalStorageHandler extends BaseStorage {
  
  /**
   * Retrieves a value from localStorage by key.
   * 
   * Attempts to parse stored values as JSON, falling back to string values
   * if parsing fails. Returns null if the key doesn't exist or if localStorage
   * is not available.
   * 
   * @param {string} key - The localStorage key to retrieve
   * @returns {StorageValue} The stored value (parsed as JSON if possible) or null
   * 
   * @example
   * ```typescript
   * // Get simple string
   * const name = this.storage.get('user_name'); // returns: "John Doe"
   * 
   * // Get object (automatically parsed from JSON)
   * const settings = this.storage.get('user_settings'); // returns: { theme: 'dark' }
   * 
   * // Non-existent key
   * const missing = this.storage.get('nonexistent'); // returns: null
   * ```
   */
  get(key: string): StorageValue {
    if (typeof Storage !== 'undefined') {
      const value = localStorage.getItem(key);
      if (value) {
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
   * Stores a value in localStorage with optional expiration.
   * 
   * Objects are automatically JSON-serialized, while other values are converted
   * to strings. If an expiration date is provided, a separate timestamp entry
   * is stored to track expiration.
   * 
   * @param {string} key - The localStorage key to store under
   * @param {StorageValue} value - The value to store
   * @param {Date} [expires] - Optional expiration date
   * 
   * @example
   * ```typescript
   * // Store simple string
   * this.storage.set('user_name', 'John Doe');
   * 
   * // Store object (automatically JSON-serialized)
   * this.storage.set('user_settings', { theme: 'dark', language: 'en' });
   * 
   * // Store with expiration
   * const tomorrow = new Date(Date.now() + 86400000);
   * this.storage.set('temp_token', 'abc123', tomorrow);
   * ```
   */
  set(key: string, value: StorageValue, expires?: Date): void {
    if (typeof Storage !== 'undefined') {
      const storageValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
      localStorage.setItem(key, storageValue);
      
      // Handle expiration by storing timestamp if expires is provided
      if (expires) {
        localStorage.setItem(key + '_expires', expires.getTime().toString());
      }
    }
  }

  /**
   * Removes a value from localStorage by key.
   * 
   * Removes both the main value and any associated expiration timestamp.
   * Does nothing if localStorage is not available.
   * 
   * @param {string} key - The localStorage key to remove
   * 
   * @example
   * ```typescript
   * // Remove stored data
   * this.storage.remove('user_settings');
   * 
   * // Remove data with expiration (removes both main key and expiration key)
   * this.storage.remove('temp_token');
   * ```
   */
  remove(key: string): void {
    if (typeof Storage !== 'undefined') {
      localStorage.removeItem(key);
      localStorage.removeItem(key + '_expires');
    }
  }
}