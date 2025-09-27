# API Reference

## Table of Contents

- [Services](#services)
  - [AuthService](#authservice)
  - [BaseService](#baseservice)
  - [LoginBaseService](#loginbaseservice)
- [Storage Handlers](#storage-handlers)
  - [LocalStorageHandler](#localstoragehandler)
  - [CookieHandler](#cookiehandler)
- [Interceptors](#interceptors)
  - [AuthInterceptor](#authinterceptor)
  - [ErrorInterceptor](#errorinterceptor)
- [Models](#models)
  - [BaseModel](#basemodel)
  - [AuthToken](#authtoken)
- [Interfaces](#interfaces)
  - [AuthTokenInterface](#authtokeninterface)
  - [HTTP Types](#http-types)

## Services

### AuthService

Token-based authentication service for managing user authentication state.

#### Methods

##### `getToken(): AuthToken`
Retrieves the current authentication token.

**Returns**: `AuthToken` - Current token or empty token if none exists

**Example**:
```typescript
const token = this.authService.getToken();
if (token.id) {
  console.log('User is authenticated');
}
```

##### `setToken(tokenId: string): void`
Sets a new authentication token.

**Parameters**:
- `tokenId` (string): The token identifier/JWT string

**Example**:
```typescript
// After successful login
this.authService.setToken(response.access_token);
```

##### `removeToken(): void`
Removes the current authentication token.

**Example**:
```typescript
// On logout
this.authService.removeToken();
this.router.navigate(['/login']);
```

##### `persist(token_property: string, value: StorageValue, expires?: Date): void`
Persists arbitrary data to storage with optional expiration.

**Parameters**:
- `token_property` (string): Storage key
- `value` (StorageValue): Value to store
- `expires` (Date, optional): Expiration date (defaults to 7 days)

**Example**:
```typescript
// Store user preferences for 30 days
const thirtyDays = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
this.authService.persist('user_preferences', { theme: 'dark' }, thirtyDays);
```

##### `expiresTime(): Date`
Returns the default expiration time (7 days from now).

**Returns**: `Date` - Expiration date

---

### BaseService<T>

Generic service providing CRUD operations for entities extending BaseModel.

#### Constructor
```typescript
constructor(protected http: HttpClient)
```

#### Protected Methods

##### `setApiConfig(url: string, endpoint: string): void`
Configures the API base URL and endpoint.

**Parameters**:
- `url` (string): Base API URL
- `endpoint` (string): Endpoint path

**Example**:
```typescript
constructor(http: HttpClient) {
  super(http);
  this.setApiConfig('https://api.example.com', 'users');
}
```

#### Public Methods

##### `getAll(headers?: HttpHeaderMap): Observable<T[]>`
Retrieves all entities.

**Parameters**:
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<T[]>` - Array of entities

**Example**:
```typescript
this.userService.getAll().subscribe(users => {
  console.log('All users:', users);
});

// With custom headers
this.userService.getAll({ 'Custom-Header': 'value' }).subscribe(users => {
  console.log('Users with custom header:', users);
});
```

##### `getById(_id: string, headers?: HttpHeaderMap): Observable<T>`
Retrieves a specific entity by ID.

**Parameters**:
- `_id` (string): Entity identifier
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<T>` - Single entity

**Example**:
```typescript
this.userService.getById('123').subscribe(user => {
  console.log('User:', user);
});
```

##### `create(item: T, headers?: HttpHeaderMap): Observable<T>`
Creates a new entity.

**Parameters**:
- `item` (T): Entity to create
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<T>` - Created entity

**Example**:
```typescript
const newUser = { name: 'John Doe', email: 'john@example.com' };
this.userService.create(newUser).subscribe(createdUser => {
  console.log('Created user:', createdUser);
});
```

##### `update(_id: string, item: T, headers?: HttpHeaderMap): Observable<T>`
Partially updates an entity (PATCH).

**Parameters**:
- `_id` (string): Entity identifier
- `item` (T): Partial entity data
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<T>` - Updated entity

**Example**:
```typescript
const updates = { name: 'Jane Doe' };
this.userService.update('123', updates).subscribe(updatedUser => {
  console.log('Updated user:', updatedUser);
});
```

##### `updateComplete(_id: string, item: T, headers?: HttpHeaderMap): Observable<T>`
Completely replaces an entity (PUT).

**Parameters**:
- `_id` (string): Entity identifier
- `item` (T): Complete entity data
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<T>` - Updated entity

**Example**:
```typescript
const completeUser = { name: 'Jane Smith', email: 'jane@example.com' };
this.userService.updateComplete('123', completeUser).subscribe(updatedUser => {
  console.log('Completely updated user:', updatedUser);
});
```

##### `delete(_id: string, headers?: HttpHeaderMap): Observable<void>`
Deletes an entity.

**Parameters**:
- `_id` (string): Entity identifier
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<void>` - Completion indicator

**Example**:
```typescript
this.userService.delete('123').subscribe(() => {
  console.log('User deleted successfully');
});
```

##### `createHttpHeaders(headers?: HttpHeaderMap): { headers: HttpHeaders }`
Creates HTTP headers with automatic authentication.

**Parameters**:
- `headers` (HttpHeaderMap, optional): Additional headers

**Returns**: `{ headers: HttpHeaders }` - Configured headers object

##### `httpHeadersWithoutAuth(headers?: HttpHeaderMap): { headers: HttpHeaders }`
Creates HTTP headers without authentication token.

**Parameters**:
- `headers` (HttpHeaderMap, optional): Additional headers

**Returns**: `{ headers: HttpHeaders }` - Configured headers object (no auth)

---

### LoginBaseService<T>

Extends BaseService with authentication-specific operations.

#### Constructor
```typescript
constructor(protected override http: HttpClient)
```

#### Methods

##### `initializeConfig(url: string, endpoint: string): void`
Initializes API configuration for authentication endpoints.

**Parameters**:
- `url` (string): Base API URL
- `endpoint` (string): Authentication endpoint path

**Example**:
```typescript
constructor(http: HttpClient) {
  super(http);
  this.initializeConfig('https://api.example.com', 'auth');
}
```

##### `login(credentials: LoginCredentials, headers?: HttpHeaderMap): Observable<AuthenticationResponse>`
Authenticates a user with credentials.

**Parameters**:
- `credentials` (LoginCredentials): User login credentials
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<AuthenticationResponse>` - Authentication response with token

**Example**:
```typescript
const credentials = { email: 'user@example.com', password: 'password123' };
this.authService.login(credentials).subscribe(response => {
  if (response.token) {
    this.authService.setToken(response.token);
    this.router.navigate(['/dashboard']);
  }
});
```

##### `passwordRecovery(email: string, headers?: HttpHeaderMap): Observable<AuthenticationResponse>`
Initiates password recovery process.

**Parameters**:
- `email` (string): User's email address
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<AuthenticationResponse>` - Recovery status response

**Example**:
```typescript
this.authService.passwordRecovery('user@example.com').subscribe(response => {
  if (response.success) {
    console.log('Password recovery email sent');
  }
});
```

##### `resetPassword(newPassword: string, hash: string, headers?: HttpHeaderMap): Observable<AuthenticationResponse>`
Resets user password using recovery hash.

**Parameters**:
- `newPassword` (string): New password
- `hash` (string): Recovery hash from email
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<AuthenticationResponse>` - Reset confirmation

**Example**:
```typescript
this.authService.resetPassword('newPassword123', 'recovery-hash').subscribe(response => {
  if (response.success) {
    console.log('Password reset successful');
    this.router.navigate(['/login']);
  }
});
```

##### `getCurrentUser(token: string, headers?: HttpHeaderMap): Observable<T>`
Retrieves current authenticated user information.

**Parameters**:
- `token` (string): Authentication token
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<T>` - Current user information

**Example**:
```typescript
this.authService.getCurrentUser('token').subscribe(user => {
  console.log('Current user:', user);
  this.currentUser = user;
});
```

##### `register(item: T, headers?: HttpHeaderMap): Observable<T>`
Registers a new user account.

**Parameters**:
- `item` (T): User registration data
- `headers` (HttpHeaderMap, optional): Additional HTTP headers

**Returns**: `Observable<T>` - Created user data

**Example**:
```typescript
const newUser = {
  username: 'johndoe',
  email: 'john@example.com',
  password: 'password123'
};

this.authService.register(newUser).subscribe(user => {
  console.log('User registered:', user);
});
```

---

## Storage Handlers

### LocalStorageHandler

Browser localStorage implementation with JSON serialization and expiration support.

#### Methods

##### `get(key: string): StorageValue`
Retrieves a value from localStorage.

**Parameters**:
- `key` (string): Storage key

**Returns**: `StorageValue` - Stored value or null

**Example**:
```typescript
const settings = this.storage.get('user_settings');
```

##### `set(key: string, value: StorageValue, expires?: Date): void`
Stores a value in localStorage.

**Parameters**:
- `key` (string): Storage key
- `value` (StorageValue): Value to store
- `expires` (Date, optional): Expiration date

**Example**:
```typescript
this.storage.set('user_settings', { theme: 'dark' });

// With expiration
const tomorrow = new Date(Date.now() + 86400000);
this.storage.set('temp_token', 'abc123', tomorrow);
```

##### `remove(key: string): void`
Removes a value from localStorage.

**Parameters**:
- `key` (string): Storage key

**Example**:
```typescript
this.storage.remove('user_settings');
```

---

### CookieHandler

Browser cookie implementation with automatic expiration handling.

#### Methods

##### `get(key: string): StorageValue`
Retrieves a cookie value.

**Parameters**:
- `key` (string): Cookie name

**Returns**: `StorageValue` - Cookie value or null

**Example**:
```typescript
const userId = this.storage.get('user_id');
```

##### `set(key: string, value: StorageValue, expires?: Date): void`
Sets a cookie value.

**Parameters**:
- `key` (string): Cookie name
- `value` (StorageValue): Value to store
- `expires` (Date, optional): Expiration date

**Example**:
```typescript
// Session cookie
this.storage.set('session_id', 'abc123');

// With expiration
const oneWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
this.storage.set('remember_token', 'xyz789', oneWeek);
```

##### `remove(key: string): void`
Removes a cookie.

**Parameters**:
- `key` (string): Cookie name

**Example**:
```typescript
this.storage.remove('user_session');
```

---

## Interceptors

### AuthInterceptor

Automatically adds authentication tokens to HTTP requests.

#### Constants

##### `InterceptorSkipHeader`
Header key used to skip authentication injection.

**Value**: `'X-Skip-Interceptor'`

**Example**:
```typescript
import { InterceptorSkipHeader } from '@gnommostudios/ng-gnommo-base';

const headers = new HttpHeaders().set(InterceptorSkipHeader, 'true');
this.http.get('/public/endpoint', { headers });
```

#### Methods

##### `intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>`
Intercepts HTTP requests to add authentication tokens.

**Parameters**:
- `req` (HttpRequest<any>): Outgoing request
- `next` (HttpHandler): Next handler in chain

**Returns**: `Observable<HttpEvent<any>>` - HTTP event observable

---

### ErrorInterceptor

Provides centralized HTTP error handling and logging.

#### Methods

##### `intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>`
Intercepts HTTP requests to handle errors.

**Parameters**:
- `req` (HttpRequest<any>): Outgoing request
- `next` (HttpHandler): Next handler in chain

**Returns**: `Observable<HttpEvent<any>>` - HTTP event observable

**Example of logged errors**:
```
// Client error
HTTP Error: Client Error: Network connection failed

// Server error
HTTP Error: Server Error Code: 404
Message: Not Found
```

---

## Models

### BaseModel

Foundation class for all entity models.

#### Properties

##### `_id?: string`
Unique identifier for the entity.

##### `instance?: Record<string, unknown>`
Additional instance data for metadata or computed properties.

**Example**:
```typescript
interface User extends BaseModel {
  name: string;
  email: string;
  createdAt: Date;
}

class UserModel extends BaseModel implements User {
  name!: string;
  email!: string;
  createdAt!: Date;
}
```

---

### AuthToken

Authentication token model with metadata.

#### Constructor
```typescript
constructor(data?: AuthTokenInterface)
```

#### Properties

##### `id?: string`
Token identifier/JWT string.

##### `ttl?: number`
Time-to-live timestamp (milliseconds since epoch).

##### `created?: Date`
Token creation date.

##### `userId?: string`
Associated user identifier.

**Example**:
```typescript
const token = new AuthToken({
  id: 'jwt-token-string',
  created: new Date(),
  ttl: Date.now() + (7 * 24 * 60 * 60 * 1000),
  userId: 'user123'
});
```

---

## Interfaces

### AuthTokenInterface

Defines authentication token structure.

#### Properties

##### `id?: string`
Token identifier or JWT string.

##### `ttl?: number`
Time-to-live timestamp.

##### `created?: Date`
Creation date.

##### `userId?: string`
Associated user identifier.

---

### HTTP Types

#### HttpHeaderMap
```typescript
interface HttpHeaderMap {
  [key: string]: string | string[];
}
```

Map of HTTP headers supporting string or array values.

#### StorageValue
```typescript
type StorageValue = string | number | boolean | object | null;
```

Union type for values that can be stored in storage handlers.

#### LoginCredentials
```typescript
interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
  [key: string]: unknown;
}
```

User login credentials with flexible additional fields.

#### PasswordRecoveryRequest
```typescript
interface PasswordRecoveryRequest {
  email: string;
}
```

Password recovery request structure.

#### PasswordResetRequest
```typescript
interface PasswordResetRequest {
  newPassword: string;
  hash: string;
}
```

Password reset request structure.

#### AuthenticationResponse
```typescript
interface AuthenticationResponse {
  token?: string;
  user?: Record<string, unknown>;
  message?: string;
  success?: boolean;
  [key: string]: unknown;
}
```

Standard authentication response structure.

#### ApiResponse<T>
```typescript
interface ApiResponse<T = Record<string, unknown>> {
  data?: T;
  message?: string;
  success?: boolean;
  error?: string;
  [key: string]: unknown;
}
```

Generic API response structure with typed data payload.