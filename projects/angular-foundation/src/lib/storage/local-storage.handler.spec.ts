import { LocalStorageHandler } from './local-storage.handler';

describe('LocalStorageHandler', () => {
  let handler: LocalStorageHandler;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    // Create spy object for localStorage
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem', 'clear']);

    // Replace window.localStorage with our spy
    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpy,
      writable: true
    });

    handler = new LocalStorageHandler();
  });

  afterEach(() => {
    localStorageSpy.clear.calls.reset();
    localStorageSpy.getItem.calls.reset();
    localStorageSpy.setItem.calls.reset();
    localStorageSpy.removeItem.calls.reset();
  });

  describe('Creation and Initialization', () => {
    it('should create an instance', () => {
      expect(handler).toBeTruthy();
      expect(handler).toBeInstanceOf(LocalStorageHandler);
    });

    it('should be ready to use immediately', () => {
      expect(() => handler.get('test')).not.toThrow();
      expect(() => handler.set('test', 'value')).not.toThrow();
      expect(() => handler.remove('test')).not.toThrow();
    });
  });

  describe('Basic Storage Operations', () => {
    describe('set() and get()', () => {
      it('should set and get a simple string value', () => {
        const key = 'string-key';
        const value = 'simple string value';
        
        handler.set(key, value);
        
        expect(localStorageSpy.setItem).toHaveBeenCalled();
        const setCall = localStorageSpy.setItem.calls.mostRecent();
        expect(setCall.args[0]).toBe(key);
        
        const storedData = JSON.parse(setCall.args[1]);
        expect(storedData.value).toBe(value);
        expect(storedData.expires).toBeDefined();
      });

      it('should set and get an object value', () => {
        const key = 'object-key';
        const value = { name: 'John', age: 30, active: true };
        
        handler.set(key, value);
        
        const setCall = localStorageSpy.setItem.calls.mostRecent();
        const storedData = JSON.parse(setCall.args[1]);
        expect(storedData.value).toEqual(value);
      });

      it('should set and get an array value', () => {
        const key = 'array-key';
        const value = ['item1', 'item2', { nested: 'object' }];
        
        handler.set(key, value);
        
        const setCall = localStorageSpy.setItem.calls.mostRecent();
        const storedData = JSON.parse(setCall.args[1]);
        expect(storedData.value).toEqual(value);
      });

      it('should get stored value correctly', () => {
        const key = 'get-test';
        const value = 'stored value';
        const expirationDate = new Date(Date.now() + 86400000); // 1 day from now
        
        const storedData = {
          value: value,
          expires: expirationDate.toISOString()
        };
        
        localStorageSpy.getItem.and.returnValue(JSON.stringify(storedData));
        
        const result = handler.get(key);
        expect(result).toBe(value);
        expect(localStorageSpy.getItem).toHaveBeenCalledWith(key);
      });

      it('should return null for non-existent key', () => {
        localStorageSpy.getItem.and.returnValue(null);
        
        const result = handler.get('non-existent-key');
        expect(result).toBeNull();
      });

      it('should handle localStorage quota exceeded gracefully', () => {
        localStorageSpy.setItem.and.throwError('QuotaExceededError');
        
        expect(() => handler.set('key', 'value')).not.toThrow();
        // The implementation should handle the error gracefully
      });
    });

    describe('remove()', () => {
      it('should remove an existing key', () => {
        const key = 'key-to-remove';
        
        handler.remove(key);
        
        expect(localStorageSpy.removeItem).toHaveBeenCalledWith(key);
      });

      it('should handle removing non-existent key', () => {
        const key = 'non-existent-key';
        
        expect(() => handler.remove(key)).not.toThrow();
        expect(localStorageSpy.removeItem).toHaveBeenCalledWith(key);
      });

      it('should not affect other keys when removing one key', () => {
        handler.remove('specific-key');
        
        expect(localStorageSpy.removeItem).toHaveBeenCalledWith('specific-key');
        expect(localStorageSpy.removeItem).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Expiration Handling', () => {
    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date('2023-01-01T12:00:00Z'));
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should set default expiration when not provided', () => {
      const key = 'default-expiry';
      const value = 'test value';
      
      handler.set(key, value);
      
      const setCall = localStorageSpy.setItem.calls.mostRecent();
      const storedData = JSON.parse(setCall.args[1]);
      
      // Should have expiration set to some future date
      expect(storedData.expires).toBeDefined();
      expect(new Date(storedData.expires).getTime()).toBeGreaterThan(Date.now());
    });

    it('should use custom expiration date when provided', () => {
      const key = 'custom-expiry';
      const value = 'test value';
      const customExpiration = new Date('2023-12-31T23:59:59Z');
      
      handler.set(key, value, customExpiration);
      
      const setCall = localStorageSpy.setItem.calls.mostRecent();
      const storedData = JSON.parse(setCall.args[1]);
      
      expect(storedData.expires).toBe(customExpiration.toISOString());
    });

    it('should return null for expired items', () => {
      const key = 'expired-item';
      const value = 'expired value';
      const expiredDate = new Date('2022-12-31T23:59:59Z'); // Past date
      
      const storedData = {
        value: value,
        expires: expiredDate.toISOString()
      };
      
      localStorageSpy.getItem.and.returnValue(JSON.stringify(storedData));
      
      const result = handler.get(key);
      expect(result).toBeNull();
      
      // Should also remove the expired item
      expect(localStorageSpy.removeItem).toHaveBeenCalledWith(key);
    });

    it('should return value for non-expired items', () => {
      const key = 'valid-item';
      const value = 'valid value';
      const futureDate = new Date('2023-12-31T23:59:59Z'); // Future date
      
      const storedData = {
        value: value,
        expires: futureDate.toISOString()
      };
      
      localStorageSpy.getItem.and.returnValue(JSON.stringify(storedData));
      
      const result = handler.get(key);
      expect(result).toBe(value);
      expect(localStorageSpy.removeItem).not.toHaveBeenCalled();
    });

    it('should handle items without expiration gracefully', () => {
      const key = 'no-expiry';
      const value = 'persistent value';
      
      // Old format without expiration
      const storedData = { value: value };
      
      localStorageSpy.getItem.and.returnValue(JSON.stringify(storedData));
      
      const result = handler.get(key);
      expect(result).toBe(value);
    });
  });

  describe('Data Type Handling', () => {
    it('should handle null values', () => {
      const key = 'null-value';
      const value = null;
      
      handler.set(key, value);
      
      const setCall = localStorageSpy.setItem.calls.mostRecent();
      const storedData = JSON.parse(setCall.args[1]);
      expect(storedData.value).toBeNull();
    });

    it('should handle undefined values', () => {
      const key = 'undefined-value';
      const value = undefined as any; // Cast to allow undefined
      
      handler.set(key, value);
      
      const setCall = localStorageSpy.setItem.calls.mostRecent();
      const storedData = JSON.parse(setCall.args[1]);
      expect(storedData.value).toBeUndefined();
    });

    it('should handle boolean values', () => {
      const key = 'boolean-value';
      
      handler.set(key, true);
      let setCall = localStorageSpy.setItem.calls.mostRecent();
      let storedData = JSON.parse(setCall.args[1]);
      expect(storedData.value).toBe(true);
      
      handler.set(key, false);
      setCall = localStorageSpy.setItem.calls.mostRecent();
      storedData = JSON.parse(setCall.args[1]);
      expect(storedData.value).toBe(false);
    });

    it('should handle numeric values', () => {
      const key = 'numeric-value';
      
      // Integer
      handler.set(key, 42);
      let setCall = localStorageSpy.setItem.calls.mostRecent();
      let storedData = JSON.parse(setCall.args[1]);
      expect(storedData.value).toBe(42);
      
      // Float
      handler.set(key, 3.14159);
      setCall = localStorageSpy.setItem.calls.mostRecent();
      storedData = JSON.parse(setCall.args[1]);
      expect(storedData.value).toBe(3.14159);
      
      // Zero
      handler.set(key, 0);
      setCall = localStorageSpy.setItem.calls.mostRecent();
      storedData = JSON.parse(setCall.args[1]);
      expect(storedData.value).toBe(0);
    });

    it('should handle complex nested objects', () => {
      const key = 'complex-object';
      const value = {
        user: {
          id: 123,
          name: 'John Doe',
          preferences: {
            theme: 'dark',
            notifications: {
              email: true,
              push: false,
              sms: null
            }
          },
          tags: ['admin', 'user', 'premium']
        },
        metadata: {
          created: '2023-01-01T00:00:00Z',
          version: 1.2
        }
      };
      
      handler.set(key, value);
      
      const setCall = localStorageSpy.setItem.calls.mostRecent();
      const storedData = JSON.parse(setCall.args[1]);
      expect(storedData.value).toEqual(value);
    });

    it('should handle special string characters', () => {
      const key = 'special-chars';
      const value = 'String with "quotes", \\backslashes\\, \n newlines, and 🚀 emojis';
      
      handler.set(key, value);
      
      const setCall = localStorageSpy.setItem.calls.mostRecent();
      const storedData = JSON.parse(setCall.args[1]);
      expect(storedData.value).toBe(value);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle corrupted JSON data gracefully', () => {
      const key = 'corrupted-data';
      localStorageSpy.getItem.and.returnValue('invalid-json-{');
      
      const result = handler.get(key);
      expect(result).toBeNull();
    });

    it('should handle localStorage being unavailable', () => {
      // Simulate localStorage not being available
      Object.defineProperty(window, 'localStorage', {
        value: null,
        writable: true
      });
      
      const newHandler = new LocalStorageHandler();
      
      expect(() => newHandler.set('key', 'value')).not.toThrow();
      expect(() => newHandler.get('key')).not.toThrow();
      expect(() => newHandler.remove('key')).not.toThrow();
    });

    it('should handle localStorage throwing errors', () => {
      localStorageSpy.getItem.and.throwError('SecurityError');
      localStorageSpy.setItem.and.throwError('SecurityError');
      localStorageSpy.removeItem.and.throwError('SecurityError');
      
      expect(() => handler.get('key')).not.toThrow();
      expect(() => handler.set('key', 'value')).not.toThrow();
      expect(() => handler.remove('key')).not.toThrow();
    });

    it('should handle empty string keys', () => {
      const key = '';
      const value = 'empty key value';
      
      expect(() => handler.set(key, value)).not.toThrow();
      expect(() => handler.get(key)).not.toThrow();
      expect(() => handler.remove(key)).not.toThrow();
    });

    it('should handle very long keys', () => {
      const key = 'a'.repeat(1000); // Very long key
      const value = 'long key value';
      
      expect(() => handler.set(key, value)).not.toThrow();
      expect(() => handler.get(key)).not.toThrow();
      expect(() => handler.remove(key)).not.toThrow();
    });

    it('should handle very large values', () => {
      const key = 'large-value';
      const value = 'x'.repeat(100000); // Large value
      
      expect(() => handler.set(key, value)).not.toThrow();
    });
  });

  describe('Compatibility and API Surface', () => {
    it('should provide the same public API as expected', () => {
      expect(typeof handler.get).toBe('function');
      expect(typeof handler.set).toBe('function');
      expect(typeof handler.remove).toBe('function');
    });

    it('should maintain method signatures compatible with old library', () => {
      // Test that methods accept the expected parameters
      expect(() => handler.get('key')).not.toThrow();
      expect(() => handler.set('key', 'value')).not.toThrow();
      expect(() => handler.set('key', 'value', new Date())).not.toThrow();
      expect(() => handler.remove('key')).not.toThrow();
    });

    it('should handle the same data format as the old library', () => {
      // Test that it can read data in the format the old library would store
      const key = 'legacy-format';
      const value = 'legacy value';
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
      
      const legacyData = {
        value: value,
        expires: expires.toISOString()
      };
      
      localStorageSpy.getItem.and.returnValue(JSON.stringify(legacyData));
      
      const result = handler.get(key);
      expect(result).toBe(value);
    });
  });

  describe('Performance and Optimization', () => {
    it('should minimize localStorage calls', () => {
      const key = 'performance-test';
      const value = 'test value';
      
      handler.set(key, value);
      
      // Should only call setItem once per set operation
      expect(localStorageSpy.setItem).toHaveBeenCalledTimes(1);
      
      handler.get(key);
      handler.get(key);
      
      // Should call getItem for each get operation (no caching at this level)
      expect(localStorageSpy.getItem).toHaveBeenCalledTimes(2);
    });

    it('should handle rapid consecutive operations', () => {
      const baseKey = 'rapid-test-';
      
      // Rapid set operations
      for (let i = 0; i < 10; i++) {
        handler.set(baseKey + i, `value-${i}`);
      }
      
      expect(localStorageSpy.setItem).toHaveBeenCalledTimes(10);
      
      // Rapid get operations
      localStorageSpy.getItem.calls.reset();
      for (let i = 0; i < 10; i++) {
        handler.get(baseKey + i);
      }
      
      expect(localStorageSpy.getItem).toHaveBeenCalledTimes(10);
    });
  });
});