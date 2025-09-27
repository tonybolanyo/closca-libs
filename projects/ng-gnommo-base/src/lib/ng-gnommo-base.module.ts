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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class NgGnommoBaseModule {
  
  static forRoot(): ModuleWithProviders<NgGnommoBaseModule> {
    return {
      ngModule: NgGnommoBaseModule,
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