/**
 * HTTP headers interface for better type safety.
 * 
 * Defines the structure for HTTP headers that can be passed to service methods.
 * Headers can have string values or arrays of strings for multiple values.
 * 
 * @interface HttpHeaderMap
 * 
 * @example
 * ```typescript
 * const headers: HttpHeaderMap = {
 *   'Content-Type': 'application/json',
 *   'Authorization': 'Bearer token123',
 *   'Accept-Language': ['en-US', 'en', 'es']
 * };
 * ```
 */
export interface HttpHeaderMap {
  [key: string]: string | string[];
}

/**
 * Generic storage value type for various storage handlers.
 * 
 * Represents the types of values that can be stored in the various
 * storage mechanisms (localStorage, cookies, etc.).
 * 
 * @type StorageValue
 * 
 * @example
 * ```typescript
 * const stringValue: StorageValue = 'hello world';
 * const numberValue: StorageValue = 42;
 * const booleanValue: StorageValue = true;
 * const objectValue: StorageValue = { key: 'value' };
 * const nullValue: StorageValue = null;
 * ```
 */
export type StorageValue = string | number | boolean | object | null;

/**
 * Authentication credentials interface for login operations.
 * 
 * Defines the structure for user login credentials. Supports both
 * email and username-based authentication with flexible additional fields.
 * 
 * @interface LoginCredentials
 * 
 * @example
 * ```typescript
 * // Email-based login
 * const emailLogin: LoginCredentials = {
 *   email: 'user@example.com',
 *   password: 'password123'
 * };
 * 
 * // Username-based login
 * const usernameLogin: LoginCredentials = {
 *   username: 'johndoe',
 *   password: 'password123'
 * };
 * 
 * // With additional fields
 * const extendedLogin: LoginCredentials = {
 *   email: 'user@example.com',
 *   password: 'password123',
 *   rememberMe: true,
 *   captcha: 'abc123'
 * };
 * ```
 */
export interface LoginCredentials {
  /**
   * User's email address (alternative to username).
   */
  email?: string;
  
  /**
   * User's username (alternative to email).
   */
  username?: string;
  
  /**
   * User's password (required for authentication).
   */
  password: string;
  
  /**
   * Additional fields for flexibility while maintaining type safety.
   * Allows extending credentials with custom fields like captcha, rememberMe, etc.
   */
  [key: string]: unknown;
}

/**
 * Password recovery request interface.
 * 
 * Defines the structure for password recovery requests, typically
 * used to initiate the password reset process via email.
 * 
 * @interface PasswordRecoveryRequest
 * 
 * @example
 * ```typescript
 * const recoveryRequest: PasswordRecoveryRequest = {
 *   email: 'user@example.com'
 * };
 * ```
 */
export interface PasswordRecoveryRequest {
  /**
   * The email address associated with the account to recover.
   */
  email: string;
}

/**
 * Password reset request interface.
 * 
 * Defines the structure for password reset operations using a
 * recovery hash/token received via email.
 * 
 * @interface PasswordResetRequest
 * 
 * @example
 * ```typescript
 * const resetRequest: PasswordResetRequest = {
 *   newPassword: 'newSecurePassword123',
 *   hash: 'recovery-hash-from-email'
 * };
 * ```
 */
export interface PasswordResetRequest {
  /**
   * The new password to set for the user account.
   */
  newPassword: string;
  
  /**
   * The recovery hash/token received from the password recovery email.
   */
  hash: string;
}

/**
 * Authentication response interface for login and authentication operations.
 * 
 * Defines the expected structure of responses from authentication endpoints
 * such as login, registration, and password operations.
 * 
 * @interface AuthenticationResponse
 * 
 * @example
 * ```typescript
 * // Successful login response
 * const loginResponse: AuthenticationResponse = {
 *   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   user: { id: '123', name: 'John Doe', email: 'john@example.com' },
 *   message: 'Login successful',
 *   success: true
 * };
 * 
 * // Error response
 * const errorResponse: AuthenticationResponse = {
 *   message: 'Invalid credentials',
 *   success: false,
 *   error: 'INVALID_CREDENTIALS'
 * };
 * ```
 */
export interface AuthenticationResponse {
  /**
   * Authentication token (typically JWT) returned on successful authentication.
   */
  token?: string;
  
  /**
   * User object containing user information (can be overridden by generic T in services).
   */
  user?: Record<string, unknown>;
  
  /**
   * Human-readable message describing the result of the operation.
   */
  message?: string;
  
  /**
   * Boolean indicating whether the operation was successful.
   */
  success?: boolean;
  
  /**
   * Additional response fields while maintaining type safety.
   * Allows for custom fields like error codes, metadata, etc.
   */
  [key: string]: unknown;
}

/**
 * Generic API response interface for standardized API responses.
 * 
 * Provides a consistent structure for API responses across the application.
 * Can be used with generic types to specify the expected data structure.
 * 
 * @template T - The type of data expected in the response
 * @interface ApiResponse
 * 
 * @example
 * ```typescript
 * // User data response
 * const userResponse: ApiResponse<User> = {
 *   data: { id: '123', name: 'John Doe', email: 'john@example.com' },
 *   message: 'User retrieved successfully',
 *   success: true
 * };
 * 
 * // Error response
 * const errorResponse: ApiResponse = {
 *   message: 'Resource not found',
 *   success: false,
 *   error: 'NOT_FOUND'
 * };
 * 
 * // List response
 * const usersResponse: ApiResponse<User[]> = {
 *   data: [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }],
 *   success: true
 * };
 * ```
 */
export interface ApiResponse<T = Record<string, unknown>> {
  /**
   * The main data payload of the response.
   */
  data?: T;
  
  /**
   * Human-readable message describing the result.
   */
  message?: string;
  
  /**
   * Boolean indicating whether the operation was successful.
   */
  success?: boolean;
  
  /**
   * Error message or code when the operation fails.
   */
  error?: string;
  
  /**
   * Additional response fields while maintaining type safety.
   * Allows for pagination info, metadata, etc.
   */
  [key: string]: unknown;
}