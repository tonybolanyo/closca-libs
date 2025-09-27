import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LoginBaseService } from './login-base.service';
import { BaseModel } from '../../models/base.model';
import { 
  LoginCredentials, 
  PasswordRecoveryRequest, 
  PasswordResetRequest, 
  AuthenticationResponse 
} from '../../interfaces/http-types.interface';

// Test implementation of LoginBaseService
interface TestUser extends BaseModel {
  username: string;
  email: string;
  password?: string;
}

class TestLoginService extends LoginBaseService<TestUser> {
  constructor(http: HttpClient) {
    super(http);
    this.initializeConfig('https://api.test.com', 'auth');
  }
}

describe('LoginBaseService', () => {
  let service: TestLoginService;
  let httpMock: HttpTestingController;

  const testUser: TestUser = {
    _id: '123',
    username: 'johndoe',
    email: 'john@example.com'
  };

  const mockAuthResponse: AuthenticationResponse = {
    success: true,
    token: 'jwt-token-123',
    message: 'Login successful',
    user: testUser as any // Cast to satisfy the interface
  };

  const testCredentials: LoginCredentials = {
    email: 'john@example.com',
    password: 'password123'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestLoginService]
    });

    service = TestBed.inject(TestLoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Configuration', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize configuration correctly', () => {
      const newService = new TestLoginService(TestBed.inject(HttpClient));
      newService.initializeConfig('https://new-api.com', 'authentication');
      
      // Access protected properties for testing
      const serviceAny = newService as any;
      expect(serviceAny.url).toBe('https://new-api.com');
      expect(serviceAny.endpoint).toBe('authentication');
    });

    it('should inherit from BaseService', () => {
      expect(service).toBeInstanceOf(LoginBaseService);
      // Should have BaseService methods
      expect(typeof service.getAll).toBe('function');
      expect(typeof service.getById).toBe('function');
      expect(typeof service.create).toBe('function');
      expect(typeof service.update).toBe('function');
      expect(typeof service.delete).toBe('function');
    });
  });

  describe('Authentication Methods', () => {
    describe('login()', () => {
      it('should login with credentials', () => {
        service.login(testCredentials).subscribe(response => {
          expect(response).toEqual(mockAuthResponse);
          expect(response.success).toBe(true);
          expect(response.token).toBe('jwt-token-123');
        });

        const req = httpMock.expectOne('https://api.test.com/auth/login');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(testCredentials);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(mockAuthResponse);
      });

      it('should handle login with custom headers', () => {
        const customHeaders = { 'X-Client-Version': '1.0.0' };
        
        service.login(testCredentials, customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/auth/login');
        expect(req.request.headers.get('X-Client-Version')).toBe('1.0.0');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(mockAuthResponse);
      });

      it('should handle login failure', () => {
        const errorResponse: AuthenticationResponse = {
          success: false,
          message: 'Invalid credentials',
          token: null as any // Cast to allow null
        };

        service.login(testCredentials).subscribe(response => {
          expect(response.success).toBe(false);
          expect(response.message).toBe('Invalid credentials');
          expect(response.token).toBeNull();
        });

        const req = httpMock.expectOne('https://api.test.com/auth/login');
        req.flush(errorResponse);
      });

      it('should handle HTTP error during login', () => {
        service.login(testCredentials).subscribe({
          next: () => fail('Expected error'),
          error: (error) => {
            expect(error.status).toBe(401);
          }
        });

        const req = httpMock.expectOne('https://api.test.com/auth/login');
        req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
      });

      it('should handle different credential formats', () => {
        const usernameCredentials: LoginCredentials = {
          username: 'johndoe',
          password: 'password123'
        };

        service.login(usernameCredentials).subscribe();

        const req = httpMock.expectOne('https://api.test.com/auth/login');
        expect(req.request.body).toEqual(usernameCredentials);
        req.flush(mockAuthResponse);
      });
    });

    describe('passwordRecovery()', () => {
      it('should send password recovery request', () => {
        const email = 'john@example.com';
        const expectedResponse: AuthenticationResponse = {
          success: true,
          message: 'Recovery email sent'
        };

        service.passwordRecovery(email).subscribe(response => {
          expect(response).toEqual(expectedResponse);
        });

        const req = httpMock.expectOne('https://api.test.com/auth/reset');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ email });
        req.flush(expectedResponse);
      });

      it('should handle password recovery with custom headers', () => {
        const email = 'john@example.com';
        const customHeaders = { 'X-Recovery-Source': 'mobile-app' };

        service.passwordRecovery(email, customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/auth/reset');
        expect(req.request.headers.get('X-Recovery-Source')).toBe('mobile-app');
        req.flush({ success: true });
      });

      it('should handle password recovery failure', () => {
        const email = 'nonexistent@example.com';
        const errorResponse: AuthenticationResponse = {
          success: false,
          message: 'Email not found'
        };

        service.passwordRecovery(email).subscribe(response => {
          expect(response.success).toBe(false);
          expect(response.message).toBe('Email not found');
        });

        const req = httpMock.expectOne('https://api.test.com/auth/reset');
        req.flush(errorResponse);
      });
    });

    describe('resetPassword()', () => {
      it('should reset password with hash', () => {
        const newPassword = 'newPassword123';
        const hash = 'reset-hash-abc123';
        const expectedResponse: AuthenticationResponse = {
          success: true,
          message: 'Password reset successful'
        };

        service.resetPassword(newPassword, hash).subscribe(response => {
          expect(response).toEqual(expectedResponse);
        });

        const req = httpMock.expectOne('https://api.test.com/auth/reset-password');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ newPassword, hash });
        req.flush(expectedResponse);
      });

      it('should handle reset password with custom headers', () => {
        const newPassword = 'newPassword123';
        const hash = 'reset-hash-abc123';
        const customHeaders = { 'X-Reset-Client': 'web' };

        service.resetPassword(newPassword, hash, customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/auth/reset-password');
        expect(req.request.headers.get('X-Reset-Client')).toBe('web');
        req.flush({ success: true });
      });

      it('should handle invalid reset hash', () => {
        const newPassword = 'newPassword123';
        const invalidHash = 'invalid-hash';
        const errorResponse: AuthenticationResponse = {
          success: false,
          message: 'Invalid or expired reset hash'
        };

        service.resetPassword(newPassword, invalidHash).subscribe(response => {
          expect(response.success).toBe(false);
          expect(response.message).toBe('Invalid or expired reset hash');
        });

        const req = httpMock.expectOne('https://api.test.com/auth/reset-password');
        req.flush(errorResponse);
      });
    });

    describe('getCurrentUser()', () => {
      it('should get current user with token', () => {
        const token = 'jwt-token-123';

        service.getCurrentUser(token).subscribe(user => {
          expect(user).toEqual(testUser);
        });

        const req = httpMock.expectOne('https://api.test.com/auth/me');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(testUser);
      });

      it('should handle getCurrentUser with custom headers', () => {
        const token = 'jwt-token-123';
        const customHeaders = { 'Authorization': `Bearer ${token}` };

        service.getCurrentUser(token, customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/auth/me');
        expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token-123');
        req.flush(testUser);
      });

      it('should handle unauthorized getCurrentUser', () => {
        const token = 'invalid-token';

        service.getCurrentUser(token).subscribe({
          next: () => fail('Expected error'),
          error: (error) => {
            expect(error.status).toBe(401);
          }
        });

        const req = httpMock.expectOne('https://api.test.com/auth/me');
        req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
      });
    });

    describe('register()', () => {
      it('should register new user', () => {
        const newUser: TestUser = {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123'
        };

        const registeredUser: TestUser = {
          ...newUser,
          _id: '456'
        };

        service.register(newUser).subscribe(user => {
          expect(user).toEqual(registeredUser);
          expect(user._id).toBe('456');
        });

        const req = httpMock.expectOne('https://api.test.com/auth/register');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newUser);
        req.flush(registeredUser);
      });

      it('should handle registration with custom headers', () => {
        const newUser: TestUser = {
          username: 'newuser',
          email: 'newuser@example.com'
        };
        const customHeaders = { 'X-Registration-Source': 'social-media' };

        service.register(newUser, customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/auth/register');
        expect(req.request.headers.get('X-Registration-Source')).toBe('social-media');
        req.flush({ ...newUser, _id: '456' });
      });

      it('should handle registration validation errors', () => {
        const invalidUser: TestUser = {
          username: '',
          email: 'invalid-email'
        };

        service.register(invalidUser).subscribe({
          next: () => fail('Expected error'),
          error: (error) => {
            expect(error.status).toBe(400);
          }
        });

        const req = httpMock.expectOne('https://api.test.com/auth/register');
        req.flush('Validation Error', { status: 400, statusText: 'Bad Request' });
      });

      it('should handle duplicate user registration', () => {
        const existingUser: TestUser = {
          username: 'johndoe',
          email: 'john@example.com'
        };

        service.register(existingUser).subscribe({
          next: () => fail('Expected error'),
          error: (error) => {
            expect(error.status).toBe(409);
          }
        });

        const req = httpMock.expectOne('https://api.test.com/auth/register');
        req.flush('User already exists', { status: 409, statusText: 'Conflict' });
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty credentials in login', () => {
      const emptyCredentials: LoginCredentials = {
        email: '',
        password: ''
      };

      service.login(emptyCredentials).subscribe();

      const req = httpMock.expectOne('https://api.test.com/auth/login');
      expect(req.request.body).toEqual(emptyCredentials);
      req.flush({ success: false, message: 'Invalid credentials' });
    });

    it('should handle null password in resetPassword', () => {
      service.resetPassword('', 'hash123').subscribe();

      const req = httpMock.expectOne('https://api.test.com/auth/reset-password');
      expect(req.request.body).toEqual({ newPassword: '', hash: 'hash123' });
      req.flush({ success: false });
    });

    it('should handle null token in getCurrentUser', () => {
      service.getCurrentUser('').subscribe();

      const req = httpMock.expectOne('https://api.test.com/auth/me');
      req.flush(null);
    });

    it('should handle server errors gracefully', () => {
      service.login(testCredentials).subscribe({
        next: () => fail('Expected error'),
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne('https://api.test.com/auth/login');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('Integration with BaseService', () => {
    it('should have inherited CRUD methods working correctly', () => {
      // Test that inherited methods work
      service.getAll().subscribe(users => {
        expect(Array.isArray(users)).toBe(true);
      });

      const req = httpMock.expectOne('https://api.test.com/auth');
      expect(req.request.method).toBe('GET');
      req.flush([testUser]);
    });

    it('should use same header creation logic as BaseService', () => {
      const customHeaders = {
        'X-Custom': 'value',
        'Accept': ['application/json', 'text/plain']
      };

      service.login(testCredentials, customHeaders).subscribe();

      const req = httpMock.expectOne('https://api.test.com/auth/login');
      expect(req.request.headers.get('X-Custom')).toBe('value');
      expect(req.request.headers.get('Accept')).toBe('application/json, text/plain');
      req.flush(mockAuthResponse);
    });
  });

  describe('URL Construction', () => {
    it('should construct URLs correctly for all methods', () => {
      // Test all authentication endpoints
      service.login(testCredentials).subscribe();
      service.passwordRecovery('test@example.com').subscribe();
      service.resetPassword('newpass', 'hash').subscribe();
      service.getCurrentUser('token').subscribe();
      service.register(testUser).subscribe();

      const requests = httpMock.match(() => true);
      expect(requests.length).toBe(5);
      
      expect(requests[0].request.url).toBe('https://api.test.com/auth/login');
      expect(requests[1].request.url).toBe('https://api.test.com/auth/reset');
      expect(requests[2].request.url).toBe('https://api.test.com/auth/reset-password');
      expect(requests[3].request.url).toBe('https://api.test.com/auth/me');
      expect(requests[4].request.url).toBe('https://api.test.com/auth/register');

      requests.forEach(req => req.flush({}));
    });

    it('should handle trailing slashes in URLs', () => {
      const serviceWithSlash = new TestLoginService(TestBed.inject(HttpClient));
      serviceWithSlash.initializeConfig('https://api.test.com/', 'auth/');

      serviceWithSlash.login(testCredentials).subscribe();

      const req = httpMock.expectOne('https://api.test.com//auth//login');
      req.flush(mockAuthResponse);
    });
  });
});