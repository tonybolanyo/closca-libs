import { AuthTokenInterface } from '../interfaces/auth-token.interface';
export declare class AuthToken implements AuthTokenInterface {
    id: any;
    ttl: any;
    created: any;
    userId: any;
    constructor(data?: AuthTokenInterface);
}
