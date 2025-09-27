import { BaseModel } from './base.model';

describe('BaseModel', () => {
  let model: BaseModel;

  beforeEach(() => {
    model = new BaseModel();
  });

  it('should create an instance', () => {
    expect(model).toBeTruthy();
  });

  it('should have _id property', () => {
    expect(model._id).toBeUndefined();
    model._id = 'test-id';
    expect(model._id).toBe('test-id');
  });

  it('should have instance property', () => {
    expect(model.instance).toBeUndefined();
    model.instance = { test: 'data' };
    expect(model.instance).toEqual({ test: 'data' });
  });
});