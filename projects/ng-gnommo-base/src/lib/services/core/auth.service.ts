import { Injectable } from '@angular/core';
// import { CookieStorage } from '../../storage/storage.handler';
import { AuthToken } from '../../models/auth-token.model';
import { LocalStorageHandler } from '../../storage/local-storage.handler';
import { StorageValue } from '../../interfaces/http-types.interface';

/**
 * AuthService provides authentication token management functionality.
 * 
 * This service handles the storage, retrieval, and management of authentication tokens
 * using LocalStorage as the default storage mechanism. It provides methods for setting,
 * getting, and removing authentication tokens, as well as persisting arbitrary data
 * with expiration dates.
 * 
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private authService: AuthService) {}
 * 
 * // Set a token after login
 * this.authService.setToken('your-jwt-token');
 * 
 * // Get the current token
 * const token = this.authService.getToken();
 * 
 * // Remove token on logout
 * this.authService.removeToken();
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: AuthToken | null = null;
  private storage: LocalStorageHandler;

  /**
   * Creates an instance of AuthService.
   * Initializes the LocalStorageHandler for token persistence.
   */
  constructor() {
    this.storage = new LocalStorageHandler();
  }

  /**
   * Retrieves the current authentication token.
   * 
   * If no token is cached in memory, it attempts to load it from localStorage.
   * If no token exists in storage, returns an empty AuthToken instance.
   * 
   * @returns {AuthToken} The current authentication token or an empty token if none exists
   * 
   * @example
   * ```typescript
   * const token = this.authService.getToken();
   * if (token.id) {
   *   console.log('User is authenticated with token:', token.id);
   * } else {
   *   console.log('User is not authenticated');
   * }
   * ```
   */
  getToken(): AuthToken {
    if (!this.token) {
      const tokenData = this.storage.get('access_token');
      if (tokenData && typeof tokenData === 'object') {
        this.token = new AuthToken(tokenData as Record<string, unknown>);
      } else {
        this.token = new AuthToken();
      }
    }
    return this.token;
  }

  /**
   * Sets a new authentication token and persists it to storage.
   * 
   * Creates a new AuthToken with the provided token ID, current timestamp,
   * and default expiration time (7 days), then stores it in localStorage.
   * 
   * @param {string} tokenId - The token identifier/value to store
   * 
   * @example
   * ```typescript
   * // After successful login
   * this.authService.setToken(response.access_token);
   * ```
   */
  setToken(tokenId: string): void {
    const tokenData = {
      id: tokenId,
      created: new Date(),
      ttl: this.expiresTime().getTime()
    };
    this.token = new AuthToken(tokenData);
    this.storage.set('access_token', tokenData, this.expiresTime());
  }

  /**
   * Removes the current authentication token from memory and storage.
   * 
   * Clears both the in-memory token cache and removes the token from localStorage.
   * This method should be called when the user logs out.
   * 
   * @example
   * ```typescript
   * // On logout
   * this.authService.removeToken();
   * this.router.navigate(['/login']);
   * ```
   */
  removeToken(): void {
    this.token = null;
    this.storage.remove('access_token');
  }

  /**
   * Persists a value to storage with an optional expiration date.
   * 
   * This method allows storing arbitrary key-value pairs with expiration.
   * If no expiration date is provided, defaults to 7 days from now.
   * 
   * @param {string} token_property - The key under which to store the value
   * @param {StorageValue} value - The value to store (string, number, boolean, object, or null)
   * @param {Date} [expires] - Optional expiration date. Defaults to 7 days from now
   * 
   * @example
   * ```typescript
   * // Store user preferences for 30 days
   * const thirtyDaysLater = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
   * this.authService.persist('user_preferences', { theme: 'dark' }, thirtyDaysLater);
   * 
   * // Store with default expiration (7 days)
   * this.authService.persist('temp_data', 'some value');
   * ```
   */
  persist(token_property: string, value: StorageValue, expires?: Date): void {
    const expirationDate = expires || this.expiresTime();
    this.storage.set(token_property, value, expirationDate);
  }

  /**
   * Calculates the default expiration time for tokens and stored data.
   * 
   * @returns {Date} A date 7 days from the current time
   * 
   * @example
   * ```typescript
   * const expiration = this.authService.expiresTime();
   * console.log('Token will expire on:', expiration);
   * ```
   */
  expiresTime(): Date {
    return this.addDays(new Date(), 7); // Default 7 days expiration
  }

  /**
   * Utility method to add days to a given date.
   * 
   * @private
   * @param {Date} date - The base date
   * @param {number} days - The number of days to add
   * @returns {Date} A new date with the specified days added
   */
  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}