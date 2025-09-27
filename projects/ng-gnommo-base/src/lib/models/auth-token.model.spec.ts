import { AuthToken } from './auth-token.model';
import { AuthTokenInterface } from '../interfaces/auth-token.interface';

describe('AuthToken', () => {
  let token: AuthToken;

  it('should create an instance without data', () => {
    token = new AuthToken();
    expect(token).toBeTruthy();
    expect(token.id).toBeUndefined();
    expect(token.ttl).toBeUndefined();
    expect(token.created).toBeUndefined();
  });

  it('should create an instance with data', () => {
    const testData: AuthTokenInterface = {
      id: 'test-token-id',
      ttl: 3600,
      created: new Date()
    };

    token = new AuthToken(testData);
    expect(token).toBeTruthy();
    expect(token.id).toBe('test-token-id');
    expect(token.ttl).toBe(3600);
    expect(token.created).toBe(testData.created);
  });

  it('should have userId property', () => {
    token = new AuthToken();
    expect(token.userId).toBeUndefined();
    token.userId = 'user-123';
    expect(token.userId).toBe('user-123');
  });
});