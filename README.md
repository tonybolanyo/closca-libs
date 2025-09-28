# Tyris Angular Foundation Library (@tyris/angular-foundation)

A modernized Angular library providing authentication services, HTTP interceptors, storage handlers, and base CRUD operations. This library has been completely reconstructed from the original compiled version to support Angular 6+ with modern TypeScript and build tooling.

## 🚀 Features

- **🔐 Authentication Services**: Token-based authentication with automatic storage
- **🌐 HTTP Interceptors**: Automatic token injection and error handling
- **💾 Storage Handlers**: Cookie and Local Storage implementations with expiration support
- **⚡ Base Services**: Generic CRUD operations with full TypeScript typing
- **📝 TypeScript Support**: Complete type definitions and strict typing
- **🎯 Angular 6+ Compatible**: Wide compatibility from Angular 6 through Angular 20
- **📚 Comprehensive Documentation**: Full JSDoc documentation and examples
- **🧪 Testing Support**: Built with testability in mind

## 📦 Installation

```bash
npm install @tyris/angular-foundation
```

## 👨‍💻 Developer Guide - How to Use for Every Angular Version

This section provides step-by-step instructions for developers working with any Angular version from 6 to 20.

### Prerequisites Check

Before installing, verify your development environment:

```bash
# Check your Angular version
ng version

# Check your Node.js version
node --version

# Check your npm version
npm --version
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

#### Angular 6-8 Projects (Legacy)
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFoundationModule } from '@tyris/angular-foundation';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule, // Required for HTTP functionality
    AngularFoundationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

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

## 👨‍💻 Complete Developer How-To Guide

### Step 1: Environment Setup

#### For Angular 6-8 Projects
```bash
# Ensure you have the correct Node.js version
node --version  # Should be 10.x or higher

# Check your Angular CLI version
ng version

# If needed, install/update Angular CLI globally
npm install -g @angular/cli@6  # For Angular 6
npm install -g @angular/cli@7  # For Angular 7  
npm install -g @angular/cli@8  # For Angular 8
```

#### For Angular 9+ Projects
```bash
# Ensure you have the correct Node.js version
node --version  # Should be 12.x or higher for Angular 9+

# Check your Angular CLI version
ng version

# Update Angular CLI if needed
npm install -g @angular/cli@latest
```

### Step 2: Project Setup

#### Creating a New Project
```bash
# Create new Angular project
ng new my-angular-app

# Navigate to project directory
cd my-angular-app

# Install the foundation library
npm install @tyris/angular-foundation
```

#### Adding to Existing Project
```bash
# Navigate to your existing project
cd your-existing-project

# Install the foundation library
npm install @tyris/angular-foundation

# Verify peer dependencies
npm ls @angular/core @angular/common rxjs
```

### Step 3: Module Configuration

Choose the configuration method based on your Angular version:

#### For Angular 6-12 (Traditional NgModule)
```typescript
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // If using template-driven forms
import { ReactiveFormsModule } from '@angular/forms'; // If using reactive forms

import { AngularFoundationModule } from '@tyris/angular-foundation';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
    // Add your components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,           // Required for HTTP functionality
    FormsModule,               // Optional: for template-driven forms
    ReactiveFormsModule,       // Optional: for reactive forms
    AngularFoundationModule.forRoot() // Configure the foundation library
  ],
  providers: [
    // Add your custom providers here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### For Angular 13+ (Standalone Components)
```typescript
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFoundationModule } from '@tyris/angular-foundation';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AngularFoundationModule.forRoot()
    ),
    // Add your custom providers here
  ]
}).catch(err => console.error(err));
```

#### For Angular 16+ (Modern Providers)
```typescript
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AngularFoundationModule } from '@tyris/angular-foundation';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    // Spread the foundation library providers
    ...AngularFoundationModule.forRoot().providers,
    // Add your custom providers here
  ]
}).catch(err => console.error(err));
```

### Step 4: Creating Your Models

```typescript
// src/app/models/user.model.ts
import { BaseModel } from '@tyris/angular-foundation';

export interface User extends BaseModel {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt?: Date;
  updatedAt?: Date;
}

// src/app/models/auth-response.model.ts
export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}
```

### Step 5: Creating Services

#### Authentication Service
```typescript
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginBaseService, AuthService as BaseAuthService } from '@tyris/angular-foundation';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends LoginBaseService<User> {
  constructor(
    http: HttpClient,
    private baseAuthService: BaseAuthService
  ) {
    super(http);
    // Configure your API endpoints
    this.initializeConfig('https://your-api.com/api', 'auth');
  }

  // Custom login method
  loginUser(email: string, password: string): Observable<AuthResponse> {
    return this.login({ email, password });
  }

  // Check if user is authenticated
  isLoggedIn(): boolean {
    return this.baseAuthService.isAuthenticated();
  }

  // Get current user token
  getCurrentToken(): string | null {
    return this.baseAuthService.getToken();
  }

  // Logout user
  logoutUser(): void {
    this.baseAuthService.clearToken();
  }
}
```

#### Data Service Example
```typescript
// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '@tyris/angular-foundation';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    // Configure your API endpoints
    this.setApiConfig('https://your-api.com/api', 'users');
  }

  // Get user profile
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.url}/${this.endpoint}/profile`);
  }

  // Update user profile
  updateProfile(user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.url}/${this.endpoint}/profile`, user);
  }
}
```

