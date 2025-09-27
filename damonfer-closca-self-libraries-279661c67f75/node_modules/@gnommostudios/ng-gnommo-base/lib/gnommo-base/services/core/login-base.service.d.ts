import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../../models/base.model';
import { BaseService } from './base.service';
export declare class LoginBaseService<T extends BaseModel> extends BaseService<T> {
    protected http: HttpClient;
    protected url: string;
    protected endpoint: string;
    constructor(http: HttpClient, url: string, endpoint: string);
    login(credentials: any, headers?: any): Observable<any>;
    passwordRecovery(email: any, headers?: any): Observable<any>;
    resetPassword(newPassword: any, hash: any, headers?: any): Observable<any>;
    getCurrentUser(token: any, headers?: any): Observable<T>;
    register(item: T, headers?: any): Observable<T>;
}
