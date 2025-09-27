import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { BaseService } from './services/core/base.service';
import { AuthService } from './services/core/auth.service';
import { LoginBaseService } from './services/core/login-base.service';

// Interceptors
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

// Storage
import { WebLocalStorage, CookieStorage } from './storage/storage.handler';
import { LocalStorageHandler } from './storage/local-storage.handler';
import { CookieHandler } from './storage/cookie.handler';

/**
 * AngularFoundationModule provides core functionality for Angular applications.
 * 
 * This module includes authentication services, HTTP interceptors, storage handlers,
 * and base services for CRUD operations. It provides a complete foundation for
 * Angular applications that need authentication and API communication capabilities.
 * 
 * ## Features Included:
 * - Authentication token management
 * - HTTP request/response interceptors
 * - Storage abstractions (localStorage, cookies)
 * - Base services for CRUD operations
 * - Type-safe interfaces and models
 * 
 * @example
 * ```typescript
 * import { AngularFoundationModule } from '@tyris/angular-foundation';
 * 
 * @NgModule({
 *   imports: [
 *     AngularFoundationModule.forRoot()
 *   ],
 *   // ...
 * })
 * export class AppModule { }
 * ```
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AngularFoundationModule {
  /**
   * Configures the AngularFoundationModule with providers and interceptors.
   * 
   * This static method should be called when importing the module in your
   * application's root module. It configures all the necessary providers,
   * HTTP interceptors, and storage handlers.
   * 
   * ## Configured Providers:
   * - AuthService: Authentication token management
   * - LoginBaseService: Authentication operations (login, register, etc.)
   * - AuthInterceptor: Automatic token injection
   * - ErrorInterceptor: Centralized error handling
   * - LocalStorageHandler: Browser localStorage wrapper
   * - CookieHandler: Browser cookie wrapper
   * 
   * @static
   * @returns {ModuleWithProviders<AngularFoundationModule>} Module with providers configuration
   * 
   * @example
   * ```typescript
   * @NgModule({
   *   imports: [
   *     BrowserModule,
   *     AngularFoundationModule.forRoot()
   *   ],
   *   // ...
   * })
   * export class AppModule { }
   * ```
   */
  static forRoot(): ModuleWithProviders<AngularFoundationModule> {
    return {
      ngModule: AngularFoundationModule,
      providers: [
        // Services
        AuthService,
        LoginBaseService,
        
        // Interceptors
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
        
        // Storage
        {
          provide: WebLocalStorage,
          useClass: LocalStorageHandler
        },
        {
          provide: CookieStorage,
          useClass: CookieHandler
        }
      ]
    };
  }
}