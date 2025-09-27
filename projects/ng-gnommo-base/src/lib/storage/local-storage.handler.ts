import { Injectable } from '@angular/core';
import { BaseStorage } from './storage.handler';

@Injectable()
export class LocalStorageHandler extends BaseStorage {
  
  get(key: string): any {
    if (typeof Storage !== 'undefined') {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
    }
    return null;
  }

  set(key: string, value: any, expires?: Date): void {
    if (typeof Storage !== 'undefined') {
      const storageValue = typeof value === 'object' ? JSON.stringify(value) : value;
      localStorage.setItem(key, storageValue);
      
      // Handle expiration by storing timestamp if expires is provided
      if (expires) {
        localStorage.setItem(key + '_expires', expires.getTime().toString());
      }
    }
  }

  remove(key: string): void {
    if (typeof Storage !== 'undefined') {
      localStorage.removeItem(key);
      localStorage.removeItem(key + '_expires');
    }
  }
}