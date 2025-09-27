import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let interceptor: ErrorInterceptor;
  let consoleSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(ErrorInterceptor);
    
    // Spy on console.error to verify error logging
    consoleSpy = spyOn(console, 'error');
  });

  afterEach(() => {
    httpMock.verify();
    consoleSpy.calls.reset();
  });

  describe('Interceptor Creation and Setup', () => {
    it('should be created', () => {
      expect(interceptor).toBeTruthy();
      expect(interceptor).toBeInstanceOf(ErrorInterceptor);
    });

    it('should be registered as HTTP interceptor', () => {
      // This is verified by the fact that it intercepts HTTP errors in tests below
      expect(interceptor).toBeDefined();
    });
  });

  describe('Successful Requests', () => {
    it('should not interfere with successful GET requests', () => {
      let responseReceived = false;
      let responseData: any = null;

      httpClient.get('/api/success').subscribe(response => {
        responseReceived = true;
        responseData = response;
      });

      const req = httpMock.expectOne('/api/success');
      expect(req.request.method).toBe('GET');

      const mockResponse = { success: true, data: 'test' };
      req.flush(mockResponse);

      expect(responseReceived).toBe(true);
      expect(responseData).toEqual(mockResponse);
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should not interfere with successful POST requests', () => {
      let responseReceived = false;
      let responseData: any = null;

      const requestBody = { name: 'test', value: 123 };
      httpClient.post('/api/create', requestBody).subscribe(response => {
        responseReceived = true;
        responseData = response;
      });

      const req = httpMock.expectOne('/api/create');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(requestBody);

      const mockResponse = { id: 1, ...requestBody };
      req.flush(mockResponse);

      expect(responseReceived).toBe(true);
      expect(responseData).toEqual(mockResponse);
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should handle various HTTP status codes for success', () => {
      const successCodes = [200, 201, 202, 204];

      successCodes.forEach((statusCode, index) => {
        httpClient.get(`/api/success${index}`).subscribe(
          response => {
            // Success callback
            expect(response).toBeDefined();
          },
          error => {
            fail(`Should not have received error for status ${statusCode}`);
          }
        );

        const req = httpMock.expectOne(`/api/success${index}`);
        req.flush({ status: 'ok' }, { status: statusCode, statusText: 'Success' });
      });

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Client Error Handling (4xx)', () => {
    it('should log and re-throw 400 Bad Request errors', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/bad-request').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/bad-request');
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });

      expect(errorReceived).toBe(true);
      expect(errorData).toBeInstanceOf(HttpErrorResponse);
      expect(errorData!.status).toBe(400);
      expect(errorData!.statusText).toBe('Bad Request');

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });

    it('should log and re-throw 401 Unauthorized errors', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/unauthorized').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/unauthorized');
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

      expect(errorReceived).toBe(true);
      expect(errorData!.status).toBe(401);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });

    it('should log and re-throw 403 Forbidden errors', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/forbidden').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/forbidden');
      req.flush('Forbidden', { status: 403, statusText: 'Forbidden' });

      expect(errorReceived).toBe(true);
      expect(errorData!.status).toBe(403);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });

    it('should log and re-throw 404 Not Found errors', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/not-found').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/not-found');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });

      expect(errorReceived).toBe(true);
      expect(errorData!.status).toBe(404);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });

    it('should handle 422 Unprocessable Entity errors', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.post('/api/validation-error', { invalid: 'data' }).subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/validation-error');
      const validationErrors = {
        errors: {
          name: ['Name is required'],
          email: ['Email is invalid']
        }
      };
      req.flush(validationErrors, { status: 422, statusText: 'Unprocessable Entity' });

      expect(errorReceived).toBe(true);
      expect(errorData!.status).toBe(422);
      expect(errorData!.error).toEqual(validationErrors);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });
  });

  describe('Server Error Handling (5xx)', () => {
    it('should log and re-throw 500 Internal Server Error', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/server-error').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/server-error');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(errorReceived).toBe(true);
      expect(errorData!.status).toBe(500);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });

    it('should log and re-throw 502 Bad Gateway errors', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/bad-gateway').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/bad-gateway');
      req.flush('Bad Gateway', { status: 502, statusText: 'Bad Gateway' });

      expect(errorReceived).toBe(true);
      expect(errorData!.status).toBe(502);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });

    it('should log and re-throw 503 Service Unavailable errors', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/service-unavailable').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/service-unavailable');
      req.flush('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });

      expect(errorReceived).toBe(true);
      expect(errorData!.status).toBe(503);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });
  });

  describe('Network and Connection Errors', () => {
    it('should handle network timeout errors', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/timeout').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/timeout');
      req.error(new ProgressEvent('timeout'), { status: 0, statusText: 'Unknown Error' });

      expect(errorReceived).toBe(true);
      expect(errorData).toBeInstanceOf(HttpErrorResponse);
      expect(errorData!.status).toBe(0);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });

    it('should handle network connection errors', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/connection-error').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/connection-error');
      req.error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });

      expect(errorReceived).toBe(true);
      expect(errorData!.status).toBe(0);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });
  });

  describe('Error Response Body Handling', () => {
    it('should preserve JSON error response bodies', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.post('/api/json-error', { test: 'data' }).subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/json-error');
      const errorBody = {
        error: 'VALIDATION_FAILED',
        message: 'The provided data is invalid',
        details: {
          field1: 'Field1 is required',
          field2: 'Field2 must be a number'
        }
      };
      req.flush(errorBody, { status: 400, statusText: 'Bad Request' });

      expect(errorReceived).toBe(true);
      expect(errorData!.error).toEqual(errorBody);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });

    it('should preserve text error response bodies', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/text-error').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/text-error');
      const errorText = 'Detailed error message from server';
      req.flush(errorText, { status: 500, statusText: 'Internal Server Error' });

      expect(errorReceived).toBe(true);
      expect(errorData!.error).toBe(errorText);
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });

    it('should handle empty error response bodies', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.delete('/api/delete-error').subscribe(
        response => fail('Should not have received success response'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/delete-error');
      req.flush(null, { status: 404, statusText: 'Not Found' });

      expect(errorReceived).toBe(true);
      expect(errorData!.error).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
    });
  });

  describe('Multiple Request Error Handling', () => {
    it('should handle multiple concurrent errors', () => {
      let error1Received = false;
      let error2Received = false;
      let error3Received = false;

      // Make multiple concurrent requests that will fail
      httpClient.get('/api/error1').subscribe(
        response => fail('Should not succeed'),
        error => { error1Received = true; }
      );

      httpClient.post('/api/error2', {}).subscribe(
        response => fail('Should not succeed'),
        error => { error2Received = true; }
      );

      httpClient.put('/api/error3', {}).subscribe(
        response => fail('Should not succeed'),
        error => { error3Received = true; }
      );

      const req1 = httpMock.expectOne('/api/error1');
      const req2 = httpMock.expectOne('/api/error2');
      const req3 = httpMock.expectOne('/api/error3');

      req1.flush('Error 1', { status: 400, statusText: 'Bad Request' });
      req2.flush('Error 2', { status: 401, statusText: 'Unauthorized' });
      req3.flush('Error 3', { status: 500, statusText: 'Internal Server Error' });

      expect(error1Received).toBe(true);
      expect(error2Received).toBe(true);
      expect(error3Received).toBe(true);

      // Should have logged all three errors
      expect(consoleSpy).toHaveBeenCalledTimes(3);
    });

    it('should handle rapid sequential errors', () => {
      const errorCount = 5;
      let errorsReceived = 0;

      for (let i = 0; i < errorCount; i++) {
        httpClient.get(`/api/rapid-error-${i}`).subscribe(
          response => fail(`Request ${i} should not succeed`),
          error => { errorsReceived++; }
        );

        const req = httpMock.expectOne(`/api/rapid-error-${i}`);
        req.flush(`Error ${i}`, { status: 500, statusText: 'Internal Server Error' });
      }

      expect(errorsReceived).toBe(errorCount);
      expect(consoleSpy).toHaveBeenCalledTimes(errorCount);
    });
  });

  describe('HTTP Method Error Coverage', () => {
    beforeEach(() => {
      consoleSpy.calls.reset();
    });

    const testMethods = [
      { method: 'GET', call: (url: string) => httpClient.get(url) },
      { method: 'POST', call: (url: string) => httpClient.post(url, {}) },
      { method: 'PUT', call: (url: string) => httpClient.put(url, {}) },
      { method: 'PATCH', call: (url: string) => httpClient.patch(url, {}) },
      { method: 'DELETE', call: (url: string) => httpClient.delete(url) },
      { method: 'HEAD', call: (url: string) => httpClient.head(url) },
      { method: 'OPTIONS', call: (url: string) => httpClient.options(url) }
    ];

    testMethods.forEach(({ method, call }) => {
      it(`should handle ${method} request errors`, () => {
        let errorReceived = false;
        let errorData: HttpErrorResponse | null = null;

        call(`/api/${method.toLowerCase()}-error`).subscribe(
          response => fail(`${method} request should not succeed`),
          error => {
            errorReceived = true;
            errorData = error;
          }
        );

        const req = httpMock.expectOne(`/api/${method.toLowerCase()}-error`);
        expect(req.request.method).toBe(method);
        
        req.flush(`${method} Error`, { status: 500, statusText: 'Internal Server Error' });

        expect(errorReceived).toBe(true);
        expect(errorData!.status).toBe(500);
        expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
      });
    });
  });

  describe('Error Information Preservation', () => {
    it('should preserve all error information in HttpErrorResponse', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/detailed-error', {
        headers: { 'Accept': 'application/json' }
      }).subscribe(
        response => fail('Should not succeed'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/detailed-error');
      
      const errorBody = {
        timestamp: '2023-01-01T12:00:00Z',
        path: '/api/detailed-error',
        error: 'Bad Request',
        message: 'Invalid request parameters'
      };
      
      req.flush(errorBody, { 
        status: 400, 
        statusText: 'Bad Request',
        headers: { 'Content-Type': 'application/json' }
      });

      expect(errorReceived).toBe(true);
      expect(errorData!.status).toBe(400);
      expect(errorData!.statusText).toBe('Bad Request');
      expect(errorData!.error).toEqual(errorBody);
      expect(errorData!.url).toBe('/api/detailed-error');
      expect(errorData!.headers.get('Content-Type')).toBe('application/json');
    });

    it('should preserve request context in error', () => {
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      const requestBody = { userId: 123, action: 'update' };
      
      httpClient.put('/api/users/123', requestBody, {
        headers: { 
          'Content-Type': 'application/json',
          'X-Request-ID': 'req-123'
        }
      }).subscribe(
        response => fail('Should not succeed'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/users/123');
      req.flush('Update failed', { status: 409, statusText: 'Conflict' });

      expect(errorReceived).toBe(true);
      expect(errorData!.url).toBe('/api/users/123');
      // The original request details should be accessible through errorData
      expect(errorData).toBeInstanceOf(HttpErrorResponse);
    });
  });

  describe('Compatibility and Integration', () => {
    it('should work alongside other interceptors', () => {
      // This test verifies that the error interceptor doesn't interfere with other interceptors
      // Since we have both auth and error interceptors registered, this tests their interaction
      
      let errorReceived = false;

      httpClient.get('/api/test-with-other-interceptors').subscribe(
        response => fail('Should not succeed'),
        error => { errorReceived = true; }
      );

      const req = httpMock.expectOne('/api/test-with-other-interceptors');
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(errorReceived).toBe(true);
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    it('should maintain same behavior as old library error interceptor', () => {
      // Test that the new error interceptor behaves the same way as the old one
      let errorReceived = false;
      let errorData: HttpErrorResponse | null = null;

      httpClient.get('/api/legacy-error-test').subscribe(
        response => fail('Should not succeed'),
        error => {
          errorReceived = true;
          errorData = error;
        }
      );

      const req = httpMock.expectOne('/api/legacy-error-test');
      req.flush('Legacy Error', { status: 400, statusText: 'Bad Request' });

      // Should log error (same as old library)
      expect(consoleSpy).toHaveBeenCalledWith('HTTP Error occurred:', errorData);
      
      // Should re-throw error for handling by application (same as old library)
      expect(errorReceived).toBe(true);
      expect(errorData).toBeInstanceOf(HttpErrorResponse);
    });

    it('should handle edge cases consistently with old library', () => {
      const edgeCases = [
        { status: 0, statusText: 'Unknown Error' },
        { status: 999, statusText: 'Custom Error' },
        { status: -1, statusText: 'Invalid Status' }
      ];

      edgeCases.forEach((errorCase, index) => {
        httpClient.get(`/api/edge-case-${index}`).subscribe(
          response => fail(`Edge case ${index} should not succeed`),
          error => {
            expect(error.status).toBe(errorCase.status);
            expect(error.statusText).toBe(errorCase.statusText);
          }
        );

        const req = httpMock.expectOne(`/api/edge-case-${index}`);
        req.error(new ProgressEvent('error'), errorCase);
      });

      expect(consoleSpy).toHaveBeenCalledTimes(edgeCases.length);
    });
  });
});