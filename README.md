# Tyris Angular Foundation Library (@tyris/angular-foundation)

A modernized Angular library providing authentication services, HTTP interceptors, storage handlers, and base CRUD operations. This library has been completely reconstructed from the original compiled version to support Angular 10+ with modern TypeScript and build tooling.

## 🚀 Features

- **🔐 Authentication Services**: Token-based authentication with automatic storage
- **🌐 HTTP Interceptors**: Automatic token injection and error handling
- **💾 Storage Handlers**: Cookie and Local Storage implementations with expiration support
- **⚡ Base Services**: Generic CRUD operations with full TypeScript typing
- **📝 TypeScript Support**: Complete type definitions and strict typing
- **🎯 Angular 10+ Compatible**: Modern Angular features and best practices
- **📚 Comprehensive Documentation**: Full JSDoc documentation and examples
- **🧪 Testing Support**: Built with testability in mind

## 📦 Installation

```bash
npm install @tyris/angular-foundation
```

## 🛠️ Quick Start

### 1. Import the Module

```typescript
import { NgModule } from '@angular/core';
import { AngularFoundationModule } from '@tyris/angular-foundation';

@NgModule({
  imports: [
    AngularFoundationModule.forRoot()
  ],
  // ...
})
export class AppModule { }
```

### 2. Create Your User Model

```typescript
import { BaseModel } from '@tyris/angular-foundation';

interface User extends BaseModel {
  name: string;
  email: string;
  role: string;
}
```

### 3. Create Authentication Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginBaseService } from '@tyris/angular-foundation';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends LoginBaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.initializeConfig('https://api.example.com', 'auth');
  }
}
```

### 4. Use in Your Components

```typescript
import { Component } from '@angular/core';
import { AuthService as AuthApiService } from './auth.service';
import { AuthService } from '@tyris/angular-foundation';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="login()">
      <input [(ngModel)]="email" type="email" placeholder="Email" required>
      <input [(ngModel)]="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authApiService: AuthApiService,
    private authService: AuthService
  ) {}

  login() {
    this.authApiService.login({ email: this.email, password: this.password })
      .subscribe(response => {
        if (response.token) {
          this.authService.setToken(response.token);
          // Navigate to dashboard
        }
      });
  }
}
```

### Version-Specific Configuration

#### Angular 9-12 Projects
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, // Required for Angular 9-12
    AngularFoundationModule.forRoot()
  ],
  // ...
})
export class AppModule { }
```

#### Angular 13+ Projects (Standalone Components)
```typescript  
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      AngularFoundationModule.forRoot()
    )
  ]
});
```

#### Angular 16+ Projects (Standalone with Providers)
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // Import AngularFoundationModule providers directly
    ...AngularFoundationModule.forRoot().providers
  ]
});
```

## 📖 Core Concepts

### Authentication Flow

1. **Login**: Use `LoginBaseService.login()` to authenticate users
2. **Token Storage**: Tokens are automatically stored in localStorage with expiration
3. **Auto-Injection**: `AuthInterceptor` automatically adds Bearer tokens to requests
4. **Token Management**: Use `AuthService` for token lifecycle management

### CRUD Operations

Extend `BaseService<T>` for type-safe CRUD operations:

```typescript
@Injectable()
export class UserService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig('https://api.example.com', 'users');
  }
  
  // Now you have: getAll(), getById(), create(), update(), delete()
}
```

### Storage Abstraction

Multiple storage options with consistent interface:

```typescript
// Inject storage handlers
constructor(
  private localStorage: LocalStorageHandler,
  private cookieHandler: CookieHandler
) {}

// Use with automatic JSON serialization
this.localStorage.set('user_preferences', { theme: 'dark' });
const prefs = this.localStorage.get('user_preferences');
```

## 🔧 Configuration

### HTTP Interceptors

The library automatically configures HTTP interceptors:

- **AuthInterceptor**: Adds `Authorization: Bearer <token>` headers
- **ErrorInterceptor**: Centralized error logging and handling

Skip authentication for specific requests:

```typescript
import { InterceptorSkipHeader } from '@tyris/angular-foundation';

