import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { BaseModel } from '../../models/base.model';

// Test implementation of BaseService
interface TestUser extends BaseModel {
  name: string;
  email: string;
}

class TestUserService extends BaseService<TestUser> {
  constructor(http: HttpClient) {
    super(http);
    this.setApiConfig('https://api.test.com', 'users');
  }
}

describe('BaseService', () => {
  let service: TestUserService;
  let httpMock: HttpTestingController;

  const testUser: TestUser = {
    _id: '123',
    name: 'John Doe',
    email: 'john@example.com'
  };

  const testUsers: TestUser[] = [
    testUser,
    { _id: '456', name: 'Jane Doe', email: 'jane@example.com' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestUserService]
    });

    service = TestBed.inject(TestUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Configuration', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have default httpOptions with Content-Type', () => {
      expect(service.httpOptions).toBeDefined();
      expect(service.httpOptions.headers).toBeInstanceOf(HttpHeaders);
      expect(service.httpOptions.headers.get('Content-Type')).toBe('application/json');
    });

    it('should set API configuration correctly', () => {
      // Access protected properties via any cast for testing
      const serviceAny = service as any;
      expect(serviceAny.url).toBe('https://api.test.com');
      expect(serviceAny.endpoint).toBe('users');
    });
  });

  describe('HTTP CRUD Operations', () => {
    describe('getAll()', () => {
      it('should retrieve all items', () => {
        service.getAll().subscribe(users => {
          expect(users).toEqual(testUsers);
          expect(users.length).toBe(2);
        });

        const req = httpMock.expectOne('https://api.test.com/users');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(testUsers);
      });

      it('should handle custom headers in getAll()', () => {
        const customHeaders = { 'Custom-Header': 'test-value' };
        
        service.getAll(customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/users');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.get('Custom-Header')).toBe('test-value');
        req.flush([]);
      });
    });

    describe('getById()', () => {
      it('should retrieve item by ID', () => {
        service.getById('123').subscribe(user => {
          expect(user).toEqual(testUser);
        });

        const req = httpMock.expectOne('https://api.test.com/users/123');
        expect(req.request.method).toBe('GET');
        req.flush(testUser);
      });

      it('should handle custom headers in getById()', () => {
        const customHeaders = { 'Authorization': 'Bearer token123' };
        
        service.getById('123', customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/users/123');
        expect(req.request.headers.get('Authorization')).toBe('Bearer token123');
        req.flush(testUser);
      });
    });

    describe('create()', () => {
      it('should create new item', () => {
        const newUser = { name: 'New User', email: 'new@example.com' } as TestUser;

        service.create(newUser).subscribe(user => {
          expect(user).toEqual({ ...newUser, _id: '789' });
        });

        const req = httpMock.expectOne('https://api.test.com/users');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newUser);
        req.flush({ ...newUser, _id: '789' });
      });

      it('should handle custom headers in create()', () => {
        const newUser = { name: 'New User', email: 'new@example.com' } as TestUser;
        const customHeaders = { 'X-Custom': 'create-header' };
        
        service.create(newUser, customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/users');
        expect(req.request.headers.get('X-Custom')).toBe('create-header');
        req.flush(newUser);
      });
    });

    describe('update()', () => {
      it('should update item with PATCH', () => {
        const updatedUser = { ...testUser, name: 'Updated Name' };

        service.update('123', updatedUser).subscribe(user => {
          expect(user).toEqual(updatedUser);
        });

        const req = httpMock.expectOne('https://api.test.com/users/123');
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual(updatedUser);
        req.flush(updatedUser);
      });

      it('should handle custom headers in update()', () => {
        const updatedUser = { ...testUser, name: 'Updated Name' };
        const customHeaders = { 'If-Match': 'etag123' };
        
        service.update('123', updatedUser, customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/users/123');
        expect(req.request.headers.get('If-Match')).toBe('etag123');
        req.flush(updatedUser);
      });
    });

    describe('updateComplete()', () => {
      it('should update item completely with PUT', () => {
        const updatedUser = { ...testUser, name: 'Completely Updated' };

        service.updateComplete('123', updatedUser).subscribe(user => {
          expect(user).toEqual(updatedUser);
        });

        const req = httpMock.expectOne('https://api.test.com/users/123');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedUser);
        req.flush(updatedUser);
      });

      it('should handle custom headers in updateComplete()', () => {
        const updatedUser = { ...testUser, name: 'Completely Updated' };
        const customHeaders = { 'X-Full-Update': 'true' };
        
        service.updateComplete('123', updatedUser, customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/users/123');
        expect(req.request.headers.get('X-Full-Update')).toBe('true');
        req.flush(updatedUser);
      });
    });

    describe('delete()', () => {
      it('should delete item', () => {
        service.delete('123').subscribe(response => {
          expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('https://api.test.com/users/123');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
      });

      it('should handle custom headers in delete()', () => {
        const customHeaders = { 'X-Force-Delete': 'true' };
        
        service.delete('123', customHeaders).subscribe();

        const req = httpMock.expectOne('https://api.test.com/users/123');
        expect(req.request.headers.get('X-Force-Delete')).toBe('true');
        req.flush(null);
      });
    });
  });

  describe('Header Management', () => {
    describe('createHttpHeaders()', () => {
      it('should create default headers without custom headers', () => {
        const result = service.createHttpHeaders();
        
        expect(result.headers).toBeInstanceOf(HttpHeaders);
        expect(result.headers.get('Content-Type')).toBe('application/json');
      });

      it('should merge custom string headers', () => {
        const customHeaders = {
          'Authorization': 'Bearer token123',
          'X-Custom': 'custom-value'
        };
        
        const result = service.createHttpHeaders(customHeaders);
        
        expect(result.headers.get('Content-Type')).toBe('application/json');
        expect(result.headers.get('Authorization')).toBe('Bearer token123');
        expect(result.headers.get('X-Custom')).toBe('custom-value');
      });

      it('should handle array headers by joining with comma', () => {
        const customHeaders = {
          'Accept': ['application/json', 'text/plain'],
          'X-Multiple': ['value1', 'value2', 'value3']
        };
        
        const result = service.createHttpHeaders(customHeaders);
        
        expect(result.headers.get('Accept')).toBe('application/json, text/plain');
        expect(result.headers.get('X-Multiple')).toBe('value1, value2, value3');
      });

      it('should handle mixed string and array headers', () => {
        const customHeaders = {
          'Authorization': 'Bearer token123',
          'Accept': ['application/json', 'text/plain'],
          'X-Single': 'single-value'
        };
        
        const result = service.createHttpHeaders(customHeaders);
        
        expect(result.headers.get('Authorization')).toBe('Bearer token123');
        expect(result.headers.get('Accept')).toBe('application/json, text/plain');
        expect(result.headers.get('X-Single')).toBe('single-value');
      });
    });

    describe('httpHeadersWithoutAuth()', () => {
      it('should create headers without authentication', () => {
        const result = service.httpHeadersWithoutAuth();
        
        expect(result.headers).toBeInstanceOf(HttpHeaders);
        expect(result.headers.get('Content-Type')).toBe('application/json');
        // Should not have Authorization header by default
        expect(result.headers.get('Authorization')).toBeNull();
      });

      it('should merge custom headers without auth in httpHeadersWithoutAuth()', () => {
        const customHeaders = {
          'X-Custom': 'custom-value',
          'Accept': 'application/json'
        };
        
        const result = service.httpHeadersWithoutAuth(customHeaders);
        
        expect(result.headers.get('Content-Type')).toBe('application/json');
        expect(result.headers.get('X-Custom')).toBe('custom-value');
        expect(result.headers.get('Accept')).toBe('application/json');
        expect(result.headers.get('Authorization')).toBeNull();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors in getAll()', () => {
      service.getAll().subscribe({
        next: () => fail('Expected error'),
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne('https://api.test.com/users');
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle HTTP errors in create()', () => {
      const newUser = { name: 'New User', email: 'new@example.com' } as TestUser;

      service.create(newUser).subscribe({
        next: () => fail('Expected error'),
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      const req = httpMock.expectOne('https://api.test.com/users');
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty response arrays', () => {
      service.getAll().subscribe(users => {
        expect(users).toEqual([]);
        expect(Array.isArray(users)).toBe(true);
      });

      const req = httpMock.expectOne('https://api.test.com/users');
      req.flush([]);
    });

    it('should handle null custom headers', () => {
      service.getAll(null as any).subscribe();

      const req = httpMock.expectOne('https://api.test.com/users');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush([]);
    });

    it('should handle undefined custom headers', () => {
      service.getAll(undefined).subscribe();

      const req = httpMock.expectOne('https://api.test.com/users');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush([]);
    });

    it('should handle empty string ID in getById()', () => {
      service.getById('').subscribe();

      const req = httpMock.expectOne('https://api.test.com/users/');
      expect(req.request.method).toBe('GET');
      req.flush(testUser);
    });

    it('should handle special characters in ID', () => {
      const specialId = 'user@domain.com';
      service.getById(specialId).subscribe();

      const req = httpMock.expectOne(`https://api.test.com/users/${specialId}`);
      expect(req.request.method).toBe('GET');
      req.flush(testUser);
    });
  });
});