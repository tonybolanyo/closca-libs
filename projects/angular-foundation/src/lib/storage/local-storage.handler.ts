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
    if (typeof Storage !== 'undefined' && localStorage) {
      try {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            
            // Check if this is the new format with expiration
            if (parsedData && typeof parsedData === 'object' && parsedData.hasOwnProperty('value')) {
              // Check expiration if present
              if (parsedData.expires) {
                const expirationDate = new Date(parsedData.expires);
                if (expirationDate.getTime() < Date.now()) {
                  // Item has expired, remove it and return null
                  this.remove(key);
                  return null;
                }
              }
              return parsedData.value;
            } else {
              // Fallback for old format or direct values
              return parsedData;
            }
          } catch (e) {
            // If JSON parsing fails, return the raw value
            return storedData;
          }
        }
      } catch (error) {
        console.warn('LocalStorage unavailable:', error);
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
    if (typeof Storage !== 'undefined' && localStorage) {
      try {
        const storageData: any = { value };
        
        // Add expiration if provided
        if (expires) {
          storageData.expires = expires.toISOString();
        }
        
        localStorage.setItem(key, JSON.stringify(storageData));
      } catch (error) {
        // Handle storage quota exceeded or other storage errors silently
        console.warn('LocalStorage unavailable:', error);
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
    if (typeof Storage !== 'undefined' && localStorage) {
      try {
        localStorage.removeItem(key);
        // Note: No longer removing separate _expires key since we use integrated format
      } catch (error) {
        console.warn('LocalStorage unavailable:', error);
      }
    }
  }
}