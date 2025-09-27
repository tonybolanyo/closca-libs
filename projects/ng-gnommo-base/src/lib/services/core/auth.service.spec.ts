import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthToken } from '../../models/auth-token.model';
import { LocalStorageHandler } from '../../storage/local-storage.handler';

describe('AuthService', () => {
  let service: AuthService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    // Create spy object for localStorage
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem', 'clear']);

    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);

    // Replace window.localStorage with our spy
    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpy,
      writable: true
    });

    // Clear any existing tokens before each test
    service.removeToken();
  });

  afterEach(() => {
    // Clean up after each test
    localStorageSpy.clear.calls.reset();
    localStorageSpy.getItem.calls.reset();
    localStorageSpy.setItem.calls.reset();
    localStorageSpy.removeItem.calls.reset();
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should use LocalStorageHandler for storage', () => {
      // Access private storage property for testing
      const serviceAny = service as any;
      expect(serviceAny.storage).toBeInstanceOf(LocalStorageHandler);
    });
  });

  describe('Token Management', () => {
    describe('getToken()', () => {
      it('should return new AuthToken when no token exists', () => {
        localStorageSpy.getItem.and.returnValue(null);

        const token = service.getToken();
        
        expect(token).toBeInstanceOf(AuthToken);
        expect(token.id).toBeUndefined();
        expect(localStorageSpy.getItem).toHaveBeenCalledWith('access_token');
      });

      it('should return cached token on subsequent calls', () => {
        const tokenData = {
          id: 'token123',
          created: new Date('2023-01-01'),
          ttl: new Date('2023-01-08').getTime()
        };
        
        localStorageSpy.getItem.and.returnValue(JSON.stringify(tokenData));

        // First call should retrieve from storage
        const token1 = service.getToken();
        expect(token1.id).toBe('token123');
        expect(localStorageSpy.getItem).toHaveBeenCalledTimes(1);

        // Second call should return cached token
        const token2 = service.getToken();
        expect(token2).toBe(token1); // Same instance
        expect(localStorageSpy.getItem).toHaveBeenCalledTimes(1); // No additional calls
      });

      it('should handle stored token data correctly', () => {
        const tokenData = {
          id: 'stored-token-456',
          created: new Date('2023-06-01'),
          ttl: new Date('2023-06-08').getTime()
        };
        
        localStorageSpy.getItem.and.returnValue(JSON.stringify(tokenData));

        const token = service.getToken();
        
        expect(token.id).toBe('stored-token-456');
        expect(token.created).toEqual(new Date('2023-06-01'));
        expect(token.ttl).toBe(new Date('2023-06-08').getTime());
      });

      it('should handle corrupted token data gracefully', () => {
        localStorageSpy.getItem.and.returnValue('invalid-json-data');

        const token = service.getToken();
        
        expect(token).toBeInstanceOf(AuthToken);
        expect(token.id).toBeUndefined();
      });

      it('should handle non-object token data', () => {
        localStorageSpy.getItem.and.returnValue('"simple-string"');

        const token = service.getToken();
        
        expect(token).toBeInstanceOf(AuthToken);
        expect(token.id).toBeUndefined();
      });
    });

    describe('setToken()', () => {
      beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date('2023-01-01T00:00:00Z'));
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it('should set token with correct data structure', () => {
        const tokenId = 'new-token-789';
        
        service.setToken(tokenId);

        expect(localStorageSpy.setItem).toHaveBeenCalled();
        const setItemCall = localStorageSpy.setItem.calls.mostRecent();
        expect(setItemCall.args[0]).toBe('access_token');
        
        const storedData = JSON.parse(setItemCall.args[1]);
        expect(storedData.id).toBe(tokenId);
        expect(storedData.created).toBe('2023-01-01T00:00:00.000Z');
        expect(typeof storedData.ttl).toBe('number');
      });

      it('should create AuthToken instance with correct expiration', () => {
        const tokenId = 'expiring-token';
        
        service.setToken(tokenId);
        const token = service.getToken();

        expect(token.id).toBe(tokenId);
        expect(token.ttl).toBe(new Date('2023-01-08T00:00:00Z').getTime()); // 7 days later
      });

      it('should cache the new token', () => {
        const tokenId = 'cached-token';
        
        service.setToken(tokenId);
        
        // Clear localStorage spy calls to ensure we're getting cached version
        localStorageSpy.getItem.calls.reset();
        
        const token = service.getToken();
        expect(token.id).toBe(tokenId);
        expect(localStorageSpy.getItem).not.toHaveBeenCalled(); // Should use cached version
      });

      it('should handle empty token ID', () => {
        service.setToken('');
        const token = service.getToken();
        
        expect(token.id).toBe('');
        expect(localStorageSpy.setItem).toHaveBeenCalled();
      });

      it('should handle null token ID', () => {
        service.setToken(null as any);
        const token = service.getToken();
        
        expect(token.id).toBeNull();
        expect(localStorageSpy.setItem).toHaveBeenCalled();
      });

      it('should override existing token', () => {
        // Set first token
        service.setToken('first-token');
        let token = service.getToken();
        expect(token.id).toBe('first-token');

        // Set second token
        service.setToken('second-token');
        token = service.getToken();
        expect(token.id).toBe('second-token');
        
        expect(localStorageSpy.setItem).toHaveBeenCalledTimes(2);
      });
    });

    describe('removeToken()', () => {
      it('should remove token from storage', () => {
        // First set a token
        service.setToken('token-to-remove');
        expect(service.getToken().id).toBe('token-to-remove');

        // Then remove it
        service.removeToken();
        
        expect(localStorageSpy.removeItem).toHaveBeenCalledWith('access_token');
        
        // Clear the spy to avoid interference with getToken
        localStorageSpy.getItem.and.returnValue(null);
        
        // Token should now be empty
        const token = service.getToken();
        expect(token.id).toBeUndefined();
      });

      it('should clear cached token', () => {
        // Set and cache token
        service.setToken('cached-token');
        expect(service.getToken().id).toBe('cached-token');

        // Remove token
        service.removeToken();
        
        // Should create new empty token, not return cached one
        localStorageSpy.getItem.and.returnValue(null);
        const token = service.getToken();
        expect(token.id).toBeUndefined();
      });

      it('should handle removing non-existent token', () => {
        // Remove token when none exists
        service.removeToken();
        
        expect(localStorageSpy.removeItem).toHaveBeenCalledWith('access_token');
        // Should not throw error
      });
    });
  });

  describe('Persistence Methods', () => {
    describe('persist()', () => {
      beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date('2023-01-01T00:00:00Z'));
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it('should persist string value with expiration', () => {
        const key = 'user_preference';
        const value = 'dark_mode';
        const expirationDate = new Date('2023-01-15T00:00:00Z');
        
        service.persist(key, value, expirationDate);

        expect(localStorageSpy.setItem).toHaveBeenCalled();
        const setItemCall = localStorageSpy.setItem.calls.mostRecent();
        expect(setItemCall.args[0]).toBe(key);
        
        const storedData = JSON.parse(setItemCall.args[1]);
        expect(storedData.value).toBe(value);
        expect(storedData.expires).toBe(expirationDate.toISOString());
      });

      it('should persist object value with expiration', () => {
        const key = 'user_settings';
        const value = { theme: 'dark', language: 'en' };
        const expirationDate = new Date('2023-02-01T00:00:00Z');
        
        service.persist(key, value, expirationDate);

        const setItemCall = localStorageSpy.setItem.calls.mostRecent();
        const storedData = JSON.parse(setItemCall.args[1]);
        expect(storedData.value).toEqual(value);
        expect(storedData.expires).toBe(expirationDate.toISOString());
      });

      it('should use default expiration when not provided', () => {
        const key = 'temp_data';
        const value = 'temporary_value';
        
        service.persist(key, value);

        const setItemCall = localStorageSpy.setItem.calls.mostRecent();
        const storedData = JSON.parse(setItemCall.args[1]);
        
        // Should use default 7-day expiration
        const expectedExpiration = new Date('2023-01-08T00:00:00Z');
        expect(storedData.expires).toBe(expectedExpiration.toISOString());
      });

      it('should handle null value', () => {
        const key = 'nullable_data';
        const value = null;
        
        service.persist(key, value);

        const setItemCall = localStorageSpy.setItem.calls.mostRecent();
        const storedData = JSON.parse(setItemCall.args[1]);
        expect(storedData.value).toBeNull();
      });

      it('should handle undefined value', () => {
        const key = 'undefined_data';
        const value = undefined as any; // Cast to any to allow undefined
        
        service.persist(key, value);

        const setItemCall = localStorageSpy.setItem.calls.mostRecent();
        const storedData = JSON.parse(setItemCall.args[1]);
        expect(storedData.value).toBeUndefined();
      });

      it('should handle array value', () => {
        const key = 'array_data';
        const value = ['item1', 'item2', 'item3'];
        
        service.persist(key, value);

        const setItemCall = localStorageSpy.setItem.calls.mostRecent();
        const storedData = JSON.parse(setItemCall.args[1]);
        expect(storedData.value).toEqual(value);
      });
    });

    describe('expiresTime()', () => {
      beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date('2023-06-15T10:30:00Z'));
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it('should return date 7 days in the future', () => {
        const expirationDate = service.expiresTime();
        const expectedDate = new Date('2023-06-22T10:30:00Z');
        
        expect(expirationDate.getTime()).toBe(expectedDate.getTime());
      });

      it('should always return 7 days from current date', () => {
        const expiration1 = service.expiresTime();
        
        // Advance time by 1 hour
        jasmine.clock().tick(60 * 60 * 1000);
        
        const expiration2 = service.expiresTime();
        
        expect(expiration2.getTime() - expiration1.getTime()).toBe(60 * 60 * 1000);
      });
    });
  });

  describe('Date Utility Methods', () => {
    describe('addDays() - private method behavior verification', () => {
      beforeEach(() => {
        jasmine.clock().install();
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it('should add days correctly through expiresTime', () => {
        jasmine.clock().mockDate(new Date('2023-01-01T00:00:00Z'));
        
        const result = service.expiresTime();
        const expected = new Date('2023-01-08T00:00:00Z');
        
        expect(result.getTime()).toBe(expected.getTime());
      });

      it('should handle month boundaries', () => {
        jasmine.clock().mockDate(new Date('2023-01-30T00:00:00Z'));
        
        const result = service.expiresTime();
        const expected = new Date('2023-02-06T00:00:00Z');
        
        expect(result.getTime()).toBe(expected.getTime());
      });

      it('should handle year boundaries', () => {
        jasmine.clock().mockDate(new Date('2023-12-30T00:00:00Z'));
        
        const result = service.expiresTime();
        const expected = new Date('2024-01-06T00:00:00Z');
        
        expect(result.getTime()).toBe(expected.getTime());
      });

      it('should handle leap year', () => {
        jasmine.clock().mockDate(new Date('2024-02-26T00:00:00Z')); // 2024 is a leap year
        
        const result = service.expiresTime();
        const expected = new Date('2024-03-05T00:00:00Z');
        
        expect(result.getTime()).toBe(expected.getTime());
      });
    });
  });

  describe('Integration and Edge Cases', () => {
    it('should handle localStorage quota exceeded', () => {
      localStorageSpy.setItem.and.throwError('QuotaExceededError');
      
      // Should not throw error
      expect(() => service.setToken('large-token')).not.toThrow();
    });

    it('should handle localStorage not available', () => {
      // Simulate localStorage not being available
      Object.defineProperty(window, 'localStorage', {
        value: null,
        writable: true
      });

      // Create new service instance
      service = new AuthService();
      
      // Should not throw error
      expect(() => service.setToken('test-token')).not.toThrow();
    });

    it('should maintain token consistency across multiple operations', () => {
      const tokenId = 'consistency-test-token';
      
      // Set token
      service.setToken(tokenId);
      
      // Verify it's set correctly
      let token = service.getToken();
      expect(token.id).toBe(tokenId);
      
      // Persist additional data
      service.persist('extra_data', 'some_value');
      
      // Token should remain unchanged
      token = service.getToken();
      expect(token.id).toBe(tokenId);
      
      // Remove token
      service.removeToken();
      
      // Token should be cleared
      localStorageSpy.getItem.and.returnValue(null);
      token = service.getToken();
      expect(token.id).toBeUndefined();
    });

    it('should handle concurrent token operations', () => {
      // Simulate rapid token operations
      service.setToken('token1');
      service.setToken('token2');
      service.setToken('token3');
      
      const finalToken = service.getToken();
      expect(finalToken.id).toBe('token3');
      expect(localStorageSpy.setItem).toHaveBeenCalledTimes(3);
    });

    it('should handle special characters in persisted data', () => {
      const specialData = {
        unicode: '🎉✨🚀',
        quotes: '"Hello World"',
        backslashes: 'C:\\Users\\Test',
        json: '{"nested": "value"}'
      };
      
      service.persist('special_chars', specialData);
      
      const setItemCall = localStorageSpy.setItem.calls.mostRecent();
      const storedData = JSON.parse(setItemCall.args[1]);
      expect(storedData.value).toEqual(specialData);
    });
  });

  describe('Compatibility with Old Library', () => {
    it('should provide same public API as old AuthService', () => {
      // Verify all expected methods exist
      expect(typeof service.getToken).toBe('function');
      expect(typeof service.setToken).toBe('function');
      expect(typeof service.removeToken).toBe('function');
      expect(typeof service.persist).toBe('function');
      expect(typeof service.expiresTime).toBe('function');
    });

    it('should handle token data structure compatible with old library', () => {
      // Old library expected structure
      const tokenData = {
        id: 'old-lib-token',
        created: new Date('2023-01-01'),
        ttl: new Date('2023-01-08').getTime()
      };
      
      localStorageSpy.getItem.and.returnValue(JSON.stringify(tokenData));
      
      const token = service.getToken();
      expect(token.id).toBe('old-lib-token');
      expect(token.created).toEqual(new Date('2023-01-01'));
      expect(token.ttl).toBe(new Date('2023-01-08').getTime());
    });

    it('should maintain same default expiration time as old library', () => {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date('2023-01-01T00:00:00Z'));
      
      const expiration = service.expiresTime();
      const expectedDays = 7; // Old library used 7 days
      const expectedExpiration = new Date('2023-01-01T00:00:00Z');
      expectedExpiration.setDate(expectedExpiration.getDate() + expectedDays);
      
      expect(expiration.getTime()).toBe(expectedExpiration.getTime());
      
      jasmine.clock().uninstall();
    });
  });
});