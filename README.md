# Closca Angular Base Library (@gnommostudios/ng-gnommo-base)

A modernized Angular library providing authentication services, HTTP interceptors, and storage handlers. This library has been completely reconstructed from the original compiled version to support Angular 10+ with modern TypeScript and build tooling.

## Features

- **Authentication Services**: Token-based authentication with automatic storage
- **HTTP Interceptors**: Automatic token injection and error handling
- **Storage Handlers**: Cookie and Local Storage implementations
- **Base Services**: CRUD operations with generic typing
- **TypeScript Support**: Full type definitions and strict typing
- **Angular 10+ Compatible**: Modern Angular features and best practices

## Installation

```bash
npm install @gnommostudios/ng-gnommo-base
```

## Usage

### 1. Import the Module

```typescript
import { NgModule } from '@angular/core';
import { NgGnommoBaseModule } from '@gnommostudios/ng-gnommo-base';

@NgModule({
  imports: [
    NgGnommoBaseModule.forRoot()
  ],
  // ...
})
export class AppModule { }
```

### 2. Using Authentication Service

```typescript
import { Injectable } from '@angular/core';
import { AuthService } from '@gnommostudios/ng-gnommo-base';

@Injectable()
export class MyService {
  constructor(private authService: AuthService) {}

  login(token: string) {
    this.authService.setToken(token);
  }

  logout() {
    this.authService.removeToken();
  }

  getCurrentToken() {
    return this.authService.getToken();
  }
}
```

### 3. Using Base Service for CRUD Operations

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService, BaseModel } from '@gnommostudios/ng-gnommo-base';

interface User extends BaseModel {
  name: string;
  email: string;
}

@Injectable()
export class UserService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig('https://api.example.com', 'users');
  }
}
```

### 4. Using Login Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginBaseService, BaseModel } from '@gnommostudios/ng-gnommo-base';

interface User extends BaseModel {
  username: string;
  email: string;
}

@Injectable()
export class AuthApiService extends LoginBaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.initializeConfig('https://api.example.com', 'auth');
  }

  loginUser(credentials: {email: string, password: string}) {
    return this.login(credentials);
  }
}
```

### 5. HTTP Interceptors

The library automatically configures HTTP interceptors when you import `NgGnommoBaseModule.forRoot()`:

- **AuthInterceptor**: Automatically adds `Authorization: Bearer <token>` headers to requests
- **ErrorInterceptor**: Logs and handles HTTP errors

To skip the auth interceptor for specific requests:

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InterceptorSkipHeader } from '@gnommostudios/ng-gnommo-base';

// Skip auth interceptor for this request
const headers = new HttpHeaders().set(InterceptorSkipHeader, 'true');
this.http.get('/public-endpoint', { headers });
```

## API Reference

### Services

#### AuthService
- `getToken()`: Get current authentication token
- `setToken(tokenId: string)`: Set authentication token
- `removeToken()`: Remove authentication token
- `persist(key: string, value: any, expires?: Date)`: Store data with expiration

#### BaseService<T>
- `getAll(headers?)`: Get all items
- `getById(id: string, headers?)`: Get item by ID
- `create(item: T, headers?)`: Create new item
- `update(id: string, item: T, headers?)`: Update item (PATCH)
- `updateComplete(id: string, item: T, headers?)`: Complete update (PUT)
- `delete(id: string, headers?)`: Delete item

#### LoginBaseService<T>
Extends BaseService with additional methods:
- `login(credentials: any, headers?)`: User login
- `passwordRecovery(email: any, headers?)`: Password recovery
- `resetPassword(newPassword: any, hash: any, headers?)`: Reset password
- `getCurrentUser(token: any, headers?)`: Get current user info
- `register(item: T, headers?)`: User registration

### Storage Handlers

#### CookieHandler
- `get(key: string)`: Get value from cookies
- `set(key: string, value: any, expires?: Date)`: Set cookie value
- `remove(key: string)`: Remove cookie

#### LocalStorageHandler
- `get(key: string)`: Get value from localStorage
- `set(key: string, value: any, expires?: Date)`: Set localStorage value
- `remove(key: string)`: Remove localStorage value

### Models and Interfaces

#### BaseModel
```typescript
class BaseModel {
  _id?: string;
  instance?: any;
}
```

#### AuthTokenInterface
```typescript
interface AuthTokenInterface {
  'id'?: string;
  'ttl'?: number;
  'created'?: Date;
}
```

#### AuthToken
```typescript
class AuthToken implements AuthTokenInterface {
  id: any;
  ttl: any;
  created: any;
  userId: any;
}
```

## Development

### Build the Library

```bash
npm run build
```

### Run Tests

```bash
npm run test
```

### Watch Mode for Development

```bash
npm run dev
```

### Package for Distribution

```bash
npm run pack
```

This will create a `.tgz` file in `dist/ng-gnommo-base/` ready for NPM publishing.

## Compatibility

- **Angular**: 10.0.0 and above
- **TypeScript**: 4.0.0 and above
- **RxJS**: 6.0.0 and above

## Migration from v0.0.8

This library maintains the same public API as the original `@gnommostudios/ng-gnommo-base@0.0.8`, so migration should be straightforward:

1. Update your import statements if needed
2. The module name changed from `GnommoBaseModule` to `NgGnommoBaseModule`
3. All services, models, and interfaces maintain the same signatures

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test`
5. Build the library: `npm run build`
6. Submit a pull request

## Support

For issues and questions, please use the GitHub issue tracker.
