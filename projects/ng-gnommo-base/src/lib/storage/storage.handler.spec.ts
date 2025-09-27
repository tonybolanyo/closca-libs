import { TestBed } from '@angular/core/testing';
import { BaseStorage, WebLocalStorage, CookieStorage } from './storage.handler';
import { LocalStorageHandler } from './local-storage.handler';
import { CookieHandler } from './cookie.handler';

describe('Storage Handler Interfaces', () => {
  describe('BaseStorage', () => {
    // Create a concrete implementation for testing
    class TestBaseStorage extends BaseStorage {
      get(key: string): any {
        return undefined; // Default implementation returns undefined
      }
      
      set(key: string, value: any, expires?: Date): void {
        // Do nothing - base implementation
      }
      
      remove(key: string): void {
        // Do nothing - base implementation
      }
    }

    let baseStorage: TestBaseStorage;

    beforeEach(() => {
      baseStorage = new TestBaseStorage();
    });

    it('should create an instance', () => {
      expect(baseStorage).toBeTruthy();
      expect(baseStorage).toBeInstanceOf(TestBaseStorage);
      expect(baseStorage).toBeInstanceOf(BaseStorage);
    });

    it('should have the expected interface methods', () => {
      expect(typeof baseStorage.get).toBe('function');
      expect(typeof baseStorage.set).toBe('function');
      expect(typeof baseStorage.remove).toBe('function');
    });

    it('should provide default implementations that do nothing', () => {
      // Base implementations should not throw errors but do nothing
      expect(() => baseStorage.get('test-key')).not.toThrow();
      expect(() => baseStorage.set('test-key', 'test-value')).not.toThrow();
      expect(() => baseStorage.remove('test-key')).not.toThrow();
      
      // Base get should return undefined/null
      const result = baseStorage.get('test-key');
      expect(result).toBeUndefined();
    });

    it('should handle edge cases gracefully', () => {
      expect(() => baseStorage.get('')).not.toThrow();
      expect(() => baseStorage.get(null as any)).not.toThrow();
      expect(() => baseStorage.set('', '')).not.toThrow();
      expect(() => baseStorage.set('key', null)).not.toThrow();
      expect(() => baseStorage.remove('')).not.toThrow();
    });
  });

  describe('WebLocalStorage', () => {
    let webLocalStorage: WebLocalStorage;
    let localStorageSpy: jasmine.SpyObj<Storage>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: WebLocalStorage,
            useClass: LocalStorageHandler
          }
        ]
      });

      // Create spy object for localStorage
      localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem', 'clear']);

      // Replace window.localStorage with our spy
      Object.defineProperty(window, 'localStorage', {
        value: localStorageSpy,
        writable: true
      });

      webLocalStorage = TestBed.inject(WebLocalStorage);
    });

    afterEach(() => {
      localStorageSpy.clear.calls.reset();
      localStorageSpy.getItem.calls.reset();
      localStorageSpy.setItem.calls.reset();
      localStorageSpy.removeItem.calls.reset();
    });

    it('should create an instance', () => {
      expect(webLocalStorage).toBeTruthy();
      expect(webLocalStorage).toBeInstanceOf(WebLocalStorage);
      expect(webLocalStorage).toBeInstanceOf(BaseStorage);
    });

    it('should be injectable as a service', () => {
      const injectedService = TestBed.inject(WebLocalStorage);
      expect(injectedService).toBeTruthy();
      expect(injectedService).toBeInstanceOf(WebLocalStorage);
    });

    it('should use LocalStorageHandler internally', () => {
      // Access the internal handler to verify it's a LocalStorageHandler
      const handlerAny = (webLocalStorage as any).handler;
      expect(handlerAny).toBeInstanceOf(LocalStorageHandler);
    });

    describe('Storage Operations', () => {
      beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date('2023-01-01T12:00:00Z'));
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it('should store and retrieve string values', () => {
        const key = 'string-test';
        const value = 'test string value';
        
        webLocalStorage.set(key, value);
        
        expect(localStorageSpy.setItem).toHaveBeenCalled();
        const setCall = localStorageSpy.setItem.calls.mostRecent();
        expect(setCall.args[0]).toBe(key);
        
        const storedData = JSON.parse(setCall.args[1]);
        expect(storedData.value).toBe(value);
        expect(storedData.expires).toBeDefined();
      });

      it('should store and retrieve complex objects', () => {
        const key = 'object-test';
        const value = {
          user: 'john',
          permissions: ['read', 'write'],
          settings: { theme: 'dark', lang: 'en' }
        };
        
        webLocalStorage.set(key, value);
        
        const setCall = localStorageSpy.setItem.calls.mostRecent();
        const storedData = JSON.parse(setCall.args[1]);
        expect(storedData.value).toEqual(value);
      });

      it('should retrieve stored values correctly', () => {
        const key = 'retrieve-test';
        const value = 'stored value';
        const futureDate = new Date('2023-12-31T23:59:59Z');
        
        const storedData = {
          value: value,
          expires: futureDate.toISOString()
        };
        
        localStorageSpy.getItem.and.returnValue(JSON.stringify(storedData));
        
        const result = webLocalStorage.get(key);
        expect(result).toBe(value);
        expect(localStorageSpy.getItem).toHaveBeenCalledWith(key);
      });

      it('should handle expiration correctly', () => {
        const key = 'expiry-test';
        const value = 'expired value';
        
        // Set with custom expiration
        const customExpiration = new Date('2023-06-01T00:00:00Z');
        webLocalStorage.set(key, value, customExpiration);
        
        const setCall = localStorageSpy.setItem.calls.mostRecent();
        const storedData = JSON.parse(setCall.args[1]);
        expect(storedData.expires).toBe(customExpiration.toISOString());
        
        // Mock expired item retrieval
        localStorageSpy.getItem.and.returnValue(JSON.stringify({
          value: value,
          expires: new Date('2022-01-01T00:00:00Z').toISOString() // Past date
        }));
        
        const result = webLocalStorage.get(key);
        expect(result).toBeNull();
        expect(localStorageSpy.removeItem).toHaveBeenCalledWith(key);
      });

      it('should remove items correctly', () => {
        const key = 'remove-test';
        
        webLocalStorage.remove(key);
        
        expect(localStorageSpy.removeItem).toHaveBeenCalledWith(key);
      });
    });

    describe('Error Handling', () => {
      it('should handle localStorage unavailable', () => {
        Object.defineProperty(window, 'localStorage', {
          value: null,
          writable: true
        });
        
        // Use TestBed to inject a new instance
        const injectedService = TestBed.inject(WebLocalStorage);
        
        expect(() => injectedService.set('key', 'value')).not.toThrow();
        expect(() => injectedService.get('key')).not.toThrow();
        expect(() => injectedService.remove('key')).not.toThrow();
      });

      it('should handle storage quota errors', () => {
        localStorageSpy.setItem.and.throwError('QuotaExceededError');
        
        expect(() => webLocalStorage.set('key', 'value')).not.toThrow();
      });

      it('should handle corrupted data', () => {
        localStorageSpy.getItem.and.returnValue('invalid-json-{');
        
        const result = webLocalStorage.get('corrupted-key');
        expect(result).toBeNull();
      });
    });

    describe('Compatibility with Old Library', () => {
      it('should maintain same API signature as old WebLocalStorage', () => {
        expect(typeof webLocalStorage.get).toBe('function');
        expect(typeof webLocalStorage.set).toBe('function');
        expect(typeof webLocalStorage.remove).toBe('function');
      });

      it('should accept same parameter types as old library', () => {
        expect(() => webLocalStorage.get('string-key')).not.toThrow();
        expect(() => webLocalStorage.set('key', 'string-value')).not.toThrow();
        expect(() => webLocalStorage.set('key', { object: 'value' })).not.toThrow();
        expect(() => webLocalStorage.set('key', 'value', new Date())).not.toThrow();
        expect(() => webLocalStorage.remove('key')).not.toThrow();
      });
    });
  });

  describe('CookieStorage', () => {
    let cookieStorage: CookieStorage;
    let originalDocument: Document;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: CookieStorage,
            useClass: CookieHandler
          }
        ]
      });

      // Store original document
      originalDocument = document;

      // Mock document.cookie
      let cookieStore = '';
      Object.defineProperty(document, 'cookie', {
        get: () => cookieStore,
        set: (value: string) => {
          if (value.includes('expires=Thu, 01 Jan 1970')) {
            // Handle cookie deletion
            const name = value.split('=')[0];
            cookieStore = cookieStore
              .split(';')
              .filter(cookie => !cookie.trim().startsWith(name + '='))
              .join(';');
          } else {
            // Handle cookie setting
            const [cookiePart] = value.split(';');
            const [name] = cookiePart.split('=');
            
            // Remove existing cookie with same name
            cookieStore = cookieStore
              .split(';')
              .filter(cookie => !cookie.trim().startsWith(name + '='))
              .join(';');
              
            // Add new cookie
            cookieStore = cookieStore ? cookieStore + ';' + cookiePart : cookiePart;
          }
        },
        configurable: true
      });

      cookieStorage = TestBed.inject(CookieStorage);
    });

    afterEach(() => {
      document.cookie = '';
    });

    it('should create an instance', () => {
      expect(cookieStorage).toBeTruthy();
      expect(cookieStorage).toBeInstanceOf(CookieStorage);
      expect(cookieStorage).toBeInstanceOf(BaseStorage);
    });

    it('should be injectable as a service', () => {
      const injectedService = TestBed.inject(CookieStorage);
      expect(injectedService).toBeTruthy();
      expect(injectedService).toBeInstanceOf(CookieStorage);
    });

    it('should use CookieHandler internally', () => {
      // Access the internal handler to verify it's a CookieHandler
      const handlerAny = (cookieStorage as any).handler;
      expect(handlerAny).toBeInstanceOf(CookieHandler);
    });

    describe('Storage Operations', () => {
      beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date('2023-01-01T12:00:00Z'));
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it('should store and retrieve string values', () => {
        const key = 'cookie-string';
        const value = 'cookie value';
        
        cookieStorage.set(key, value);
        const result = cookieStorage.get(key);
        
        expect(result).toBe(value);
      });

      it('should store and retrieve object values', () => {
        const key = 'cookie-object';
        const value = { name: 'test', id: 123, active: true };
        
        cookieStorage.set(key, value);
        const result = cookieStorage.get(key);
        
        expect(result).toEqual(value);
      });

      it('should store and retrieve array values', () => {
        const key = 'cookie-array';
        const value = ['item1', 'item2', { nested: 'object' }];
        
        cookieStorage.set(key, value);
        const result = cookieStorage.get(key);
        
        expect(result).toEqual(value);
      });

      it('should handle expiration dates', () => {
        const key = 'cookie-expiry';
        const value = 'expiring value';
        const futureDate = new Date('2023-12-31T23:59:59Z');
        
        cookieStorage.set(key, value, futureDate);
        
        // Should be able to retrieve before expiration
        const result = cookieStorage.get(key);
        expect(result).toBe(value);
      });

      it('should remove cookies correctly', () => {
        const key = 'cookie-remove';
        const value = 'to be removed';
        
        // Set cookie
        cookieStorage.set(key, value);
        expect(cookieStorage.get(key)).toBe(value);
        
        // Remove cookie
        cookieStorage.remove(key);
        expect(cookieStorage.get(key)).toBeNull();
      });

      it('should return null for non-existent cookies', () => {
        const result = cookieStorage.get('non-existent-cookie');
        expect(result).toBeNull();
      });
    });

    describe('Special Cases and Edge Cases', () => {
      it('should handle empty string values', () => {
        const key = 'empty-cookie';
        const value = '';
        
        cookieStorage.set(key, value);
        const result = cookieStorage.get(key);
        
        expect(result).toBe(value);
      });

      it('should handle null values', () => {
        const key = 'null-cookie';
        const value = null;
        
        cookieStorage.set(key, value);
        const result = cookieStorage.get(key);
        
        expect(result).toBeNull();
      });

      it('should handle boolean values', () => {
        const key = 'boolean-cookie';
        
        cookieStorage.set(key, true);
        expect(cookieStorage.get(key)).toBe(true);
        
        cookieStorage.set(key, false);
        expect(cookieStorage.get(key)).toBe(false);
      });

      it('should handle numeric values', () => {
        const key = 'numeric-cookie';
        
        cookieStorage.set(key, 42);
        expect(cookieStorage.get(key)).toBe(42);
        
        cookieStorage.set(key, 3.14159);
        expect(cookieStorage.get(key)).toBe(3.14159);
        
        cookieStorage.set(key, 0);
        expect(cookieStorage.get(key)).toBe(0);
      });

      it('should handle special characters in values', () => {
        const key = 'special-chars';
        const value = 'Value with "quotes", semicolons;, and = equals';
        
        cookieStorage.set(key, value);
        const result = cookieStorage.get(key);
        
        expect(result).toBe(value);
      });

      it('should handle very long values', () => {
        const key = 'long-cookie';
        const value = 'x'.repeat(1000); // Long but within typical cookie limits
        
        cookieStorage.set(key, value);
        const result = cookieStorage.get(key);
        
        expect(result).toBe(value);
      });
    });

    describe('Error Handling', () => {
      it('should handle document being unavailable', () => {
        // Temporarily remove document
        (window as any).document = undefined;
        
        // Use TestBed to inject a new instance
        const injectedService = TestBed.inject(CookieStorage);
        
        expect(() => injectedService.set('key', 'value')).not.toThrow();
        expect(() => injectedService.get('key')).not.toThrow();
        expect(() => injectedService.remove('key')).not.toThrow();
        
        // Restore document
        (window as any).document = originalDocument;
      });

      it('should handle cookie setting failures gracefully', () => {
        // Mock document.cookie to throw error
        Object.defineProperty(document, 'cookie', {
          get: () => { throw new Error('Cookie access denied'); },
          set: () => { throw new Error('Cookie setting denied'); },
          configurable: true
        });
        
        expect(() => cookieStorage.set('key', 'value')).not.toThrow();
        expect(() => cookieStorage.get('key')).not.toThrow();
        expect(() => cookieStorage.remove('key')).not.toThrow();
      });
    });

    describe('Compatibility with Old Library', () => {
      it('should maintain same API signature as old CookieStorage', () => {
        expect(typeof cookieStorage.get).toBe('function');
        expect(typeof cookieStorage.set).toBe('function');
        expect(typeof cookieStorage.remove).toBe('function');
      });

      it('should accept same parameter types as old library', () => {
        expect(() => cookieStorage.get('string-key')).not.toThrow();
        expect(() => cookieStorage.set('key', 'string-value')).not.toThrow();
        expect(() => cookieStorage.set('key', { object: 'value' })).not.toThrow();
        expect(() => cookieStorage.set('key', 'value', new Date())).not.toThrow();
        expect(() => cookieStorage.remove('key')).not.toThrow();
      });

      it('should store data in format compatible with old library expectations', () => {
        const key = 'compatibility-test';
        const value = { user: 'john', role: 'admin' };
        
        cookieStorage.set(key, value);
        
        // Should be able to retrieve the same data structure
        const result = cookieStorage.get(key);
        expect(result).toEqual(value);
        expect(typeof result).toBe('object');
        expect((result as any).user).toBe('john');
        expect((result as any).role).toBe('admin');
      });
    });
  });

  describe('Cross-Storage Compatibility', () => {
    let webLocalStorage: WebLocalStorage;
    let cookieStorage: CookieStorage;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: WebLocalStorage,
            useClass: LocalStorageHandler
          },
          {
            provide: CookieStorage,
            useClass: CookieHandler
          }
        ]
      });

      webLocalStorage = TestBed.inject(WebLocalStorage);
      cookieStorage = TestBed.inject(CookieStorage);
    });

    it('should have consistent API across all storage implementations', () => {
      const implementations = [webLocalStorage, cookieStorage];
      
      implementations.forEach(storage => {
        expect(typeof storage.get).toBe('function');
        expect(typeof storage.set).toBe('function');
        expect(typeof storage.remove).toBe('function');
        expect(storage).toBeInstanceOf(BaseStorage);
      });
    });

    it('should handle the same data types consistently', () => {
      const testData = [
        { key: 'string', value: 'test string' },
        { key: 'number', value: 42 },
        { key: 'boolean', value: true },
        { key: 'object', value: { name: 'test', id: 123 } },
        { key: 'array', value: [1, 2, 3, 'four'] },
        { key: 'null', value: null }
      ];

      [webLocalStorage, cookieStorage].forEach((storage, index) => {
        testData.forEach(({ key, value }) => {
          const uniqueKey = `${key}_${index}`;
          
          expect(() => storage.set(uniqueKey, value)).not.toThrow();
          expect(() => storage.get(uniqueKey)).not.toThrow();
          expect(() => storage.remove(uniqueKey)).not.toThrow();
        });
      });
    });

    it('should provide consistent behavior for edge cases', () => {
      const edgeCases = ['', null, undefined];
      
      [webLocalStorage, cookieStorage].forEach(storage => {
        edgeCases.forEach(edgeCase => {
          expect(() => storage.get(edgeCase as any)).not.toThrow();
          expect(() => storage.remove(edgeCase as any)).not.toThrow();
        });
      });
    });
  });
});