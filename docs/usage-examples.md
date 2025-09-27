# Usage Examples

This document provides comprehensive examples of how to use the Closca Angular Base Library in real-world scenarios.

## Table of Contents

- [Basic Setup](#basic-setup)
- [Authentication Examples](#authentication-examples)
- [CRUD Operations](#crud-operations)
- [Custom Services](#custom-services)
- [Storage Examples](#storage-examples)
- [Advanced Patterns](#advanced-patterns)
- [Error Handling](#error-handling)
- [Testing Examples](#testing-examples)

## Basic Setup

### Module Import
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFoundationModule } from '@tyris/angular-foundation';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFoundationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Basic Component Setup
```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@tyris/angular-foundation';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="isAuthenticated">
      <h1>Welcome back!</h1>
      <button (click)="logout()">Logout</button>
    </div>
    <div *ngIf="!isAuthenticated">
      <h1>Please login</h1>
      <button (click)="login()">Login</button>
    </div>
  `
})
export class AppComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = this.authService.getToken();
    this.isAuthenticated = !!token.id;
  }

  login() {
    // Simulate login
    this.authService.setToken('sample-jwt-token');
    this.isAuthenticated = true;
  }

  logout() {
    this.authService.removeToken();
    this.isAuthenticated = false;
  }
}
```

## Authentication Examples

### Complete Login Flow
```typescript
// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { 
  LoginBaseService, 
  AuthService, 
  BaseModel,
  LoginCredentials,
  AuthenticationResponse 
} from '@tyris/angular-foundation';

interface User extends BaseModel {
  id: string;
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends LoginBaseService<User> {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    super(http);
    this.initializeConfig('https://api.example.com', 'auth');
    
    // Check for existing token on startup
    const token = this.authService.getToken();
    if (token.id) {
      this.loadCurrentUser();
    }
  }

  loginUser(credentials: LoginCredentials): Observable<AuthenticationResponse> {
    return this.login(credentials).pipe(
      tap(response => {
        if (response.token) {
          this.authService.setToken(response.token);
          this.currentUserSubject.next(response.user as User);
          this.router.navigate(['/dashboard']);
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  registerUser(userData: Partial<User>): Observable<User> {
    return this.register(userData as User).pipe(
      tap(user => {
        console.log('User registered successfully:', user);
        // Optionally auto-login after registration
      })
    );
  }

  logoutUser(): void {
    this.authService.removeToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private loadCurrentUser(): void {
    const token = this.authService.getToken();
    if (token.id) {
      this.getCurrentUser(token.id).subscribe({
        next: user => this.currentUserSubject.next(user),
        error: () => this.logoutUser() // Token invalid
      });
    }
  }

  isAuthenticated(): boolean {
    const token = this.authService.getToken();
    return !!token.id;
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
```

### Login Component
```typescript
// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Email:</label>
        <input type="email" formControlName="email" required>
        <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
          Email is required
        </div>
      </div>
      
      <div>
        <label>Password:</label>
        <input type="password" formControlName="password" required>
        <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
          Password is required
        </div>
      </div>
      
      <button type="submit" [disabled]="loginForm.invalid || isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
      
      <div *ngIf="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </form>
    
    <p>
      <a (click)="forgotPassword()">Forgot Password?</a>
    </p>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthApiService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          // Navigation handled in service
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed';
        }
      });
    }
  }

  forgotPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (email) {
      this.authService.passwordRecovery(email).subscribe({
        next: () => alert('Password recovery email sent'),
        error: (error) => alert('Failed to send recovery email')
      });
    } else {
      alert('Please enter your email address first');
    }
  }
}
```

### Authentication Guard
```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthApiService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthApiService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

## CRUD Operations

### User Management Service
```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService, BaseModel } from '@tyris/angular-foundation';

interface User extends BaseModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig('https://api.example.com', 'users');
  }

  // Get users with pagination
  getUsersPaginated(page: number = 1, limit: number = 10): Observable<User[]> {
    return this.getAll({ 
      'X-Page': page.toString(), 
      'X-Limit': limit.toString() 
    });
  }

  // Get active users only
  getActiveUsers(): Observable<User[]> {
    return this.getAll({ 'X-Filter': 'active:true' });
  }

  // Update user status
  updateUserStatus(userId: string, isActive: boolean): Observable<User> {
    return this.update(userId, { isActive });
  }

  // Deactivate user instead of delete
  deactivateUser(userId: string): Observable<User> {
    return this.updateUserStatus(userId, false);
  }

  // Custom search
  searchUsers(query: string): Observable<User[]> {
    return this.getAll({ 'X-Search': query });
  }
}
```

### User List Component
```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <h2>User Management</h2>
      
      <div class="actions">
        <input 
          type="text" 
          placeholder="Search users..." 
          [(ngModel)]="searchQuery"
          (input)="onSearch()">
        <button (click)="loadUsers()">Refresh</button>
        <button (click)="addUser()">Add User</button>
      </div>
      
      <div *ngIf="loading">Loading users...</div>
      
      <table *ngIf="!loading">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <span [class.active]="user.isActive" [class.inactive]="!user.isActive">
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <button (click)="editUser(user)">Edit</button>
              <button (click)="toggleUserStatus(user)">
                {{ user.isActive ? 'Deactivate' : 'Activate' }}
              </button>
              <button (click)="deleteUser(user)" [disabled]="!canDelete(user)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="pagination" *ngIf="!loading">
        <button (click)="previousPage()" [disabled]="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }}</span>
        <button (click)="nextPage()" [disabled]="users.length < pageSize">
          Next
        </button>
      </div>
    </div>
  `,
  styles: [`
    .user-list { padding: 20px; }
    .actions { margin-bottom: 20px; }
    .actions input, .actions button { margin-right: 10px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
    .active { color: green; }
    .inactive { color: red; }
    .pagination { margin-top: 20px; }
    .pagination button { margin-right: 10px; }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  searchQuery = '';
  currentPage = 1;
  pageSize = 10;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsersPaginated(this.currentPage, this.pageSize)
      .subscribe({
        next: (users) => {
          this.users = users;
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to load users:', error);
          this.loading = false;
        }
      });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.userService.searchUsers(this.searchQuery).subscribe({
        next: (users) => {
          this.users = users;
          this.loading = false;
        },
        error: (error) => {
          console.error('Search failed:', error);
          this.loading = false;
        }
      });
    } else {
      this.loadUsers();
    }
  }

  editUser(user: User): void {
    // Navigate to edit form or open modal
    console.log('Edit user:', user);
  }

  addUser(): void {
    // Navigate to add form or open modal
    console.log('Add new user');
  }

  toggleUserStatus(user: User): void {
    this.userService.updateUserStatus(user.id, !user.isActive).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      },
      error: (error) => {
        console.error('Failed to update user status:', error);
      }
    });
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      this.userService.delete(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
        },
        error: (error) => {
          console.error('Failed to delete user:', error);
        }
      });
    }
  }

  canDelete(user: User): boolean {
    // Add business logic for deletion permissions
    return user.role !== 'admin' || this.users.filter(u => u.role === 'admin').length > 1;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.loadUsers();
  }
}
```

## Custom Services

### Product Service with Custom Endpoints
```typescript
// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService, BaseModel } from '@tyris/angular-foundation';

interface Product extends BaseModel {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  inStock: boolean;
  tags: string[];
}

interface ProductCategory extends BaseModel {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {
  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig('https://api.example.com', 'products');
  }

  // Get products by category
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    const options = this.createHttpHeaders();
    return this.http.get<Product[]>(`${this.url}/${this.endpoint}/category/${categoryId}`, options);
  }

  // Get featured products
  getFeaturedProducts(): Observable<Product[]> {
    const options = this.createHttpHeaders();
    return this.http.get<Product[]>(`${this.url}/${this.endpoint}/featured`, options);
  }

  // Search products
  searchProducts(query: string, category?: string): Observable<Product[]> {
    const headers = this.createHttpHeaders({
      'X-Search-Query': query,
      ...(category && { 'X-Category': category })
    });
    return this.http.get<Product[]>(`${this.url}/${this.endpoint}/search`, headers);
  }

  // Update product stock
  updateStock(productId: string, quantity: number): Observable<Product> {
    const options = this.createHttpHeaders();
    return this.http.patch<Product>(
      `${this.url}/${this.endpoint}/${productId}/stock`, 
      { quantity }, 
      options
    );
  }

  // Bulk operations
  bulkUpdatePrices(updates: Array<{id: string, price: number}>): Observable<Product[]> {
    const options = this.createHttpHeaders();
    return this.http.post<Product[]>(`${this.url}/${this.endpoint}/bulk-price-update`, updates, options);
  }

  // Get product analytics
  getProductAnalytics(productId: string, dateRange: {start: Date, end: Date}): Observable<any> {
    const options = this.createHttpHeaders({
      'X-Start-Date': dateRange.start.toISOString(),
      'X-End-Date': dateRange.end.toISOString()
    });
    return this.http.get(`${this.url}/${this.endpoint}/${productId}/analytics`, options);
  }
}

// Category service
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<ProductCategory> {
  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig('https://api.example.com', 'categories');
  }

  getActiveCategories(): Observable<ProductCategory[]> {
    return this.getAll({ 'X-Status': 'active' });
  }
}
```

## Storage Examples

### User Preferences Service
```typescript
// preferences.service.ts
import { Injectable } from '@angular/core';
import { LocalStorageHandler, CookieHandler } from '@tyris/angular-foundation';
import { BehaviorSubject } from 'rxjs';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  layout: {
    sidebarCollapsed: boolean;
    gridView: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private defaultPreferences: UserPreferences = {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    layout: {
      sidebarCollapsed: false,
      gridView: true
    }
  };

  private preferencesSubject = new BehaviorSubject<UserPreferences>(this.defaultPreferences);
  public preferences$ = this.preferencesSubject.asObservable();

  constructor(
    private localStorage: LocalStorageHandler,
    private cookieHandler: CookieHandler
  ) {
    this.loadPreferences();
  }

  private loadPreferences(): void {
    // Try localStorage first (persists across sessions)
    let prefs = this.localStorage.get('user_preferences') as UserPreferences;
    
    if (!prefs) {
      // Fallback to cookies
      prefs = this.cookieHandler.get('user_preferences') as UserPreferences;
    }

    if (prefs) {
      this.preferencesSubject.next({ ...this.defaultPreferences, ...prefs });
    }
  }

  updatePreferences(preferences: Partial<UserPreferences>): void {
    const currentPrefs = this.preferencesSubject.value;
    const newPrefs = { ...currentPrefs, ...preferences };
    
    // Save to both storage mechanisms
    this.localStorage.set('user_preferences', newPrefs);
    
    // Also save to cookies with 30-day expiration for cross-device sync
    const thirtyDays = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
    this.cookieHandler.set('user_preferences', newPrefs, thirtyDays);
    
    this.preferencesSubject.next(newPrefs);
  }

  updateTheme(theme: 'light' | 'dark'): void {
    this.updatePreferences({ theme });
  }

  updateLanguage(language: string): void {
    this.updatePreferences({ language });
  }

  toggleSidebar(): void {
    const currentPrefs = this.preferencesSubject.value;
    this.updatePreferences({
      layout: {
        ...currentPrefs.layout,
        sidebarCollapsed: !currentPrefs.layout.sidebarCollapsed
      }
    });
  }

  updateNotificationSettings(notifications: Partial<UserPreferences['notifications']>): void {
    const currentPrefs = this.preferencesSubject.value;
    this.updatePreferences({
      notifications: {
        ...currentPrefs.notifications,
        ...notifications
      }
    });
  }

  resetToDefaults(): void {
    this.localStorage.remove('user_preferences');
    this.cookieHandler.remove('user_preferences');
    this.preferencesSubject.next(this.defaultPreferences);
  }

  getCurrentPreferences(): UserPreferences {
    return this.preferencesSubject.value;
  }
}
```

### Session Management
```typescript
// session.service.ts
import { Injectable } from '@angular/core';
import { LocalStorageHandler, AuthService } from '@tyris/angular-foundation';
import { interval, Subscription } from 'rxjs';

interface SessionData {
  lastActivity: Date;
  sessionStart: Date;
  activityCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimer?: Subscription;
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private readonly ACTIVITY_CHECK_INTERVAL = 60 * 1000; // 1 minute

  constructor(
    private localStorage: LocalStorageHandler,
    private authService: AuthService
  ) {
    this.initializeSession();
    this.startSessionMonitoring();
  }

  private initializeSession(): void {
    const existingSession = this.localStorage.get('session_data') as SessionData;
    
    if (!existingSession || this.isSessionExpired(existingSession)) {
      this.startNewSession();
    } else {
      this.updateActivity();
    }
  }

  private startNewSession(): void {
    const sessionData: SessionData = {
      lastActivity: new Date(),
      sessionStart: new Date(),
      activityCount: 1
    };
    
    this.localStorage.set('session_data', sessionData);
  }

  private isSessionExpired(session: SessionData): boolean {
    const now = new Date().getTime();
    const lastActivity = new Date(session.lastActivity).getTime();
    return (now - lastActivity) > this.SESSION_TIMEOUT;
  }

  updateActivity(): void {
    const sessionData = this.localStorage.get('session_data') as SessionData;
    
    if (sessionData) {
      sessionData.lastActivity = new Date();
      sessionData.activityCount++;
      this.localStorage.set('session_data', sessionData);
    }
  }

  private startSessionMonitoring(): void {
    this.sessionTimer = interval(this.ACTIVITY_CHECK_INTERVAL).subscribe(() => {
      const sessionData = this.localStorage.get('session_data') as SessionData;
      
      if (sessionData && this.isSessionExpired(sessionData)) {
        this.expireSession();
      }
    });
  }

  private expireSession(): void {
    this.localStorage.remove('session_data');
    this.authService.removeToken();
    
    // Notify user about session expiration
    alert('Your session has expired. Please log in again.');
    
    // Redirect to login
    window.location.href = '/login';
  }

  getSessionInfo(): SessionData | null {
    return this.localStorage.get('session_data') as SessionData;
  }

  getRemainingTime(): number {
    const sessionData = this.getSessionInfo();
    
    if (!sessionData) return 0;
    
    const now = new Date().getTime();
    const lastActivity = new Date(sessionData.lastActivity).getTime();
    const remaining = this.SESSION_TIMEOUT - (now - lastActivity);
    
    return Math.max(0, remaining);
  }

  extendSession(): void {
    this.updateActivity();
  }

  endSession(): void {
    this.localStorage.remove('session_data');
    this.authService.removeToken();
    
    if (this.sessionTimer) {
      this.sessionTimer.unsubscribe();
    }
  }
}
```

## Advanced Patterns

### Repository Pattern Implementation
```typescript
// repository.interface.ts
export interface Repository<T> {
  getAll(): Observable<T[]>;
  getById(id: string): Observable<T>;
  create(entity: T): Observable<T>;
  update(id: string, entity: Partial<T>): Observable<T>;
  delete(id: string): Observable<void>;
}

// base.repository.ts
import { Observable } from 'rxjs';
import { BaseService, BaseModel } from '@tyris/angular-foundation';

export abstract class BaseRepository<T extends BaseModel> implements Repository<T> {
  constructor(protected service: BaseService<T>) {}

  getAll(): Observable<T[]> {
    return this.service.getAll();
  }

  getById(id: string): Observable<T> {
    return this.service.getById(id);
  }

  create(entity: T): Observable<T> {
    return this.service.create(entity);
  }

  update(id: string, entity: Partial<T>): Observable<T> {
    return this.service.update(id, entity as T);
  }

  delete(id: string): Observable<void> {
    return this.service.delete(id);
  }
}

// user.repository.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserRepository extends BaseRepository<User> {
  constructor(private userService: UserService) {
    super(userService);
  }

  // Additional repository methods
  findByEmail(email: string): Observable<User[]> {
    return this.userService.searchUsers(email);
  }

  getActiveUsers(): Observable<User[]> {
    return this.userService.getActiveUsers();
  }
}
```

### State Management Integration
```typescript
// auth.state.ts (NgRx example)
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthApiService } from './auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.loginUser(action.credentials).pipe(
          map(response => AuthActions.loginSuccess({ user: response.user })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.authService.logoutUser()),
      map(() => AuthActions.logoutSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthApiService,
    private store: Store
  ) {}
}
```

## Error Handling

### Global Error Handler
```typescript
// global-error.handler.ts
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      // HTTP errors are already handled by ErrorInterceptor
      console.error('HTTP Error caught by Global Handler:', error);
    } else {
      // Handle client-side errors
      console.error('Client Error:', error);
      
      // Send to logging service
      this.logError(error);
      
      // Show user-friendly message
      this.showErrorMessage('An unexpected error occurred');
    }
  }

  private logError(error: any): void {
    // Send to logging service like Sentry, LogRocket, etc.
    // Example: this.loggingService.logError(error);
  }

  private showErrorMessage(message: string): void {
    // Show toast, snackbar, or modal
    // Example: this.notificationService.showError(message);
  }
}

// Register in app.module.ts
@NgModule({
  // ...
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
export class AppModule { }
```

### Retry Logic with Exponential Backoff
```typescript
// retry.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, finalize, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetryService {
  retryWithBackoff<T>(
    source: Observable<T>, 
    maxRetries: number = 3, 
    baseDelay: number = 1000
  ): Observable<T> {
    return source.pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            if (index >= maxRetries) {
              return throwError(error);
            }
            
            const delay = baseDelay * Math.pow(2, index);
            console.log(`Retrying in ${delay}ms... (attempt ${index + 1}/${maxRetries})`);
            
            return timer(delay);
          })
        )
      )
    );
  }
}

// Usage example
export class DataService {
  constructor(
    private userService: UserService,
    private retryService: RetryService
  ) {}

  getUsersWithRetry(): Observable<User[]> {
    return this.retryService.retryWithBackoff(
      this.userService.getAll(),
      3, // max retries
      1000 // base delay
    );
  }
}
```

## Testing Examples

### Service Testing
```typescript
// auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthApiService } from './auth.service';
import { AuthService } from '@tyris/angular-foundation';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['setToken', 'removeToken', 'getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthApiService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login user successfully', () => {
    const mockCredentials = { email: 'test@example.com', password: 'password' };
    const mockResponse = { token: 'mock-token', user: { id: '1', email: 'test@example.com' } };

    service.loginUser(mockCredentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(authService.setToken).toHaveBeenCalledWith('mock-token');
    });

    const req = httpMock.expectOne('https://api.example.com/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);
    req.flush(mockResponse);
  });

  it('should handle login failure', () => {
    const mockCredentials = { email: 'test@example.com', password: 'wrong-password' };
    const mockError = { message: 'Invalid credentials' };

    service.loginUser(mockCredentials).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(authService.setToken).not.toHaveBeenCalled();
      }
    });

    const req = httpMock.expectOne('https://api.example.com/auth/login');
    req.flush(mockError, { status: 401, statusText: 'Unauthorized' });
  });
});
```

### Component Testing with Authentication
```typescript
// login.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthApiService } from './auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthApiService', ['loginUser', 'passwordRecovery']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthApiService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthApiService) as jasmine.SpyObj<AuthApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockResponse = { token: 'mock-token' };
    authService.loginUser.and.returnValue(of(mockResponse));

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password'
    });

    component.onSubmit();

    expect(authService.loginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    });
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBe('');
  });

  it('should handle login error', () => {
    const mockError = { error: { message: 'Invalid credentials' } };
    authService.loginUser.and.returnValue(throwError(mockError));

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'wrong-password'
    });

    component.onSubmit();

    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBe('Invalid credentials');
  });

  it('should send password recovery email', () => {
    authService.passwordRecovery.and.returnValue(of({ success: true }));
    spyOn(window, 'alert');

    component.loginForm.patchValue({ email: 'test@example.com' });
    component.forgotPassword();

    expect(authService.passwordRecovery).toHaveBeenCalledWith('test@example.com');
    expect(window.alert).toHaveBeenCalledWith('Password recovery email sent');
  });
});
```

### Mock Storage for Testing
```typescript
// mock-storage.ts
import { BaseStorage, StorageValue } from '@tyris/angular-foundation';

export class MockStorage extends BaseStorage {
  private storage = new Map<string, StorageValue>();

  get(key: string): StorageValue {
    return this.storage.get(key) || null;
  }

  set(key: string, value: StorageValue, expires?: Date): void {
    this.storage.set(key, value);
    if (expires) {
      this.storage.set(key + '_expires', expires.getTime());
    }
  }

  remove(key: string): void {
    this.storage.delete(key);
    this.storage.delete(key + '_expires');
  }

  clear(): void {
    this.storage.clear();
  }
}

// Usage in tests
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      { provide: LocalStorageHandler, useClass: MockStorage },
      { provide: CookieHandler, useClass: MockStorage }
    ]
  });
});
```

This comprehensive documentation provides real-world examples and patterns for using the Closca Angular Base Library effectively in various scenarios.