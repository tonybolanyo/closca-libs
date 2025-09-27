# Troubleshooting Guide

This document provides solutions to common issues you might encounter when using the Closca Angular Base Library.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Authentication Problems](#authentication-problems)
- [HTTP Interceptor Issues](#http-interceptor-issues)
- [Storage Handler Problems](#storage-handler-problems)
- [Service Integration Issues](#service-integration-issues)
- [TypeScript Errors](#typescript-errors)
- [Build and Compilation Issues](#build-and-compilation-issues)
- [Testing Problems](#testing-problems)
- [Performance Issues](#performance-issues)
- [Browser Compatibility](#browser-compatibility)

## Installation Issues

### Problem: Package Installation Fails

**Symptoms**:
```
npm ERR! peer dep missing: @angular/core@>=10.0.0
npm ERR! peer dep missing: @angular/common@>=10.0.0
```

**Solution**:
```bash
# Check your Angular version
ng version

# Update Angular if needed
ng update @angular/core @angular/cli

# Install the library
npm install @gnommostudios/ng-gnommo-base
```

**Prevention**: Ensure your Angular version meets the minimum requirements (v10.0.0+).

### Problem: Module Import Errors

**Symptoms**:
```typescript
ERROR in src/app/app.module.ts(5,10): error TS2305: 
Module '"@gnommostudios/ng-gnommo-base"' has no exported member 'GnommoBaseModule'.
```

**Solution**:
```typescript
// Correct import (v1.0.0+)
import { NgGnommoBaseModule } from '@gnommostudios/ng-gnommo-base';

@NgModule({
  imports: [NgGnommoBaseModule.forRoot()]
})
```

**Root Cause**: Module name changed from `GnommoBaseModule` to `NgGnommoBaseModule` in v1.0.0.

### Problem: Dependency Conflicts

**Symptoms**:
```
npm WARN @gnommostudios/ng-gnommo-base@1.0.0 requires a peer of rxjs@^6.0.0 but rxjs@7.0.0 is installed
```

**Solution**:
```bash
# Check installed versions
npm ls rxjs @angular/core

# Update if necessary (the library supports RxJS 6.0.0+)
npm install rxjs@^7.0.0
```

## Authentication Problems

### Problem: Token Not Persisting

**Symptoms**: User gets logged out after page refresh.

**Diagnosis**:
```typescript
// Check if token is being stored
const token = this.authService.getToken();
console.log('Current token:', token);

// Check localStorage directly
console.log('localStorage token:', localStorage.getItem('access_token'));
```

**Solutions**:

1. **Verify token setting**:
```typescript
// Ensure you're calling setToken after login
this.authService.loginUser(credentials).subscribe(response => {
  if (response.token) {
    this.authService.setToken(response.token); // This line is crucial
  }
});
```

2. **Check storage permissions**:
```typescript
// Test localStorage availability
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('localStorage is available');
} catch (e) {
  console.error('localStorage is not available:', e);
}
```

3. **Browser settings**: Ensure cookies and local storage are enabled in browser settings.

### Problem: Automatic Login Not Working

**Symptoms**: User has to login every time despite having a valid token.

**Solution**:
```typescript
// Add initialization in app.component.ts
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check for existing token on app startup
    const token = this.authService.getToken();
    if (token.id) {
      // Token exists, user should be logged in
      this.loadUserProfile();
    }
  }

  private loadUserProfile() {
    // Load user data if needed
    this.userService.getCurrentUser().subscribe(/*...*/);
  }
}
```

### Problem: Login Endpoint Not Called

**Symptoms**: Network tab shows no request to login endpoint.

**Diagnosis**:
```typescript
// Add logging to track the flow
export class AuthService extends LoginBaseService<User> {
  login(credentials: LoginCredentials) {
    console.log('Login called with:', credentials);
    console.log('API URL:', this.url, 'Endpoint:', this.endpoint);
    
    return super.login(credentials).pipe(
      tap(response => console.log('Login response:', response)),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }
}
```

**Solutions**:

1. **Verify API configuration**:
```typescript
constructor(http: HttpClient) {
  super(http);
  this.initializeConfig('https://api.example.com', 'auth'); // Ensure this is called
}
```

2. **Check form validation**:
```typescript
onSubmit() {
  if (this.loginForm.valid) { // This condition might be failing
    this.authService.login(this.loginForm.value).subscribe(/*...*/);
  } else {
    console.log('Form is invalid:', this.loginForm.errors);
  }
}
```

## HTTP Interceptor Issues

### Problem: Authorization Header Not Added

**Symptoms**: API calls return 401 Unauthorized despite being logged in.

**Diagnosis**:
```typescript
// Check if AuthInterceptor is registered
// In app.module.ts, verify:
imports: [NgGnommoBaseModule.forRoot()] // This registers interceptors

// Check token availability
const token = this.authService.getToken();
console.log('Token for request:', token);
```

**Solutions**:

1. **Verify module configuration**:
```typescript
@NgModule({
  imports: [
    NgGnommoBaseModule.forRoot() // Must call forRoot()
  ]
})
```

2. **Check token format**:
```typescript
// Token should have 'id' property
const token = this.authService.getToken();
if (token && token.id) {
  console.log('Valid token available');
} else {
  console.log('No valid token found');
}
```

3. **Debug interceptor**:
```typescript
// Temporarily add logging to see if interceptor is called
// This requires modifying the library code for debugging
intercept(req: HttpRequest<any>, next: HttpHandler) {
  console.log('AuthInterceptor called for:', req.url);
  // ... rest of interceptor code
}
```

### Problem: Skip Header Not Working

**Symptoms**: Authentication header added to public endpoints despite skip header.

**Solution**:
```typescript
import { InterceptorSkipHeader } from '@gnommostudios/ng-gnommo-base';

// Correct usage
const headers = new HttpHeaders().set(InterceptorSkipHeader, 'true');
this.http.get('/public/endpoint', { headers }).subscribe(/*...*/);

// Verify header is present
console.log('Headers:', headers.keys());
```

### Problem: Multiple Authorization Headers

**Symptoms**: Duplicate or conflicting Authorization headers.

**Solution**:
```typescript
// Don't manually add Authorization headers when using the interceptor
// Wrong:
const headers = new HttpHeaders({
  'Authorization': 'Bearer ' + token,  // Remove this
  'Content-Type': 'application/json'
});

// Right:
const headers = new HttpHeaders({
  'Content-Type': 'application/json'  // Let interceptor add Authorization
});
```

## Storage Handler Problems

### Problem: LocalStorage Data Not Persisting

**Symptoms**: Data disappears after browser restart.

**Solutions**:

1. **Check browser settings**:
   - Ensure "Clear cookies and site data when you quit Chrome" is disabled
   - Check if "Block third-party cookies" is affecting your domain

2. **Verify storage usage**:
```typescript
// Test storage directly
this.localStorage.set('test_key', 'test_value');
const retrieved = this.localStorage.get('test_key');
console.log('Storage test:', retrieved);
```

3. **Check for storage quota**:
```typescript
// Check available storage
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(estimate => {
    console.log('Storage quota:', estimate.quota);
    console.log('Storage usage:', estimate.usage);
  });
}
```

### Problem: Cookie Storage Issues

**Symptoms**: Cookies not being set or retrieved properly.

**Diagnosis**:
```typescript
// Check cookie directly
console.log('All cookies:', document.cookie);

// Test cookie handler
this.cookieHandler.set('test_cookie', 'test_value');
const retrieved = this.cookieHandler.get('test_cookie');
console.log('Cookie test:', retrieved);
```

**Solutions**:

1. **Check domain and path**:
```typescript
// Cookies are set with path=/
// Ensure you're accessing from the correct path
```

2. **HTTPS requirement**:
```typescript
// Some cookie settings require HTTPS
// Test on HTTPS in production
```

3. **Cross-origin issues**:
```typescript
// Ensure SameSite policy allows your usage
// Check browser dev tools for cookie warnings
```

## Service Integration Issues

### Problem: BaseService Methods Not Available

**Symptoms**: `Property 'getAll' does not exist on type 'UserService'`

**Solution**:
```typescript
// Ensure your service extends BaseService
export class UserService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig('https://api.example.com', 'users');
  }
}

// Not just implementing an interface
// Wrong:
export class UserService implements SomeInterface {
  // Missing BaseService functionality
}
```

### Problem: Generic Type Errors

**Symptoms**: TypeScript errors related to generic constraints.

**Solution**:
```typescript
// Ensure your interface extends BaseModel
interface User extends BaseModel {
  name: string;
  email: string;
}

// Use proper generic constraint
export class UserService extends BaseService<User> {
  // This enforces that User extends BaseModel
}
```

### Problem: HTTP Methods Return Wrong Types

**Symptoms**: Type assertion errors or unexpected response types.

**Solution**:
```typescript
// Verify your interface structure
interface User extends BaseModel {
  _id?: string;     // This comes from BaseModel
  name: string;
  email: string;
}

// Use proper typing
this.userService.getById('123').subscribe((user: User) => {
  console.log(user.name); // Should be properly typed
});
```

## TypeScript Errors

### Problem: Property Does Not Exist Errors

**Symptoms**: 
```
Property '_id' does not exist on type 'User'
Property 'instance' does not exist on type 'User'
```

**Solution**:
```typescript
// Ensure interface extends BaseModel
interface User extends BaseModel {
  name: string;
  email: string;
  // _id and instance are inherited from BaseModel
}
```

### Problem: Type 'unknown' Not Assignable

**Symptoms**: TypeScript strict mode errors.

**Solution**:
```typescript
// Add proper type guards
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'name' in obj;
}

// Use type assertions carefully
const userData = response.data as User;

// Or use type guards
if (isUser(response.data)) {
  console.log(response.data.name); // Now properly typed
}
```

### Problem: Observable Type Errors

**Symptoms**: RxJS operator type mismatches.

**Solution**:
```typescript
// Ensure proper Observable typing
getUserById(id: string): Observable<User> {
  return this.getById(id).pipe(
    map((user: User) => user), // Explicit typing if needed
    catchError((error: any) => throwError(error))
  );
}
```

## Build and Compilation Issues

### Problem: Build Fails with Ivy Renderer

**Symptoms**: Build errors related to Angular Ivy.

**Solution**:
```json
// angular.json - Ensure Ivy is enabled
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "aot": true
          }
        }
      }
    }
  }
}
```

### Problem: Tree Shaking Not Working

**Symptoms**: Bundle size larger than expected.

**Solution**:
```typescript
// Use specific imports
import { AuthService, BaseService } from '@gnommostudios/ng-gnommo-base';

// Not barrel imports if having issues
// Avoid: import * as NgGnommoBase from '@gnommostudios/ng-gnommo-base';
```

### Problem: Circular Dependency Warnings

**Symptoms**: Build warnings about circular dependencies.

**Solution**:
```typescript
// Avoid circular imports
// If UserService needs AuthService, inject it, don't import
constructor(
  http: HttpClient,
  private authService: AuthService  // Inject, don't import
) {
  super(http);
}
```

## Testing Problems

### Problem: TestBed Configuration Errors

**Symptoms**: Injection errors in unit tests.

**Solution**:
```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      // Provide actual services or mocks
      AuthService,
      { provide: LocalStorageHandler, useClass: MockStorage },
      // Don't forget HttpClient for BaseService
      HttpClient
    ]
  });
});
```

### Problem: HTTP Interceptor Testing

**Symptoms**: Interceptors not working in tests.

**Solution**:
```typescript
// For testing without interceptors
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    // Don't import NgGnommoBaseModule in tests
    providers: [AuthService] // Import services individually
  });
});

// For testing with interceptors
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      NgGnommoBaseModule.forRoot() // This includes interceptors
    ]
  });
});
```

### Problem: Mock Storage Issues

**Symptoms**: Storage operations failing in tests.

**Solution**:
```typescript
// Create proper mock storage
class MockStorage extends BaseStorage {
  private storage = new Map<string, any>();

  get(key: string): any {
    return this.storage.get(key) || null;
  }

  set(key: string, value: any): void {
    this.storage.set(key, value);
  }

  remove(key: string): void {
    this.storage.delete(key);
  }
}

// Use in tests
providers: [
  { provide: LocalStorageHandler, useClass: MockStorage }
]
```

## Performance Issues

### Problem: Memory Leaks

**Symptoms**: Application memory usage grows over time.

**Solution**:
```typescript
// Ensure proper subscription management
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.userService.getAll().pipe(
      takeUntil(this.destroy$)  // Prevent memory leaks
    ).subscribe(/*...*/);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Problem: Too Many HTTP Requests

**Symptoms**: Network tab shows duplicate requests.

**Solution**:
```typescript
// Implement caching
@Injectable()
export class UserService extends BaseService<User> {
  private cache = new Map<string, Observable<User>>();

  getById(id: string): Observable<User> {
    if (!this.cache.has(id)) {
      this.cache.set(id, super.getById(id).pipe(
        shareReplay(1) // Cache the result
      ));
    }
    return this.cache.get(id)!;
  }
}
```

### Problem: Large Bundle Size

**Symptoms**: Application bundle larger than expected.

**Solution**:
```bash
# Analyze bundle
ng build --prod --source-map
npx webpack-bundle-analyzer dist/your-app/main.js

# Use specific imports
import { AuthService } from '@gnommostudios/ng-gnommo-base';
// Not: import * as NgGnommoBase from '@gnommostudios/ng-gnommo-base';
```

## Browser Compatibility

### Problem: Internet Explorer Issues

**Symptoms**: Application not working in IE11.

**Solution**:
```typescript
// Add polyfills in polyfills.ts
import 'core-js/es/promise';
import 'core-js/es/array';
import 'core-js/es/map';
import 'core-js/es/set';

// Check localStorage support
if (typeof Storage === 'undefined') {
  // Provide fallback storage
  console.warn('localStorage not supported');
}
```

### Problem: Safari localStorage Issues

**Symptoms**: localStorage not working in Safari private mode.

**Solution**:
```typescript
// Test localStorage availability
function isLocalStorageAvailable(): boolean {
  try {
    const test = 'localStorage-test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// Provide fallback
if (!isLocalStorageAvailable()) {
  // Use cookie handler or in-memory storage
}
```

## Getting Additional Help

### Debug Mode

Enable verbose logging:

```typescript
// Add to main.ts for debugging
if (!environment.production) {
  console.log('Debug mode enabled');
  // Add global error handlers
  window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
  });
}
```

### Reporting Issues

When reporting issues, please include:

1. **Library version**: `npm list @gnommostudios/ng-gnommo-base`
2. **Angular version**: `ng version`
3. **Browser and version**
4. **Error messages** (full stack traces)
5. **Minimal reproduction** (CodeSandbox/StackBlitz)
6. **Expected vs actual behavior**

### Community Resources

- **GitHub Issues**: [Report bugs and issues](https://github.com/tonybolanyo/closca-libs/issues)
- **Stack Overflow**: Tag questions with `angular` and `closca-libs`
- **Documentation**: Check all documentation files in `/docs`

### Professional Support

For enterprise support and custom implementations, consider:
- Creating detailed issue reports
- Providing reproduction cases
- Contributing back improvements via pull requests