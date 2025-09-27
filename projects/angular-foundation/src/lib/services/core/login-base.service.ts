import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../../models/base.model';
import { BaseService } from './base.service';
import { 
  LoginCredentials, 
  PasswordRecoveryRequest, 
  PasswordResetRequest, 
  AuthenticationResponse,
  HttpHeaderMap 
} from '../../interfaces/http-types.interface';

/**
 * LoginBaseService extends BaseService with authentication-specific operations.
 * 
 * This service provides methods for user authentication, registration, password
 * recovery, and user management. It builds upon the CRUD operations from BaseService
 * and adds authentication-specific endpoints.
 * 
 * @template T - The user entity type that extends BaseModel
 * 
 * @example
 * ```typescript
 * interface User extends BaseModel {
 *   username: string;
 *   email: string;
 *   role: string;
 * }
 * 
 * @Injectable()
 * export class AuthService extends LoginBaseService<User> {
 *   constructor(http: HttpClient) {
 *     super(http);
 *     this.initializeConfig('https://api.example.com', 'auth');
 *   }
 * }
 * ```
 */
@Injectable()
export class LoginBaseService<T extends BaseModel> extends BaseService<T> {

  /**
   * Creates an instance of LoginBaseService.
   * 
   * @param {HttpClient} http - Angular HttpClient for making HTTP requests
   */
  constructor(protected override http: HttpClient) {
    super(http);
  }

  /**
   * Initializes the API configuration for authentication endpoints.
   * 
   * This method should be called in the constructor of extending services
   * to set up the base URL and endpoint path.
   * 
   * @param {string} url - The base URL of the API
   * @param {string} endpoint - The authentication endpoint path (e.g., 'auth', 'users')
   * 
   * @example
   * ```typescript
   * constructor(http: HttpClient) {
   *   super(http);
   *   this.initializeConfig('https://api.example.com', 'auth');
   * }
   * ```
   */
  initializeConfig(url: string, endpoint: string): void {
    this.setApiConfig(url, endpoint);
  }

  /**
   * Authenticates a user with the provided credentials.
   * 
   * Sends a POST request to the /login endpoint with user credentials.
   * 
   * @param {LoginCredentials} credentials - User login credentials (email/username and password)
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<AuthenticationResponse>} Observable containing authentication response with token
   * 
   * @example
   * ```typescript
   * const credentials = { email: 'user@example.com', password: 'password123' };
   * this.authService.login(credentials).subscribe(response => {
   *   if (response.token) {
   *     // Store token and redirect user
   *     this.authService.setToken(response.token);
   *     this.router.navigate(['/dashboard']);
   *   }
   * });
   * ```
   */
  login(credentials: LoginCredentials, headers?: HttpHeaderMap): Observable<AuthenticationResponse> {
    const options = this.createHttpHeaders(headers);
    return this.http.post<AuthenticationResponse>(`${this.url}/${this.endpoint}/login`, credentials, options);
  }

  /**
   * Initiates password recovery process for a user.
   * 
   * Sends a POST request to the /reset endpoint with the user's email address.
   * The server typically sends a password reset link via email.
   * 
   * @param {string} email - The email address of the user requesting password recovery
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<AuthenticationResponse>} Observable containing response with recovery status
   * 
   * @example
   * ```typescript
   * this.authService.passwordRecovery('user@example.com').subscribe(response => {
   *   if (response.success) {
   *     console.log('Password recovery email sent');
   *   }
   * });
   * ```
   */
  passwordRecovery(email: string, headers?: HttpHeaderMap): Observable<AuthenticationResponse> {
    const options = this.createHttpHeaders(headers);
    const request: PasswordRecoveryRequest = { email };
    return this.http.post<AuthenticationResponse>(`${this.url}/${this.endpoint}/reset`, request, options);
  }

  /**
   * Resets a user's password using a recovery hash.
   * 
   * Sends a POST request to the /reset-password endpoint with the new password
   * and the hash token received from the password recovery email.
   * 
   * @param {string} newPassword - The new password to set
   * @param {string} hash - The recovery hash/token from the password recovery email
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<AuthenticationResponse>} Observable containing reset confirmation
   * 
   * @example
   * ```typescript
   * this.authService.resetPassword('newPassword123', 'recovery-hash-token').subscribe(response => {
   *   if (response.success) {
   *     console.log('Password reset successful');
   *     this.router.navigate(['/login']);
   *   }
   * });
   * ```
   */
  resetPassword(newPassword: string, hash: string, headers?: HttpHeaderMap): Observable<AuthenticationResponse> {
    const options = this.createHttpHeaders(headers);
    const request: PasswordResetRequest = { newPassword, hash };
    return this.http.post<AuthenticationResponse>(`${this.url}/${this.endpoint}/reset-password`, request, options);
  }

  /**
   * Retrieves the current authenticated user's information.
   * 
   * Sends a GET request to the /me endpoint to fetch the current user's profile.
   * Requires a valid authentication token.
   * 
   * @param {string} token - The authentication token (typically handled automatically by AuthInterceptor)
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<T>} Observable containing the current user's information
   * 
   * @example
   * ```typescript
   * this.authService.getCurrentUser('token').subscribe(user => {
   *   console.log('Current user:', user);
   *   this.currentUser = user;
   * });
   * ```
   */
  getCurrentUser(token: string, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.get<T>(`${this.url}/${this.endpoint}/me`, options);
  }

  /**
   * Registers a new user account.
   * 
   * Sends a POST request to the /register endpoint with user registration data.
   * 
   * @param {T} item - The user data for registration
   * @param {HttpHeaderMap} [headers] - Optional additional HTTP headers
   * @returns {Observable<T>} Observable containing the created user data
   * 
   * @example
   * ```typescript
   * const newUser = {
   *   username: 'johndoe',
   *   email: 'john@example.com',
   *   password: 'password123'
   * };
   * 
   * this.authService.register(newUser).subscribe(user => {
   *   console.log('User registered:', user);
   *   // Optionally auto-login or redirect to login page
   * });
   * ```
   */
  register(item: T, headers?: HttpHeaderMap): Observable<T> {
    const options = this.createHttpHeaders(headers);
    return this.http.post<T>(`${this.url}/${this.endpoint}/register`, item, options);
  }
}