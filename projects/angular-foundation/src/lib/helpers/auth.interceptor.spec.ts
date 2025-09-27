import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthInterceptor, InterceptorSkipHeader } from './auth.interceptor';
import { AuthService } from '../services/core/auth.service';
import { AuthToken } from '../models/auth-token.model';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    // Create spy for AuthService
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    interceptor = TestBed.inject(AuthInterceptor);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Interceptor Creation and Setup', () => {
    it('should be created', () => {
      expect(interceptor).toBeTruthy();
      expect(interceptor).toBeInstanceOf(AuthInterceptor);
    });

    it('should inject AuthService correctly', () => {
      expect(authService).toBeTruthy();
      // Verify that interceptor has access to auth service
      const interceptorAny = interceptor as any;
      expect(interceptorAny.authService).toBe(authService);
    });

    it('should be registered as HTTP interceptor', () => {
      // This is verified by the fact that it intercepts HTTP requests in tests below
      expect(interceptor).toBeDefined();
    });
  });

  describe('Skip Header Functionality', () => {
    it('should define InterceptorSkipHeader constant', () => {
      expect(InterceptorSkipHeader).toBeDefined();
      expect(typeof InterceptorSkipHeader).toBe('string');
      expect(InterceptorSkipHeader).toBe('X-Skip-Interceptor');
    });

    it('should skip interceptor when skip header is present', () => {
      // Setup: no token to ensure we test skip functionality, not token logic
      authService.getToken.and.returnValue(new AuthToken());

      httpClient.get('/api/test', {
        headers: { [InterceptorSkipHeader]: 'true' }
      }).subscribe();

      const req = httpMock.expectOne('/api/test');
      
      // Verify that the skip header is removed
      expect(req.request.headers.has(InterceptorSkipHeader)).toBe(false);
      
      // Verify that no Authorization header is added (because we skipped)
      expect(req.request.headers.has('Authorization')).toBe(false);
      
      // Verify authService.getToken was not called due to skip
      expect(authService.getToken).not.toHaveBeenCalled();
      
      req.flush({ data: 'test' });
    });

    it('should process multiple headers correctly when skip header is present', () => {
      httpClient.get('/api/test', {
        headers: {
          [InterceptorSkipHeader]: 'true',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).subscribe();

      const req = httpMock.expectOne('/api/test');
      
      // Skip header should be removed
      expect(req.request.headers.has(InterceptorSkipHeader)).toBe(false);
      // Other headers should remain
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Accept')).toBe('application/json');
      
      req.flush({ data: 'test' });
    });

    it('should handle skip header with different values', () => {
      const testValues = ['true', 'false', '1', '0', 'skip', ''];

      testValues.forEach((value, index) => {
        httpClient.get(`/api/test${index}`, {
          headers: { [InterceptorSkipHeader]: value }
        }).subscribe();

        const req = httpMock.expectOne(`/api/test${index}`);
        
        // Regardless of value, if header is present, it should skip
        expect(req.request.headers.has(InterceptorSkipHeader)).toBe(false);
        expect(req.request.headers.has('Authorization')).toBe(false);
        
        req.flush({ data: `test${index}` });
      });
    });
  });

  describe('Authorization Token Injection', () => {
    it('should add Authorization header when valid token exists', () => {
      const mockToken = new AuthToken({ id: 'test-token-123' });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/protected').subscribe();

      const req = httpMock.expectOne('/api/protected');
      
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token-123');
      expect(authService.getToken).toHaveBeenCalledTimes(1);
      
      req.flush({ data: 'protected data' });
    });

    it('should not add Authorization header when token has no id', () => {
      const mockToken = new AuthToken(); // Empty token
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/public').subscribe();

      const req = httpMock.expectOne('/api/public');
      
      expect(req.request.headers.has('Authorization')).toBe(false);
      expect(authService.getToken).toHaveBeenCalledTimes(1);
      
      req.flush({ data: 'public data' });
    });

    it('should not add Authorization header when token id is empty string', () => {
      const mockToken = new AuthToken({ id: '' });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/endpoint').subscribe();

      const req = httpMock.expectOne('/api/endpoint');
      
      expect(req.request.headers.has('Authorization')).toBe(false);
      expect(authService.getToken).toHaveBeenCalledTimes(1);
      
      req.flush({ data: 'data' });
    });

    it('should not add Authorization header when token id is null', () => {
      const mockToken = new AuthToken({ id: null as any });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/endpoint').subscribe();

      const req = httpMock.expectOne('/api/endpoint');
      
      expect(req.request.headers.has('Authorization')).toBe(false);
      expect(authService.getToken).toHaveBeenCalledTimes(1);
      
      req.flush({ data: 'data' });
    });

    it('should handle token with whitespace-only id', () => {
      const mockToken = new AuthToken({ id: '   ' });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/endpoint').subscribe();

      const req = httpMock.expectOne('/api/endpoint');
      
      // Should add header even with whitespace (real token could have spaces)
      expect(req.request.headers.get('Authorization')).toBe('Bearer    ');
      
      req.flush({ data: 'data' });
    });
  });

  describe('Request Cloning and Modification', () => {
    it('should preserve original headers when adding Authorization', () => {
      const mockToken = new AuthToken({ id: 'test-token' });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/test', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Custom-Header': 'custom-value'
        }
      }).subscribe();

      const req = httpMock.expectOne('/api/test');
      
      // Should have Authorization header
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      
      // Should preserve original headers
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Accept')).toBe('application/json');
      expect(req.request.headers.get('X-Custom-Header')).toBe('custom-value');
      
      req.flush({ data: 'test' });
    });

    it('should override existing Authorization header with token', () => {
      const mockToken = new AuthToken({ id: 'new-token' });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/test', {
        headers: {
          'Authorization': 'Bearer old-token'
        }
      }).subscribe();

      const req = httpMock.expectOne('/api/test');
      
      // Should override with new token
      expect(req.request.headers.get('Authorization')).toBe('Bearer new-token');
      
      req.flush({ data: 'test' });
    });

    it('should preserve request body and method', () => {
      const mockToken = new AuthToken({ id: 'post-token' });
      authService.getToken.and.returnValue(mockToken);

      const requestBody = { name: 'Test', value: 123 };

      httpClient.post('/api/create', requestBody, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe();

      const req = httpMock.expectOne('/api/create');
      
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(requestBody);
      expect(req.request.headers.get('Authorization')).toBe('Bearer post-token');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      
      req.flush({ id: 1, ...requestBody });
    });

    it('should preserve request URL and parameters', () => {
      const mockToken = new AuthToken({ id: 'query-token' });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/search', {
        params: {
          q: 'test query',
          limit: '10',
          offset: '0'
        }
      }).subscribe();

      const req = httpMock.expectOne(request => 
        request.url === '/api/search' && 
        request.params.get('q') === 'test query' &&
        request.params.get('limit') === '10' &&
        request.params.get('offset') === '0'
      );
      
      expect(req.request.headers.get('Authorization')).toBe('Bearer query-token');
      
      req.flush({ results: [] });
    });
  });

  describe('HTTP Methods Support', () => {
    beforeEach(() => {
      const mockToken = new AuthToken({ id: 'method-token' });
      authService.getToken.and.returnValue(mockToken);
    });

    it('should work with GET requests', () => {
      httpClient.get('/api/get').subscribe();

      const req = httpMock.expectOne('/api/get');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer method-token');
      req.flush({ data: 'get' });
    });

    it('should work with POST requests', () => {
      httpClient.post('/api/post', { data: 'test' }).subscribe();

      const req = httpMock.expectOne('/api/post');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe('Bearer method-token');
      req.flush({ id: 1 });
    });

    it('should work with PUT requests', () => {
      httpClient.put('/api/put/1', { data: 'updated' }).subscribe();

      const req = httpMock.expectOne('/api/put/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('Authorization')).toBe('Bearer method-token');
      req.flush({ id: 1, data: 'updated' });
    });

    it('should work with PATCH requests', () => {
      httpClient.patch('/api/patch/1', { field: 'value' }).subscribe();

      const req = httpMock.expectOne('/api/patch/1');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.headers.get('Authorization')).toBe('Bearer method-token');
      req.flush({ id: 1, field: 'value' });
    });

    it('should work with DELETE requests', () => {
      httpClient.delete('/api/delete/1').subscribe();

      const req = httpMock.expectOne('/api/delete/1');
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('Authorization')).toBe('Bearer method-token');
      req.flush(null);
    });

    it('should work with HEAD requests', () => {
      httpClient.head('/api/head').subscribe();

      const req = httpMock.expectOne('/api/head');
      expect(req.request.method).toBe('HEAD');
      expect(req.request.headers.get('Authorization')).toBe('Bearer method-token');
      req.flush(null);
    });

    it('should work with OPTIONS requests', () => {
      httpClient.options('/api/options').subscribe();

      const req = httpMock.expectOne('/api/options');
      expect(req.request.method).toBe('OPTIONS');
      expect(req.request.headers.get('Authorization')).toBe('Bearer method-token');
      req.flush({});
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle authService.getToken throwing error', () => {
      authService.getToken.and.throwError('Auth service error');

      httpClient.get('/api/test').subscribe();

      const req = httpMock.expectOne('/api/test');
      
      // Should not have Authorization header when getToken fails
      expect(req.request.headers.has('Authorization')).toBe(false);
      
      req.flush({ data: 'test' });
    });

    it('should handle authService returning null/undefined', () => {
      authService.getToken.and.returnValue(null as any);

      httpClient.get('/api/test').subscribe();

      const req = httpMock.expectOne('/api/test');
      
      // Should not crash and should not add Authorization header
      expect(req.request.headers.has('Authorization')).toBe(false);
      
      req.flush({ data: 'test' });
    });

    it('should handle multiple concurrent requests', () => {
      const mockToken = new AuthToken({ id: 'concurrent-token' });
      authService.getToken.and.returnValue(mockToken);

      // Make multiple concurrent requests
      httpClient.get('/api/test1').subscribe();
      httpClient.get('/api/test2').subscribe();
      httpClient.post('/api/test3', {}).subscribe();

      const req1 = httpMock.expectOne('/api/test1');
      const req2 = httpMock.expectOne('/api/test2');
      const req3 = httpMock.expectOne('/api/test3');

      // All should have Authorization header
      expect(req1.request.headers.get('Authorization')).toBe('Bearer concurrent-token');
      expect(req2.request.headers.get('Authorization')).toBe('Bearer concurrent-token');
      expect(req3.request.headers.get('Authorization')).toBe('Bearer concurrent-token');

      req1.flush({ data: '1' });
      req2.flush({ data: '2' });
      req3.flush({ data: '3' });
    });

    it('should handle requests with empty URLs', () => {
      const mockToken = new AuthToken({ id: 'empty-url-token' });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('').subscribe();

      const req = httpMock.expectOne('');
      expect(req.request.headers.get('Authorization')).toBe('Bearer empty-url-token');
      req.flush({});
    });

    it('should handle very long token IDs', () => {
      const longToken = 'a'.repeat(2000); // Very long token
      const mockToken = new AuthToken({ id: longToken });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/test').subscribe();

      const req = httpMock.expectOne('/api/test');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${longToken}`);
      req.flush({ data: 'test' });
    });

    it('should handle special characters in token ID', () => {
      const specialToken = 'token-with.special+characters_123/456=789';
      const mockToken = new AuthToken({ id: specialToken });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/test').subscribe();

      const req = httpMock.expectOne('/api/test');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${specialToken}`);
      req.flush({ data: 'test' });
    });
  });

  describe('Compatibility with Old Library Behavior', () => {
    it('should maintain same Authorization header format as old library', () => {
      const mockToken = new AuthToken({ id: 'compatibility-token' });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/test').subscribe();

      const req = httpMock.expectOne('/api/test');
      
      // Should use "Bearer " prefix exactly as old library did
      expect(req.request.headers.get('Authorization')).toBe('Bearer compatibility-token');
      
      req.flush({ data: 'test' });
    });

    it('should have same skip header name as old library', () => {
      // Verify the constant matches what the old library expected
      expect(InterceptorSkipHeader).toBe('X-Skip-Interceptor');
    });

    it('should handle token structure compatible with old AuthService', () => {
      // Old library token structure
      const oldStyleToken = new AuthToken({
        id: 'old-style-token',
        created: new Date('2023-01-01'),
        ttl: Date.now() + 86400000
      });
      
      authService.getToken.and.returnValue(oldStyleToken);

      httpClient.get('/api/test').subscribe();

      const req = httpMock.expectOne('/api/test');
      expect(req.request.headers.get('Authorization')).toBe('Bearer old-style-token');
      req.flush({ data: 'test' });
    });

    it('should maintain same interceptor precedence as old library', () => {
      // Test that skip header takes priority over token injection
      const mockToken = new AuthToken({ id: 'should-not-appear' });
      authService.getToken.and.returnValue(mockToken);

      httpClient.get('/api/test', {
        headers: { [InterceptorSkipHeader]: 'true' }
      }).subscribe();

      const req = httpMock.expectOne('/api/test');
      
      // Skip should take precedence
      expect(req.request.headers.has('Authorization')).toBe(false);
      expect(req.request.headers.has(InterceptorSkipHeader)).toBe(false);
      
      req.flush({ data: 'test' });
    });
  });

  describe('Integration Testing', () => {
    it('should work correctly in a complete HTTP workflow', () => {
      const mockToken = new AuthToken({ id: 'workflow-token' });
      authService.getToken.and.returnValue(mockToken);

      let responseReceived = false;
      let responseData: any = null;

      // Make request
      httpClient.post('/api/workflow', { input: 'test' }, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(response => {
        responseReceived = true;
        responseData = response;
      });

      // Verify request
      const req = httpMock.expectOne('/api/workflow');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe('Bearer workflow-token');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.body).toEqual({ input: 'test' });

      // Send response
      const mockResponse = { id: 1, output: 'result' };
      req.flush(mockResponse);

      // Verify response handling
      expect(responseReceived).toBe(true);
      expect(responseData).toEqual(mockResponse);
    });
  });
});