import { Injectable } from '@angular/core';
import { BaseStorage } from './storage.handler';
import { StorageValue } from '../interfaces/http-types.interface';

@Injectable()
export class CookieHandler extends BaseStorage {
  
  get(key: string): StorageValue {
    const nameEQ = key + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length);
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
    }
    return null;
  }

  set(key: string, value: StorageValue, expires?: Date): void {
    let cookie = key + '=' + (typeof value === 'object' ? JSON.stringify(value) : String(value));
    if (expires) {
      cookie += '; expires=' + expires.toUTCString();
    }
    cookie += '; path=/';
    document.cookie = cookie;
  }

  remove(key: string): void {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}