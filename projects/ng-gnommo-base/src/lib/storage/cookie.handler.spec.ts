import { CookieHandler } from './cookie.handler';

describe('CookieHandler', () => {
  let handler: CookieHandler;

  beforeEach(() => {
    handler = new CookieHandler();
    // Clear all cookies before each test
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  });

  it('should create an instance', () => {
    expect(handler).toBeTruthy();
  });

  it('should set and get a simple string value', () => {
    handler.set('test-key', 'test-value');
    const value = handler.get('test-key');
    expect(value).toBe('test-value');
  });

  it('should set and get an object value', () => {
    const testObj = { name: 'test', value: 123 };
    handler.set('test-obj', testObj);
    const retrievedObj = handler.get('test-obj');
    expect(retrievedObj).toEqual(testObj);
  });

  it('should return null for non-existent key', () => {
    const value = handler.get('non-existent-key');
    expect(value).toBeNull();
  });

  it('should remove a cookie', () => {
    handler.set('test-remove', 'value');
    expect(handler.get('test-remove')).toBe('value');
    
    handler.remove('test-remove');
    expect(handler.get('test-remove')).toBeNull();
  });
});