import { AuthToken } from './auth-token.model';
import { AuthTokenInterface } from '../interfaces/auth-token.interface';

describe('AuthToken', () => {
  describe('Construction and Initialization', () => {
    it('should create an instance without parameters', () => {
      const token = new AuthToken();
      expect(token).toBeTruthy();
      expect(token).toBeInstanceOf(AuthToken);
    });

    it('should create with undefined properties when no data provided', () => {
      const token = new AuthToken();
      expect(token.id).toBeUndefined();
      expect(token.created).toBeUndefined();
      expect(token.ttl).toBeUndefined();
      expect(token.userId).toBeUndefined();
    });

    it('should create with data object matching AuthTokenInterface', () => {
      const data: AuthTokenInterface = {
        id: 'test-token-123',
        created: new Date('2023-01-01T00:00:00Z'),
        ttl: 1672588800000
      };
      
      const token = new AuthToken(data);
      expect(token.id).toBe('test-token-123');
      expect(token.created).toEqual(new Date('2023-01-01T00:00:00Z'));
      expect(token.ttl).toBe(1672588800000);
    });

    it('should handle empty data object', () => {
      const token = new AuthToken({});
      expect(token.id).toBeUndefined();
      expect(token.created).toBeUndefined();
      expect(token.ttl).toBeUndefined();
      expect(token.userId).toBeUndefined();
    });

    it('should handle partial data object', () => {
      const token1 = new AuthToken({ id: 'partial-token' });
      expect(token1.id).toBe('partial-token');
      expect(token1.created).toBeUndefined();
      expect(token1.ttl).toBeUndefined();

      const token2 = new AuthToken({ created: new Date('2023-06-01') });
      expect(token2.id).toBeUndefined();
      expect(token2.created).toEqual(new Date('2023-06-01'));
      expect(token2.ttl).toBeUndefined();

      const token3 = new AuthToken({ ttl: 1687392000000 });
      expect(token3.id).toBeUndefined();
      expect(token3.created).toBeUndefined();
      expect(token3.ttl).toBe(1687392000000);
    });
  });

  describe('Property Handling', () => {
    describe('id property', () => {
      it('should handle string IDs', () => {
        const token = new AuthToken({ id: 'string-token-id' });
        expect(token.id).toBe('string-token-id');
        expect(typeof token.id).toBe('string');
      });

      it('should handle empty string ID', () => {
        const token = new AuthToken({ id: '' });
        expect(token.id).toBe('');
      });

      it('should handle null ID', () => {
        const token = new AuthToken({ id: null as any });
        expect(token.id).toBeNull();
      });

      it('should handle undefined ID', () => {
        const token = new AuthToken({ id: undefined });
        expect(token.id).toBeUndefined();
      });

      it('should handle JWT-like token IDs', () => {
        const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const token = new AuthToken({ id: jwtToken });
        expect(token.id).toBe(jwtToken);
        expect(token.id!.includes('.')).toBe(true);
      });

      it('should handle very long token IDs', () => {
        const longId = 'a'.repeat(2000);
        const token = new AuthToken({ id: longId });
        expect(token.id).toBe(longId);
        expect(token.id!.length).toBe(2000);
      });

      it('should handle special characters in ID', () => {
        const specialId = 'token-with.special+characters_123/456=789!@#$%^&*()';
        const token = new AuthToken({ id: specialId });
        expect(token.id).toBe(specialId);
      });
    });

    describe('created property', () => {
      it('should handle Date objects', () => {
        const createdDate = new Date('2023-03-15T14:30:00Z');
        const token = new AuthToken({ created: createdDate });
        expect(token.created).toEqual(createdDate);
        expect(token.created).toBeInstanceOf(Date);
      });

      it('should handle current date', () => {
        const now = new Date();
        const token = new AuthToken({ created: now });
        expect(token.created).toEqual(now);
      });

      it('should handle very old dates', () => {
        const oldDate = new Date('1970-01-01T00:00:00Z');
        const token = new AuthToken({ created: oldDate });
        expect(token.created).toEqual(oldDate);
      });

      it('should handle future dates', () => {
        const futureDate = new Date('2030-12-31T23:59:59Z');
        const token = new AuthToken({ created: futureDate });
        expect(token.created).toEqual(futureDate);
      });

      it('should handle invalid Date objects', () => {
        const invalidDate = new Date('invalid-date-string');
        const token = new AuthToken({ created: invalidDate });
        expect(token.created).toEqual(invalidDate);
        expect(isNaN(token.created!.getTime())).toBe(true);
      });

      it('should handle null created date', () => {
        const token = new AuthToken({ created: null as any });
        expect(token.created).toBeNull();
      });
    });

    describe('ttl property', () => {
      it('should handle numeric TTL values', () => {
        const ttlValue = 1672588800000;
        const token = new AuthToken({ ttl: ttlValue });
        expect(token.ttl).toBe(ttlValue);
        expect(typeof token.ttl).toBe('number');
      });

      it('should handle zero TTL', () => {
        const token = new AuthToken({ ttl: 0 });
        expect(token.ttl).toBe(0);
      });

      it('should handle negative TTL (expired)', () => {
        const token = new AuthToken({ ttl: -1 });
        expect(token.ttl).toBe(-1);
      });

      it('should handle very large TTL values', () => {
        const largeTtl = Number.MAX_SAFE_INTEGER;
        const token = new AuthToken({ ttl: largeTtl });
        expect(token.ttl).toBe(largeTtl);
      });

      it('should handle decimal TTL values', () => {
        const decimalTtl = 1672588800123.456;
        const token = new AuthToken({ ttl: decimalTtl });
        expect(token.ttl).toBe(decimalTtl);
      });

      it('should handle null TTL', () => {
        const token = new AuthToken({ ttl: null as any });
        expect(token.ttl).toBeNull();
      });

      it('should handle NaN TTL', () => {
        const token = new AuthToken({ ttl: NaN });
        expect(token.ttl).toBeNaN();
      });

      it('should handle Infinity TTL', () => {
        const token = new AuthToken({ ttl: Infinity });
        expect(token.ttl).toBe(Infinity);
      });
    });

    describe('userId property', () => {
      it('should handle userId assignment', () => {
        const token = new AuthToken();
        expect(token.userId).toBeUndefined();
        
        token.userId = 'user-123';
        expect(token.userId).toBe('user-123');
      });

      it('should handle numeric userId', () => {
        const token = new AuthToken();
        token.userId = '12345'; // Store as string for consistency
        expect(token.userId).toBe('12345');
      });

      it('should handle null userId', () => {
        const token = new AuthToken();
        token.userId = null as any;
        expect(token.userId).toBeNull();
      });

      it('should handle empty string userId', () => {
        const token = new AuthToken();
        token.userId = '';
        expect(token.userId).toBe('');
      });

      it('should allow userId deletion', () => {
        const token = new AuthToken();
        token.userId = 'temp-user';
        expect(token.userId).toBe('temp-user');
        
        delete token.userId;
        expect(token.userId).toBeUndefined();
      });
    });
  });

  describe('Complex Data Scenarios', () => {
    it('should handle complete token data structure', () => {
      const completeData: AuthTokenInterface = {
        id: 'complete-token-abc123',
        created: new Date('2023-06-15T10:30:00Z'),
        ttl: 1687692600000
      };

      const token = new AuthToken(completeData);
      token.userId = 'user-456';
      
      expect(token.id).toBe(completeData.id);
      expect(token.created).toEqual(completeData.created);
      expect(token.ttl).toBe(completeData.ttl);
      expect(token.userId).toBe('user-456');
    });

    it('should handle real-world token scenarios', () => {
      // Scenario 1: Fresh token from authentication
      const freshToken = new AuthToken({
        id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fresh-token-payload.signature',
        created: new Date(),
        ttl: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days from now
      });
      freshToken.userId = 'authenticated-user-123';

      expect(freshToken.id).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
      expect(freshToken.created instanceof Date).toBe(true);
      expect(freshToken.ttl).toBeGreaterThan(Date.now());
      expect(freshToken.userId).toBe('authenticated-user-123');

      // Scenario 2: Expired token from storage
      const expiredToken = new AuthToken({
        id: 'expired-token-123',
        created: new Date('2023-01-01T00:00:00Z'),
        ttl: new Date('2023-01-08T00:00:00Z').getTime()
      });

      expect(expiredToken.id).toBe('expired-token-123');
      expect(expiredToken.ttl).toBeLessThan(Date.now());

      // Scenario 3: Token from refresh operation
      const refreshedToken = new AuthToken({
        id: 'refreshed-token-456',
        created: new Date(),
        ttl: Date.now() + (24 * 60 * 60 * 1000) // 1 day from now
      });
      refreshedToken.userId = 'existing-user-789';

      expect(refreshedToken.id).toBe('refreshed-token-456');
      expect(refreshedToken.userId).toBe('existing-user-789');
    });

    it('should handle tokens from different storage sources', () => {
      // From localStorage
      const localStorageData = {
        id: 'local-storage-token',
        created: new Date('2023-05-01T00:00:00Z'),
        ttl: 1683763200000
      };
      const localToken = new AuthToken(localStorageData);
      expect(localToken.id).toBe('local-storage-token');

      // From cookie
      const cookieData = {
        id: 'cookie-token',
        created: new Date('2023-05-02T00:00:00Z'),
        ttl: 1683849600000
      };
      const cookieToken = new AuthToken(cookieData);
      expect(cookieToken.id).toBe('cookie-token');

      // From API response  
      const apiData = {
        id: 'api-response-token',
        created: new Date('2023-05-03T00:00:00Z'),
        ttl: 1683936000000
      };
      const apiToken = new AuthToken(apiData);
      expect(apiToken.id).toBe('api-response-token');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null data parameter', () => {
      expect(() => new AuthToken(null as any)).not.toThrow();
      const token = new AuthToken(null as any);
      expect(token.id).toBeUndefined();
      expect(token.created).toBeUndefined();
      expect(token.ttl).toBeUndefined();
      expect(token.userId).toBeUndefined();
    });

    it('should handle undefined data parameter', () => {
      expect(() => new AuthToken(undefined)).not.toThrow();
      const token = new AuthToken(undefined);
      expect(token.id).toBeUndefined();
      expect(token.created).toBeUndefined();
      expect(token.ttl).toBeUndefined();
      expect(token.userId).toBeUndefined();
    });

    it('should handle data with extra properties', () => {
      const dataWithExtras = {
        id: 'token-with-extras',
        created: new Date('2023-01-01'),
        ttl: 1672588800000,
        extraProp1: 'should be ignored',
        extraProp2: 123,
        extraProp3: { nested: 'object' }
      };

      const token = new AuthToken(dataWithExtras);
      
      expect(token.id).toBe('token-with-extras');
      expect(token.created).toEqual(new Date('2023-01-01'));
      expect(token.ttl).toBe(1672588800000);
      
      // Extra properties should not be set on token instance by constructor
      expect((token as any).extraProp1).toBeUndefined();
      expect((token as any).extraProp2).toBeUndefined();
      expect((token as any).extraProp3).toBeUndefined();
    });

    it('should handle circular reference in data', () => {
      const circularData: any = {
        id: 'circular-token'
      };
      circularData.self = circularData;

      expect(() => new AuthToken(circularData)).not.toThrow();
      const token = new AuthToken(circularData);
      expect(token.id).toBe('circular-token');
    });
  });

  describe('Property Mutation and Immutability', () => {
    it('should allow property modification after creation', () => {
      const token = new AuthToken({ id: 'initial-id' });
      expect(token.id).toBe('initial-id');

      token.id = 'modified-id';
      expect(token.id).toBe('modified-id');
    });

    it('should allow adding properties dynamically', () => {
      const token = new AuthToken();
      
      token.id = 'dynamic-id';
      token.created = new Date('2023-01-01');
      token.ttl = 1672588800000;
      token.userId = 'dynamic-user';

      expect(token.id).toBe('dynamic-id');
      expect(token.created).toEqual(new Date('2023-01-01'));
      expect(token.ttl).toBe(1672588800000);
      expect(token.userId).toBe('dynamic-user');
    });

    it('should handle property deletion', () => {
      const token = new AuthToken({
        id: 'deletable-id',
        created: new Date(),
        ttl: Date.now()
      });
      token.userId = 'deletable-user';

      delete (token as any).id;
      delete token.userId;
      
      expect(token.id).toBeUndefined();
      expect(token.userId).toBeUndefined();
      expect(token.created).toBeDefined(); // Other properties remain
      expect(token.ttl).toBeDefined();
    });
  });

  describe('Compatibility with Old Library', () => {
    it('should be compatible with old AuthToken interface', () => {
      const token = new AuthToken({
        id: 'compatibility-test',
        created: new Date('2023-01-01'),
        ttl: 1672588800000
      });

      // Should have the expected properties from AuthTokenInterface
      expect(token.hasOwnProperty('id')).toBe(true);
      expect(token.hasOwnProperty('created')).toBe(true);
      expect(token.hasOwnProperty('ttl')).toBe(true);

      // Should have correct types
      expect(typeof token.id).toBe('string');
      expect(token.created instanceof Date).toBe(true);
      expect(typeof token.ttl).toBe('number');
    });

    it('should handle old library data format', () => {
      // Old library might have stored data with string dates
      const oldFormatData = {
        id: 'old-format-token',
        created: '2023-01-01T00:00:00.000Z' as any, // String instead of Date
        ttl: 1672588800000
      };

      const token = new AuthToken(oldFormatData);
      
      expect(token.id).toBe('old-format-token');
      expect(token.created).toBe('2023-01-01T00:00:00.000Z' as any); // Should preserve whatever was passed
      expect(token.ttl).toBe(1672588800000);
    });

    it('should create tokens that work with old library expectations', () => {
      const token = new AuthToken({
        id: 'new-library-token',
        created: new Date('2023-06-01T00:00:00Z'),
        ttl: new Date('2023-06-08T00:00:00Z').getTime()
      });
      token.userId = 'compatible-user';

      // Should be useable in contexts where old library tokens were used
      expect(token.id).toBeTruthy();
      expect(token.created).toBeTruthy();
      expect(token.ttl).toBeTruthy();
      expect(token.userId).toBeTruthy();
      
      // Should be serializable (for storage)
      expect(() => JSON.stringify(token)).not.toThrow();
      const serialized = JSON.stringify(token);
      expect(serialized).toContain('"id":"new-library-token"');
      expect(serialized).toContain('"userId":"compatible-user"');
    });
  });

  describe('JSON Serialization and Deserialization', () => {
    it('should serialize to JSON correctly', () => {
      const token = new AuthToken({
        id: 'json-token',
        created: new Date('2023-01-01T00:00:00Z'),
        ttl: 1672588800000
      });
      token.userId = 'json-user';

      const json = JSON.stringify(token);
      expect(json).toContain('"id":"json-token"');
      expect(json).toContain('"created":"2023-01-01T00:00:00.000Z"');
      expect(json).toContain('"ttl":1672588800000');
      expect(json).toContain('"userId":"json-user"');
    });

    it('should be reconstructable from JSON', () => {
      const originalToken = new AuthToken({
        id: 'reconstructable-token',
        created: new Date('2023-01-01T00:00:00Z'),
        ttl: 1672588800000
      });
      originalToken.userId = 'reconstructable-user';

      const json = JSON.stringify(originalToken);
      const parsedData = JSON.parse(json);
      const reconstructedToken = new AuthToken({
        ...parsedData,
        created: new Date(parsedData.created) // Convert string back to Date
      });
      reconstructedToken.userId = parsedData.userId;

      expect(reconstructedToken.id).toBe(originalToken.id);
      expect(reconstructedToken.created).toEqual(originalToken.created);
      expect(reconstructedToken.ttl).toBe(originalToken.ttl);
      expect(reconstructedToken.userId).toBe(originalToken.userId);
    });

    it('should handle partial serialization', () => {
      const partialToken = new AuthToken({ id: 'partial-json' });
      const json = JSON.stringify(partialToken);
      
      expect(json).toContain('"id":"partial-json"');
      expect(json).not.toContain('"created"');
      expect(json).not.toContain('"ttl"');
      expect(json).not.toContain('"userId"');
    });
  });

  describe('Utility and Helper Methods', () => {
    it('should support property enumeration', () => {
      const token = new AuthToken({
        id: 'enumerable-token',
        created: new Date(),
        ttl: Date.now()
      });
      token.userId = 'enumerable-user';

      const keys = Object.keys(token);
      expect(keys).toContain('id');
      expect(keys).toContain('created');
      expect(keys).toContain('ttl');
      expect(keys).toContain('userId');
    });

    it('should work with Object.assign', () => {
      const token = new AuthToken({ id: 'assignable-token' });
      const additionalData = {
        created: new Date('2023-01-01'),
        ttl: 1672588800000,
        userId: 'assigned-user'
      };

      Object.assign(token, additionalData);

      expect(token.id).toBe('assignable-token');
      expect(token.created).toEqual(new Date('2023-01-01'));
      expect(token.ttl).toBe(1672588800000);
      expect(token.userId).toBe('assigned-user');
    });

    it('should work with spread operator', () => {
      const token = new AuthToken({
        id: 'spreadable-token',
        created: new Date('2023-01-01'),
        ttl: 1672588800000
      });
      token.userId = 'spreadable-user';

      const tokenCopy = { ...token };

      expect(tokenCopy.id).toBe('spreadable-token');
      expect(tokenCopy.created).toEqual(new Date('2023-01-01'));
      expect(tokenCopy.ttl).toBe(1672588800000);
      expect(tokenCopy.userId).toBe('spreadable-user');
    });
  });
});