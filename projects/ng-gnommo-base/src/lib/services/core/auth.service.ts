import { Injectable } from '@angular/core';
// import { CookieStorage } from '../../storage/storage.handler';
import { AuthToken } from '../../models/auth-token.model';
import { LocalStorageHandler } from '../../storage/local-storage.handler';
import { StorageValue } from '../../interfaces/http-types.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: AuthToken | null = null;
  private storage: LocalStorageHandler;

  constructor() {
    this.storage = new LocalStorageHandler();
  }

  getToken(): AuthToken {
    if (!this.token) {
      const tokenData = this.storage.get('access_token');
      if (tokenData && typeof tokenData === 'object') {
        this.token = new AuthToken(tokenData as Record<string, unknown>);
      } else {
        this.token = new AuthToken();
      }
    }
    return this.token;
  }

  setToken(tokenId: string): void {
    const tokenData = {
      id: tokenId,
      created: new Date(),
      ttl: this.expiresTime().getTime()
    };
    this.token = new AuthToken(tokenData);
    this.storage.set('access_token', tokenData, this.expiresTime());
  }

  removeToken(): void {
    this.token = null;
    this.storage.remove('access_token');
  }

  persist(token_property: string, value: StorageValue, expires?: Date): void {
    const expirationDate = expires || this.expiresTime();
    this.storage.set(token_property, value, expirationDate);
  }

  expiresTime(): Date {
    return this.addDays(new Date(), 7); // Default 7 days expiration
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}