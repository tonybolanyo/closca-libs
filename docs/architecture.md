# Architecture Documentation

## Overview

The Closca Angular Base Library (@tyris/angular-foundation) follows a modular architecture designed to provide reusable components for Angular applications. The library is built with modern Angular patterns and TypeScript best practices.

## Core Architecture

```
AngularFoundationModule
├── Services
│   ├── AuthService (Token Management)
│   ├── BaseService<T> (Generic CRUD)
│   └── LoginBaseService<T> (Authentication Operations)
├── Interceptors
│   ├── AuthInterceptor (Automatic Token Injection)
│   └── ErrorInterceptor (Centralized Error Handling)
├── Storage Handlers
│   ├── LocalStorageHandler (Browser localStorage)
│   ├── CookieHandler (Browser Cookies)
│   └── BaseStorage (Abstract Interface)
├── Models
│   ├── BaseModel (Entity Foundation)
│   └── AuthToken (Token Representation)
└── Interfaces
    ├── AuthTokenInterface
    └── HTTP Types (Credentials, Responses, etc.)
```

## Design Patterns

### 1. Abstract Factory Pattern
The library uses abstract base classes to define contracts:
- `BaseStorage` defines the storage interface
- `BaseService<T>` defines CRUD operations
- `BaseModel` defines entity structure

### 2. Dependency Injection
All services are designed for Angular's DI system:
- Services use `@Injectable()` decorator
- Proper provider configuration in module
- Interface-based dependencies for testability

### 3. Generic Programming
Type safety through generics:
- `BaseService<T extends BaseModel>` for type-safe CRUD
- `LoginBaseService<T extends BaseModel>` for user management
- `ApiResponse<T>` for typed API responses

### 4. Interceptor Pattern
HTTP interceptors for cross-cutting concerns:
- `AuthInterceptor` handles authentication automatically
- `ErrorInterceptor` provides centralized error handling
- Skip mechanism for selective application

## Service Layer Architecture

### Authentication Service (`AuthService`)
- **Responsibility**: Token lifecycle management
- **Storage**: Uses LocalStorageHandler by default
- **Features**: Token creation, retrieval, persistence, expiration
- **Dependencies**: LocalStorageHandler

### Base Service (`BaseService<T>`)
- **Responsibility**: Generic CRUD operations
- **Pattern**: Template method pattern
- **Features**: HTTP operations, header management, type safety
- **Dependencies**: HttpClient

### Login Base Service (`LoginBaseService<T>`)
- **Responsibility**: Authentication-specific operations
- **Pattern**: Inheritance (extends BaseService)
- **Features**: Login, registration, password recovery
- **Dependencies**: HttpClient (inherited)

## Storage Layer Architecture

### Abstract Storage Interface
```typescript
abstract class BaseStorage {
  abstract get(key: string): StorageValue;
  abstract set(key: string, value: StorageValue, expires?: Date): void;
  abstract remove(key: string): void;
}
```

### Concrete Implementations
- **LocalStorageHandler**: Browser localStorage with JSON serialization
- **CookieHandler**: Browser cookies with expiration support
- **Extensible**: Easy to add new storage mechanisms

## HTTP Layer Architecture

### Interceptor Chain
```
HTTP Request → AuthInterceptor → ErrorInterceptor → Backend
                     ↓                ↓
             Add Auth Token    Log Errors
```

### Request Flow
1. **Outgoing**: AuthInterceptor adds Bearer token
2. **Incoming**: ErrorInterceptor handles errors
3. **Skip Logic**: Special header bypasses interceptors

## Module Configuration

### Lazy Loading Support
The module uses `forRoot()` pattern for singleton services:
```typescript
AngularFoundationModule.forRoot() // Root module only
```

### Provider Configuration
- Services registered as singletons
- Interceptors registered with multi: true
- Storage handlers bound to abstract interfaces

## Type System Architecture

### Interface Hierarchy
```
BaseModel (Abstract Entity)
├── User Models (Application-specific)
└── Other Domain Models

AuthTokenInterface
└── AuthToken (Concrete Implementation)

StorageValue (Union Type)
├── string
├── number
├── boolean
├── object
└── null
```

### Generic Constraints
- `T extends BaseModel` ensures entity compatibility
- Optional interfaces for flexible API responses
- Union types for flexible storage values

## Security Architecture

### Token Management
- Automatic token injection via interceptors
- Configurable token expiration
- Secure storage abstraction

### CSRF Protection
- Same-origin policy enforcement
- Configurable header management
- Skip mechanism for public endpoints

## Extension Points

### Custom Storage
Implement `BaseStorage` for custom storage mechanisms:
```typescript
class CustomStorage extends BaseStorage {
  // Implement required methods
}
```

### Custom Services
Extend base services for domain-specific operations:
```typescript
class UserService extends BaseService<User> {
  // Add custom methods
}
```

### Custom Interceptors
Add to the interceptor chain:
```typescript
{
  provide: HTTP_INTERCEPTORS,
  useClass: CustomInterceptor,
  multi: true
}
```

## Performance Considerations

### Memory Management
- Services are singletons (memory efficient)
- Token caching reduces storage access
- Lazy evaluation of stored data

### HTTP Optimization
- Interceptors process all requests (minimal overhead)
- Header caching for repeated requests
- Error handling doesn't impact performance

### Bundle Size
- Tree-shakable exports
- Minimal dependencies
- Separate concerns for selective imports

## Testing Architecture

### Testability Features
- Injectable services for easy mocking
- Interface-based dependencies
- Interceptor isolation through skip headers
- Storage abstraction for test doubles

### Mock Strategies
```typescript
// Mock AuthService
const mockAuthService = jasmine.createSpyObj('AuthService', ['getToken']);

// Mock Storage
class MockStorage extends BaseStorage {
  private store = new Map();
  // Implement methods
}
```

## Migration Strategy

### Backward Compatibility
- Interface stability across versions
- Deprecation warnings for breaking changes
- Migration utilities when needed

### Version Strategy
- Semantic versioning
- Clear upgrade paths
- Documentation for each version