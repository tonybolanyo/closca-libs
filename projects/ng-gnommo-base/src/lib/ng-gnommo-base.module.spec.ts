import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgGnommoBaseModule } from './ng-gnommo-base.module';
import { AuthService } from './services/core/auth.service';
import { LoginBaseService } from './services/core/login-base.service';
import { CookieStorage, WebLocalStorage } from './storage/storage.handler';

describe('NgGnommoBaseModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgGnommoBaseModule.forRoot()
      ]
    });
  });

  it('should provide AuthService', () => {
    const service = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });

  it('should provide LoginBaseService', () => {
    const service = TestBed.inject(LoginBaseService);
    expect(service).toBeTruthy();
  });

  it('should provide CookieStorage', () => {
    const service = TestBed.inject(CookieStorage);
    expect(service).toBeTruthy();
  });

  it('should provide WebLocalStorage', () => {
    const service = TestBed.inject(WebLocalStorage);
    expect(service).toBeTruthy();
  });
});