const headers = new HttpHeaders().set(InterceptorSkipHeader, 'true');
this.http.get('/public-endpoint', { headers });
```

### Storage Configuration

Choose between localStorage and cookies:

```typescript
// Using localStorage (default)
constructor(private storage: LocalStorageHandler) {}

// Using cookies
constructor(private storage: CookieHandler) {}

// With expiration
const tomorrow = new Date(Date.now() + 86400000);
this.storage.set('temp_data', 'value', tomorrow);
```

## 📋 API Reference

### Services

| Service | Purpose | Key Methods |
|---------|---------|-------------|
| `AuthService` | Token management | `getToken()`, `setToken()`, `removeToken()` |
| `BaseService<T>` | Generic CRUD operations | `getAll()`, `getById()`, `create()`, `update()`, `delete()` |
| `LoginBaseService<T>` | Authentication operations | `login()`, `register()`, `passwordRecovery()` |

### Storage Handlers

| Handler | Storage Type | Persistence |
|---------|--------------|-------------|
| `LocalStorageHandler` | Browser localStorage | Across sessions |
| `CookieHandler` | Browser cookies | Configurable expiration |

### Models & Interfaces

| Type | Description |
|------|-------------|
| `BaseModel` | Foundation for all entity models |
| `AuthToken` | Authentication token with metadata |
| `LoginCredentials` | User login data structure |
| `AuthenticationResponse` | Login/auth API responses |

## 📚 Documentation

### Complete Documentation

- **[Architecture Guide](docs/architecture.md)**: Library design and patterns
- **[API Reference](docs/api-reference.md)**: Detailed API documentation with examples
- **[Usage Examples](docs/usage-examples.md)**: Real-world implementation examples
- **[Migration Guide](docs/migration-guide.md)**: Upgrading from older versions
- **[Troubleshooting](docs/troubleshooting.md)**: Common issues and solutions

### Generated API Documentation

```bash
# Generate TypeDoc documentation
npm run docs

# Serve documentation locally
npm run docs:serve
```

### Examples Repository

Check the `/docs/usage-examples.md` file for comprehensive examples including:

- Complete authentication flows
- Advanced CRUD operations
- Custom service implementations
- Storage management patterns
- Error handling strategies
- Testing examples

## 🧪 Development

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
npm run watch
```

### Package for Distribution

```bash
npm run pack
```

This creates a `.tgz` file in `dist/angular-foundation/` ready for NPM publishing.

## 🔄 Compatibility

### Angular Version Support

| Angular Version | Library Version | TypeScript | RxJS | Node.js | Status |
|----------------|-----------------|------------|------|---------|---------|
| **9.x** | 1.0.0+ | 3.8.x+ | 6.5.x+ | 12.x+ | ✅ Full Support |
| **10.x** | 1.0.0+ | 3.9.x+ | 6.5.x+ | 12.x+ | ✅ Full Support |
| **11.x** | 1.0.0+ | 4.0.x+ | 6.5.x+ | 12.x+ | ✅ Full Support |
| **12.x** | 1.0.0+ | 4.2.x+ | 6.6.x+ | 12.x+ | ✅ Full Support |
| **13.x** | 1.0.0+ | 4.4.x+ | 7.4.x+ | 14.x+ | ✅ Full Support |
| **14.x** | 1.0.0+ | 4.7.x+ | 7.5.x+ | 14.x+ | ✅ Full Support |  
| **15.x** | 1.0.0+ | 4.8.x+ | 7.5.x+ | 16.x+ | ✅ Full Support |
| **16.x** | 1.0.0+ | 4.9.x+ | 7.5.x+ | 16.x+ | ✅ Full Support |
| **17.x** | 1.0.0+ | 5.0.x+ | 7.5.x+ | 18.x+ | ✅ Full Support |
| **18.x** | 1.0.0+ | 5.0.x+ | 7.5.x+ | 18.x+ | ✅ Full Support |
| **19.x** | 1.0.0+ | 5.4.x+ | 7.8.x+ | 18.x+ | ✅ Full Support |
| **20.x** | 1.0.0+ | 5.6.x+ | 7.8.x+ | 18.x+ | ✅ Full Support |

