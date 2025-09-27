# Migration Guide

This document provides guidance for migrating between versions of the Tyris Angular Foundation Library and upgrading from older versions.

## Table of Contents

- [Migration from @gnommostudios/ng-gnommo-base](#migration-from-gnommostudiosng-gnommo-base)
- [Angular Version Compatibility](#angular-version-compatibility)
- [Breaking Changes](#breaking-changes)
- [Step-by-Step Migration](#step-by-step-migration)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Version History](#version-history)

## Migration from @gnommostudios/ng-gnommo-base

The library has been renamed from `@gnommostudios/ng-gnommo-base` to `@tyris/angular-foundation` with version 1.0.0. The API maintains compatibility with the previous version while providing a more descriptive name and improved functionality.

### Package Name Change

#### Step 1: Uninstall Old Package
```bash
npm uninstall @gnommostudios/ng-gnommo-base
```

#### Step 2: Install New Package
```bash
npm install @tyris/angular-foundation
```

#### Step 3: Update Imports
```typescript
// Old imports
import { NgGnommoBaseModule } from '@gnommostudios/ng-gnommo-base';

// New imports
import { AngularFoundationModule } from '@tyris/angular-foundation';
```

#### Step 4: Update Module Registration
```typescript
// Old module registration
@NgModule({
  imports: [
    NgGnommoBaseModule.forRoot()
  ]
})

// New module registration
@NgModule({
  imports: [
    AngularFoundationModule.forRoot()
  ]
})
```

### What's Changed

#### Module Name
```typescript
// Old (v0.0.8)
import { AngularFoundationModule } from '@tyris/angular-foundation';

@NgModule({
  imports: [AngularFoundationModule.forRoot()]
})

// New (v1.0.0+)
import { AngularFoundationModule } from '@tyris/angular-foundation';

@NgModule({
  imports: [AngularFoundationModule.forRoot()]
})
```

#### Import Paths (No Change Required)
All service and model imports remain the same:
```typescript
// These imports work in both versions
import { AuthService, BaseService, LoginBaseService } from '@tyris/angular-foundation';
import { LocalStorageHandler, CookieHandler } from '@tyris/angular-foundation';
import { AuthToken, BaseModel } from '@tyris/angular-foundation';
```

#### Enhanced TypeScript Support
The new version provides better type definitions:

```typescript
// Old - Limited type safety
interface User {
  _id?: string;
  name: string;
  email: string;
}

// New - Better type safety with BaseModel
interface User extends BaseModel {
  name: string;
  email: string;
}

class UserService extends BaseService<User> {
  // Full type safety for all CRUD operations
}
```

### Quick Migration Steps

1. **Update Module Import**:
   ```typescript
   // Replace NgGnommoBaseModule with AngularFoundationModule
   import { AngularFoundationModule } from '@tyris/angular-foundation';
   ```

2. **Update Module Configuration**:
   ```typescript
   @NgModule({
     imports: [AngularFoundationModule.forRoot()] // Changed from NgGnommoBaseModule
   })
   ```

3. **Extend BaseModel (Recommended)**:
   ```typescript
   // Update your interfaces to extend BaseModel
   interface User extends BaseModel {
     name: string;
     email: string;
   }
   ```

4. **Test Your Application**:
   - All existing functionality should work without changes
   - Verify authentication flows
   - Test HTTP interceptors
   - Check storage operations

## Angular Version Compatibility

### Supported Angular Versions

| Library Version | Minimum Angular | Maximum Angular | TypeScript | RxJS |
|----------------|-----------------|-----------------|------------|------|
| 1.0.0+         | 10.0.0          | 20.x.x          | 4.0.0+     | 6.0.0+ |
| 0.0.8          | 8.0.0           | 12.x.x          | 3.8.0+     | 6.0.0+ |

### Angular 10+ Migration Benefits

- **Ivy Renderer**: Better tree-shaking and smaller bundle sizes
- **Enhanced TypeScript**: Stricter type checking and better IntelliSense
- **Modern Build Tools**: Faster compilation and better development experience
- **Security Updates**: Latest security patches and improvements

### Angular Version Upgrade Guide

If you're upgrading from an older Angular version:

1. **Follow Angular's Official Migration Guide**:
   ```bash
   ng update @angular/cli @angular/core
   ```

2. **Update the Library**:
   ```bash
   npm install @tyris/angular-foundation@latest
   ```

3. **Update Dependencies**:
   ```bash
   npm update
   ```

## Breaking Changes

### Version 1.0.0

#### Module Name Change
- **Breaking**: `NgGnommoBaseModule` renamed to `AngularFoundationModule`
- **Impact**: Update imports in app.module.ts
- **Migration**: Replace import statement as shown above

#### TypeScript Strict Mode
- **Breaking**: Stricter type checking enabled
- **Impact**: May reveal previously hidden type issues
- **Migration**: Fix type errors by properly typing your interfaces

#### Removed Deprecated Methods
- **Breaking**: Removed legacy compatibility methods from v0.0.7
- **Impact**: Only affects applications using very old deprecated APIs
- **Migration**: Use the modern API methods documented in this guide

### Future Breaking Changes (Planned)

#### Version 2.0.0 (Planned)
- Angular 15+ minimum requirement
- Standalone components support
- Possible API refinements based on community feedback

We will provide detailed migration guides for all breaking changes with at least 3 months notice.

## Step-by-Step Migration

### From v0.0.8 to v1.0.0+

#### Step 1: Backup Your Project
```bash
git commit -am "Backup before library migration"
git tag pre-migration-backup
```

#### Step 2: Update Package
```bash
npm uninstall @tyris/angular-foundation
npm install @tyris/angular-foundation@latest
```

#### Step 3: Update Module Imports
Find and replace in your codebase:

```bash
# Using sed (Linux/Mac)
find src -name "*.ts" -exec sed -i 's/NgGnommoBaseModule/AngularFoundationModule/g' {} \;

# Or manually update each file
```

#### Step 4: Update Your Models
```typescript
// Before
interface User {
  _id?: string;
  name: string;
  email: string;
}

// After
import { BaseModel } from '@tyris/angular-foundation';

interface User extends BaseModel {
  name: string;
  email: string;
}
```

#### Step 5: Update Service Implementations
```typescript
// Before - Basic implementation
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  
  getUsers() {
    return this.http.get('/api/users');
  }
}

// After - Using BaseService
import { BaseService } from '@tyris/angular-foundation';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig('https://api.example.com', 'users');
  }
  
  // Now you have all CRUD operations with type safety
  // getAll(), getById(), create(), update(), delete()
}
```

#### Step 6: Test Migration
1. **Build the application**:
   ```bash
   ng build
   ```

2. **Run tests**:
   ```bash
   ng test
   ```

3. **Test authentication flows**:
   - Login/logout functionality
   - Token persistence
   - HTTP interceptors

4. **Test CRUD operations**:
   - Create, read, update, delete operations
   - Error handling
   - Custom headers

#### Step 7: Optimize Your Code (Optional)
Take advantage of new features:

```typescript
// Use new type-safe interfaces
import { LoginCredentials, AuthenticationResponse } from '@tyris/angular-foundation';

// Leverage improved error handling
export class AuthService extends LoginBaseService<User> {
  login(credentials: LoginCredentials): Observable<AuthenticationResponse> {
    return super.login(credentials).pipe(
      catchError(error => {
        // Enhanced error information available
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }
}
```

### Migration Checklist

- [ ] Backup project
- [ ] Update package version
- [ ] Update module imports (NgGnommoBaseModule → AngularFoundationModule)
- [ ] Extend BaseModel in your interfaces
- [ ] Update service implementations to use BaseService
- [ ] Test authentication functionality
- [ ] Test CRUD operations
- [ ] Test storage operations
- [ ] Run full test suite
- [ ] Update documentation/comments
- [ ] Deploy and monitor

## Common Issues and Solutions

### Issue 1: Module Import Error
**Error**: `Cannot find module 'AngularFoundationModule'`

**Solution**: Update the import statement:
```typescript
// Change this
import { AngularFoundationModule } from '@tyris/angular-foundation';

// To this
import { AngularFoundationModule } from '@tyris/angular-foundation';
```

### Issue 2: Type Errors After Migration
**Error**: `Property '_id' is missing in type`

**Solution**: Ensure your interfaces extend BaseModel:
```typescript
interface User extends BaseModel {
  name: string;
  email: string;
}
```

### Issue 3: HTTP Interceptor Not Working
**Symptoms**: Authentication headers not added automatically

**Solution**: Verify module configuration:
```typescript
@NgModule({
  imports: [
    AngularFoundationModule.forRoot() // Ensure forRoot() is called
  ]
})
```

### Issue 4: Storage Handler Issues
**Error**: Storage methods not available

**Solution**: Inject the correct storage handler:
```typescript
// Correct injection
constructor(
  @Inject(WebLocalStorage) private storage: LocalStorageHandler
) {}

// Or use concrete class
constructor(private storage: LocalStorageHandler) {}
```

### Issue 5: Build Errors with Strict TypeScript
**Error**: Various TypeScript compilation errors

**Solution**: Enable stricter typing in your code:
```typescript
// Add proper type annotations
const user: User = {
  name: 'John Doe',
  email: 'john@example.com'
};

// Use type assertions carefully
const userData = response.data as User;
```

### Issue 6: Tests Failing After Migration
**Symptoms**: Unit tests fail with injection errors

**Solution**: Update test configurations:
```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      // Mock services properly
      { provide: AuthService, useValue: mockAuthService },
      { provide: LocalStorageHandler, useClass: MockStorage }
    ]
  });
});
```

## Version History

### v1.0.0 (Current)
- **Release Date**: 2024
- **Major Changes**:
  - Module name changed to AngularFoundationModule
  - Enhanced TypeScript support
  - Angular 10+ compatibility
  - Comprehensive JSDoc documentation
  - Improved error handling

### v0.0.8 (Legacy)
- **Release Date**: 2023
- **Features**:
  - Basic authentication services
  - HTTP interceptors
  - Storage handlers
  - Angular 8-12 compatibility

### Versioning Strategy

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Deprecation Policy

- **Deprecation Notice**: 6 months minimum before removal
- **Migration Guide**: Provided for all breaking changes
- **Support Period**: Previous major version supported for 1 year after new release

### Future Roadmap

#### v1.1.0 (Planned)
- Additional storage providers (IndexedDB, WebSQL)
- Enhanced caching mechanisms
- Better testing utilities

#### v1.2.0 (Planned)
- Angular 15+ specific optimizations
- Standalone components support
- Performance improvements

#### v2.0.0 (Future)
- Angular 15+ minimum requirement
- API refinements based on community feedback
- Possible architecture improvements

## Getting Help

### Migration Support

If you encounter issues during migration:

1. **Check the documentation**: Review this guide and the API reference
2. **Search existing issues**: Check GitHub issues for similar problems
3. **Create an issue**: Open a new issue with:
   - Current version
   - Target version
   - Error messages
   - Minimal reproduction example

### Resources

- **GitHub Repository**: [tonybolanyo/closca-libs](https://github.com/tonybolanyo/closca-libs)
- **Documentation**: Located in the `/docs` folder
- **Examples**: Check the `usage-examples.md` file
- **API Reference**: Complete API documentation in `api-reference.md`

### Community

- **Issues**: Report bugs and request features
- **Discussions**: Ask questions and share experiences
- **Contributing**: See CONTRIBUTING.md for contribution guidelines

## Migration Testing Strategy

### Pre-Migration Testing
1. **Create comprehensive tests** for your current implementation
2. **Document current behavior** that must be preserved
3. **Identify custom extensions** that may be affected

### During Migration Testing
1. **Run existing tests** after each migration step
2. **Test edge cases** that may be affected by changes
3. **Verify performance** hasn't degraded

### Post-Migration Testing
1. **Full integration testing** of authentication flows
2. **End-to-end testing** of critical user journeys
3. **Load testing** to ensure performance is maintained
4. **Browser compatibility testing** across supported browsers

This migration guide ensures a smooth transition between versions while taking advantage of new features and improvements.