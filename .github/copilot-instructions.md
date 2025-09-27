# Copilot Instructions for Closca Angular Base Library

This document provides guidance for GitHub Copilot when working on the Closca Angular Base Library (@gnommostudios/ng-gnommo-base). Follow these instructions to maintain consistency with Angular and TypeScript best practices.

## Project Overview

This is an Angular library (version 20.3.0+) providing:
- Authentication services with token management 
- HTTP interceptors for automatic token injection and error handling
- Storage handlers for cookies and localStorage
- Base services for CRUD operations with generic typing
- Full TypeScript support with strict typing enabled

## Angular Library Development Guidelines

### Module Structure
- Use `NgModule` with `forRoot()` pattern for singleton services
- Implement `ModuleWithProviders<T>` for proper type safety
- Register providers in the `forRoot()` method, not in the module decorator
- Use `providedIn: 'root'` for services that should be singletons

```typescript
@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class NgGnommoBaseModule {
  static forRoot(): ModuleWithProviders<NgGnommoBaseModule> {
    return {
      ngModule: NgGnommoBaseModule,
      providers: [
        AuthService,
        // Other providers...
      ]
    };
  }
}
```

### Service Development
- All services should be decorated with `@Injectable()` or `@Injectable({ providedIn: 'root' })`
- Use dependency injection instead of manual instantiation
- Implement abstract base classes for shared functionality
- Use generics for type safety in CRUD operations
- Return Observables for asynchronous operations

```typescript
@Injectable()
export abstract class BaseService<T extends BaseModel> {
  constructor(protected http: HttpClient) {}
  
  getAll(headers?: HttpHeaderMap): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${this.endpoint}`, options);
  }
}
```

### HTTP Interceptors
- Implement `HttpInterceptor` interface
- Use proper error handling with `catchError` and `throwError`
- Chain interceptors appropriately with `next.handle()`
- Log errors appropriately (console.error for development, logging service for production)

```typescript
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError(error);
      })
    );
  }
}
```

## TypeScript Best Practices

### Strict TypeScript Configuration
The project uses strict TypeScript settings:
- `strict: true` - Enable all strict type checking options
- `noImplicitReturns: true` - Ensure all code paths return a value
- `noPropertyAccessFromIndexSignature: true` - Require explicit property access
- `noImplicitOverride: true` - Require explicit override keywords
- `strictTemplates: true` - Enable strict Angular template checking

### Type Definitions
- Always define explicit return types for public methods
- Use union types and optional properties appropriately
- Create interfaces for all data structures
- Use generics for reusable components and services
- Avoid `any` type - use `unknown` or specific types instead

```typescript
// Good - explicit types
interface HttpHeaderMap {
  [key: string]: string | string[];
}

// Good - generic with constraints
export abstract class BaseService<T extends BaseModel> {
  getById(id: string, headers?: HttpHeaderMap): Observable<T> {
    // Implementation
  }
}
```

### Interface Design
- Use interfaces for all data contracts
- Include optional properties with `?` when appropriate
- Use index signatures `[key: string]: unknown` for extensible objects
- Prefer composition over inheritance for interfaces

```typescript
export interface AuthenticationResponse {
  token?: string;
  user?: Record<string, unknown>;
  success?: boolean;
  [key: string]: unknown; // Allow additional fields
}
```

## Code Organization

### File Structure
```
src/lib/
├── services/core/          # Core business services
├── helpers/               # Utility classes (interceptors, guards)
├── models/               # Data models and entities
├── interfaces/           # Type definitions and contracts
├── storage/             # Storage implementation classes
└── index.ts            # Public API exports
```

### Naming Conventions
- Use PascalCase for classes, interfaces, and types
- Use camelCase for methods, properties, and variables
- Use kebab-case for file names
- Suffix interfaces with descriptive names (avoid "I" prefix)
- Use `.service.ts`, `.model.ts`, `.interface.ts` suffixes appropriately

### Import Organization
1. Angular core imports
2. Angular common/platform imports  
3. Third-party library imports
4. Internal service imports
5. Internal model/interface imports
6. Relative path imports

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../../models/base.model';
import { HttpHeaderMap } from '../../interfaces/http-types.interface';
```

## Testing Guidelines

### Test Structure
- Use Jasmine and Karma for unit testing
- Follow AAA pattern (Arrange, Act, Assert)
- Use `TestBed` for Angular service testing
- Mock dependencies with `jasmine.createSpy()` or `spyOn()`
- Use `HttpClientTestingModule` for HTTP testing

```typescript
describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
```

### Test Coverage
- Test all public methods and their edge cases
- Test error handling scenarios
- Test async operations with proper expectation handling
- Use descriptive test names that explain the scenario

## Build and Packaging

### Library Configuration
- Use `ng-packagr` for building the library
- Configure proper `public-api.ts` exports
- Use semantic versioning for releases
- Include proper `package.json` metadata

### Development Scripts
- `npm run build` - Build the library
- `npm run test` - Run unit tests
- `npm run pack` - Create distributable package
- `npm run dev` - Development mode with tests

## Documentation Standards

### Code Documentation
- Use JSDoc comments for all public APIs
- Document complex algorithms and business logic
- Include `@param` and `@returns` tags for methods
- Add `@example` sections for complex APIs

```typescript
/**
 * Retrieves all items from the API endpoint
 * @param headers Optional HTTP headers to include in the request
 * @returns Observable of array containing all items of type T
 * @example
 * ```typescript
 * userService.getAll().subscribe(users => console.log(users));
 * ```
 */
getAll(headers?: HttpHeaderMap): Observable<T[]> {
  // Implementation
}
```

### README Documentation
- Keep README updated with current API
- Include practical usage examples
- Document breaking changes and migration guides
- Maintain compatibility matrix

## Error Handling

### Service Error Handling
- Use RxJS operators for error handling (`catchError`, `retry`)
- Return meaningful error messages
- Log errors appropriately for debugging
- Don't swallow errors - always propagate or handle explicitly

### HTTP Error Handling  
- Handle both client-side and server-side errors
- Provide user-friendly error messages
- Include error logging for debugging
- Use proper HTTP status code handling

## Performance Best Practices

### Memory Management
- Unsubscribe from Observables in `ngOnDestroy`
- Use `takeUntil` operator for automatic unsubscription
- Avoid memory leaks in services and components
- Use `OnPush` change detection strategy when appropriate

### Bundle Optimization
- Use tree-shaking friendly exports
- Minimize dependencies in the library
- Use lazy loading for non-critical features
- Optimize for bundle size in production builds

## Security Considerations

### Token Management
- Store tokens securely (avoid localStorage for sensitive data)
- Implement proper token expiration handling
- Use HTTPS for all API communications
- Validate all inputs and sanitize outputs

### Data Protection
- Never log sensitive information
- Use proper authentication and authorization
- Implement CSRF protection where needed
- Follow OWASP security guidelines

---

*These instructions ensure code consistency, maintainability, and adherence to modern Angular and TypeScript best practices for library development.*