### Installation by Angular Version

#### Angular 9-12
```bash
# Install library
npm install @tyris/angular-foundation

# Verify peer dependencies 
npm install @angular/core@^9.0.0 @angular/common@^9.0.0 rxjs@^6.5.0

# Build your project
npm run build:angular9-12
```

#### Angular 13-15  
```bash
# Install library
npm install @tyris/angular-foundation

# Verify peer dependencies
npm install @angular/core@^13.0.0 @angular/common@^13.0.0 rxjs@^7.4.0

# Build your project
npm run build:angular13-15
```

#### Angular 16-18
```bash  
# Install library
npm install @tyris/angular-foundation

# Verify peer dependencies
npm install @angular/core@^16.0.0 @angular/common@^16.0.0 rxjs@^7.5.0

# Build your project  
npm run build:angular16-18
```

#### Angular 19-20
```bash
# Install library
npm install @tyris/angular-foundation

# Verify peer dependencies
npm install @angular/core@^19.0.0 @angular/common@^19.0.0 rxjs@^7.8.0

# Build your project
npm run build:angular19-20
```

### Package Building for Different Versions

The library provides version-specific build commands:

```bash
# For Angular 9
npm run pack:angular9

# For Angular 9-12 group  
npm run pack:angular9-12

# For Angular 13-15 group
npm run pack:angular13-15

# For Angular 16-18 group
npm run pack:angular16-18

# For Angular 19-20 group (latest)
npm run pack:angular19-20
```

## 🚀 Migration from v0.0.8

The library maintains API compatibility with v0.0.8:

1. **Update the import**:
   ```typescript
   // Old
   import { AngularFoundationModule } from '@tyris/angular-foundation';
   
   // New
   import { AngularFoundationModule } from '@tyris/angular-foundation';
   ```

2. **Extend BaseModel** (recommended):
   ```typescript
   interface User extends BaseModel {
     name: string;
     email: string;
   }
   ```

3. **Test your application** - all existing functionality should work!

See the [Migration Guide](docs/migration-guide.md) for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tonybolanyo/closca-libs.git
   cd closca-libs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Build the library**:
   ```bash
   npm run build
   ```

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper documentation
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Build the library: `npm run build`
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🆘 Support

### Getting Help

- **📖 Documentation**: Check the comprehensive docs in `/docs`
- **🐛 Issues**: Report bugs on [GitHub Issues](https://github.com/tonybolanyo/closca-libs/issues)
- **💬 Discussions**: Ask questions in [GitHub Discussions](https://github.com/tonybolanyo/closca-libs/discussions)
- **📧 Email**: Contact the maintainers for enterprise support

### Reporting Issues

When reporting issues, please include:

- Library version (`npm list @tyris/angular-foundation`)
- Angular version (`ng version`)
- Browser and version
- Minimal reproduction example
- Expected vs actual behavior

### Feature Requests

We welcome feature requests! Please:

1. Check existing issues to avoid duplicates
2. Describe the use case and expected behavior
3. Consider contributing the feature yourself

## 🙏 Acknowledgments

- **Angular Team**: For the amazing framework
- **TypeScript Team**: For excellent tooling and type safety
- **Community Contributors**: For feedback and improvements
- **Original Authors**: For the foundation this library builds upon

## 📊 Project Stats

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-98%25-brightgreen)
![npm version](https://img.shields.io/npm/v/@tyris/angular-foundation)
![License](https://img.shields.io/badge/license-MIT-blue)
![Angular](https://img.shields.io/badge/Angular-9%2B-red)
![TypeScript](https://img.shields.io/badge/TypeScript-3.8%2B-blue)

---

<div align="center">

**Made with ❤️ for the Angular community**

[Documentation](docs/) • [API Reference](docs/api-reference.md) • [Examples](docs/usage-examples.md) • [Issues](https://github.com/tonybolanyo/closca-libs/issues)

</div>
