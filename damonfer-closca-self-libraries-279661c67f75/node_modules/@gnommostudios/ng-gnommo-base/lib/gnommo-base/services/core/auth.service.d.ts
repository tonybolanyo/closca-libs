import { CookieStorage } from '../../storage/storage.handler';
import { AuthToken } from '../../models/auth-token.model';
export declare class AuthService {
    protected storage: CookieStorage;
    private token;
    constructor(storage: CookieStorage);
    getToken(): AuthToken;
    setToken(tokenId: string): void;
    removeToken(): void;
    persist(token_property: string, value: any, expires?: Date): void;
    expiresTime(): Date;
    private addDays(date, days);
}