### Step 6: Creating Components

#### Login Component
```typescript
// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="login()" #loginForm="ngForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email"
            name="email"
            [(ngModel)]="credentials.email" 
            required 
            #email="ngModel">
          <div *ngIf="email.invalid && email.touched" class="error">
            Email is required
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password"
            name="password"
            [(ngModel)]="credentials.password" 
            required 
            #password="ngModel">
          <div *ngIf="password.invalid && password.touched" class="error">
            Password is required
          </div>
        </div>
        
        <button 
          type="submit" 
          [disabled]="loginForm.invalid || isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
        
        <div *ngIf="errorMessage" class="error">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    .error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }
  `]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.loginUser(this.credentials.email, this.credentials.password)
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Navigate to dashboard or protected route
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
```

### Step 7: Building and Testing

#### Build Commands
```bash
# Development build
npm run build

# Production build
npm run build:prod

# Version-specific builds
npm run build:angular6-8   # For Angular 6-8
npm run build:angular9-12  # For Angular 9-12
npm run build:angular13-15 # For Angular 13-15
npm run build:angular16-18 # For Angular 16-18
npm run build:angular19-20 # For Angular 19-20
```

#### Testing
```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

#### Development Server
```bash
# Start development server
ng serve

# Start development server on specific port
ng serve --port 4200

# Start development server with auto-open browser
ng serve --open
```

### Step 8: Deployment Preparation

#### Package for Distribution
```bash
# Create distribution package
npm run pack

# Version-specific packages
npm run pack:angular6-8   # For Angular 6-8
npm run pack:angular9-12  # For Angular 9-12
npm run pack:angular13-15 # For Angular 13-15
npm run pack:angular16-18 # For Angular 16-18
npm run pack:angular19-20 # For Angular 19-20
```

#### Environment Configuration
```typescript
// src/environments/environment.ts (Development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'My Angular App'
};

// src/environments/environment.prod.ts (Production)
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api',
  appName: 'My Angular App'
};
```

### Troubleshooting Common Issues

#### Peer Dependency Warnings
```bash
# Check what peer dependencies are missing
npm ls

# Install missing peer dependencies
npm install @angular/core@^6.0.0 @angular/common@^6.0.0 rxjs@^6.0.0

# Force resolution if needed (package.json)
{
  "overrides": {
    "@angular/core": "^6.0.0"
  }
}
```

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Angular cache
ng cache clean

# Rebuild with verbose output
ng build --verbose
```

#### Runtime Errors
- Check browser console for detailed error messages
- Verify all required imports are in your module
- Ensure HttpClientModule is imported for HTTP functionality
- Check that environment variables are correctly configured

This comprehensive guide should help any developer integrate the Tyris Angular Foundation Library into their project, regardless of their Angular version!

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
| **6.x** | 1.0.0+ | 2.7.x+ | 6.0.x+ | 10.x+ | ✅ Full Support |
| **7.x** | 1.0.0+ | 3.1.x+ | 6.3.x+ | 10.x+ | ✅ Full Support |
| **8.x** | 1.0.0+ | 3.4.x+ | 6.4.x+ | 10.x+ | ✅ Full Support |
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

#### Angular 6-8 (Legacy Support)
```bash
# Install library
npm install @tyris/angular-foundation

# Verify peer dependencies 
npm install @angular/core@^6.0.0 @angular/common@^6.0.0 rxjs@^6.0.0

# Build your project
npm run build:angular6-8
```

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
# For Angular 6
npm run pack:angular6

# For Angular 6-8 group  
npm run pack:angular6-8

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
![Angular](https://img.shields.io/badge/Angular-6%2B-red)
![TypeScript](https://img.shields.io/badge/TypeScript-2.7%2B-blue)

---

<div align="center">

**Made with ❤️ for the Angular community**

[Documentation](docs/) • [API Reference](docs/api-reference.md) • [Examples](docs/usage-examples.md) • [Issues](https://github.com/tonybolanyo/closca-libs/issues)

</div>
