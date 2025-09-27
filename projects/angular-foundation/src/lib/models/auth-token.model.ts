import { AuthTokenInterface } from '../interfaces/auth-token.interface';

/**
 * AuthToken model class that implements the AuthTokenInterface.
 * 
 * This class represents an authentication token with its associated metadata
 * such as creation time, expiration, and user association. It provides
 * proper date handling and type safety for token operations.
 * 
 * @implements {AuthTokenInterface}
 * 
 * @example
 * ```typescript
 * // Create a new token
 * const tokenData = {
 *   id: 'jwt-token-string',
 *   created: new Date(),
 *   ttl: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days from now
 *   userId: 'user123'
 * };
 * const token = new AuthToken(tokenData);
 * 
 * // Create empty token
 * const emptyToken = new AuthToken();
 * ```
 */
export class AuthToken implements AuthTokenInterface {
  /**
   * The token identifier/value (typically a JWT string).
   */
  id?: string;
  
  /**
   * Time-to-live timestamp indicating when the token expires.
   * Stored as milliseconds since epoch.
   */
  ttl?: number;
  
  /**
   * The date and time when the token was created.
   */
  created?: Date;
  
  /**
   * The unique identifier of the user associated with this token.
   */
  userId?: string;

  /**
   * Creates an instance of AuthToken.
   * 
   * @param {AuthTokenInterface} [data] - Optional token data to initialize the instance
   * 
   * @example
   * ```typescript
   * // With data
   * const token = new AuthToken({
   *   id: 'token123',
   *   created: new Date(),
   *   ttl: Date.now() + 86400000, // 24 hours
   *   userId: 'user456'
   * });
   * 
   * // Empty token
   * const emptyToken = new AuthToken();
   * ```
   */
  constructor(data?: AuthTokenInterface) {
    if (data) {
      this.id = data.id;
      this.ttl = data.ttl;
      
      // Handle created property with null preservation and backward compatibility
      if (data.created === null) {
        this.created = null as any;
      } else if (data.created instanceof Date) {
        this.created = data.created;
      } else if (data.created) {
        // For backward compatibility, preserve string dates as-is if they're strings
        if (typeof data.created === 'string') {
          this.created = data.created as any;
        } else {
          this.created = new Date(data.created);
        }
      } else {
        this.created = undefined;
      }
      
      this.userId = data.userId;
    }
  }
}