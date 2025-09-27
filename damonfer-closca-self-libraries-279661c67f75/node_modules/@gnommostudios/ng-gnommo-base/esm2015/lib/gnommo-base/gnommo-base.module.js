/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BaseService } from './services/core/base.service';
import { AuthService } from './services/core/auth.service';
import { LoginBaseService } from './services/core/login-base.service';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { WebLocalStorage, CookieStorage } from './storage/storage.handler';
import { LocalStorageHandler } from './storage/local-storage.handler';
import { CookieHandler } from './storage/cookie.handler';
export class GnommoBaseModule {
    /**
     * @param {?} __0
     * @return {?}
     */
    static forRoot({}) {
        return {
            ngModule: GnommoBaseModule,
            providers: [
                BaseService,
                AuthService,
                LoginBaseService,
                // // Interceptors
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                // // Storage
                { provide: WebLocalStorage, useClass: LocalStorageHandler },
                { provide: CookieStorage, useClass: CookieHandler }
            ]
        };
    }
}
GnommoBaseModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, HttpClientModule],
            },] },
];
// export * from './interfaces';
// export * from './helpers';
// export * from './models';
// export * from './services';
// export * from './storage';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ25vbW1vLWJhc2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdub21tb3N0dWRpb3MvbmctZ25vbW1vLWJhc2UvIiwic291cmNlcyI6WyJsaWIvZ25vbW1vLWJhc2UvZ25vbW1vLWJhc2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUt6RCxNQUFNOzs7OztJQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRztRQUNoQixNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRTtnQkFFUixXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsZ0JBQWdCOztnQkFHakIsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUN0RSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTs7Z0JBR3ZFLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7Z0JBQzNELEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFO2FBRXBEO1NBQ0YsQ0FBQztLQUNIOzs7WUF2QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQzthQUMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG4vLyBpbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IsIEVycm9ySW50ZXJjZXB0b3IgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9naW5CYXNlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29yZS9sb2dpbi1iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aEludGVyY2VwdG9yIH0gZnJvbSAnLi9oZWxwZXJzL2F1dGguaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgRXJyb3JJbnRlcmNlcHRvciB9IGZyb20gJy4vaGVscGVycy9lcnJvci5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBXZWJMb2NhbFN0b3JhZ2UsIENvb2tpZVN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5oYW5kbGVyJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZUhhbmRsZXIgfSBmcm9tICcuL3N0b3JhZ2UvbG9jYWwtc3RvcmFnZS5oYW5kbGVyJztcbmltcG9ydCB7IENvb2tpZUhhbmRsZXIgfSBmcm9tICcuL3N0b3JhZ2UvY29va2llLmhhbmRsZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgR25vbW1vQmFzZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KHsgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogR25vbW1vQmFzZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAvLyBTZXJ2aWNlc1xuICAgICAgICAgQmFzZVNlcnZpY2UsXG4gICAgICAgICBBdXRoU2VydmljZSxcbiAgICAgICAgIExvZ2luQmFzZVNlcnZpY2UsXG5cbiAgICAgICAgLy8gLy8gSW50ZXJjZXB0b3JzXG4gICAgICAgIHsgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBBdXRoSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgIHsgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBFcnJvckludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9LFxuXG4gICAgICAgIC8vIC8vIFN0b3JhZ2VcbiAgICAgICAgeyBwcm92aWRlOiBXZWJMb2NhbFN0b3JhZ2UsIHVzZUNsYXNzOiBMb2NhbFN0b3JhZ2VIYW5kbGVyIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ29va2llU3RvcmFnZSwgdXNlQ2xhc3M6IENvb2tpZUhhbmRsZXIgfVxuXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG4vLyBleHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZXMnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9oZWxwZXJzJztcbi8vIGV4cG9ydCAqIGZyb20gJy4vbW9kZWxzJztcbi8vIGV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9zdG9yYWdlJztcblxuIl19