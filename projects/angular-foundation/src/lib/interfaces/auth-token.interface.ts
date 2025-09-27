/**
 * Interface defining the structure of an authentication token.
 * 
 * This interface represents the data structure for authentication tokens
 * used throughout the application. It includes token identification,
 * expiration, creation time, and user association.
 * 
 * @interface AuthTokenInterface
 * 
 * @example
 * ```typescript
 * const tokenData: AuthTokenInterface = {
 *   id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   created: new Date(),
 *   ttl: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
 *   userId: '12345'
 * };
 * ```
 */
export interface AuthTokenInterface {
  /**
   * The token identifier or JWT string.
   * This is the actual token value used for authentication.
   */
  'id'?: string;
  
  /**
   * Time-to-live value indicating when the token expires.
   * Typically stored as milliseconds since epoch (timestamp).
   */
  'ttl'?: number;
  
  /**
   * The date and time when the token was created.
   * Used for token lifecycle management and logging.
   */
  'created'?: Date;
  
  /**
   * The unique identifier of the user associated with this token.
   * Links the token to a specific user account.
   */
  'userId'?: string;
}