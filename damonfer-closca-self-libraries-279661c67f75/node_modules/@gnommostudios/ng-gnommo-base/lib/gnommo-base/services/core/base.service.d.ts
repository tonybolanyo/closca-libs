import { Observable } from 'rxjs';
import { BaseModel } from '../../models/base.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
export declare abstract class BaseService<T extends BaseModel> {
    protected http: HttpClient;
    protected url: string;
    protected endpoint: string;
    httpOptions: {
        headers: HttpHeaders;
    };
    constructor(http: HttpClient, url: string, endpoint: string);
    getAll(headers?: any): Observable<T[]>;
    getById(_id: string, headers?: any): Observable<T>;
    create(item: T, headers?: any): Observable<T>;
    update(_id: string, item: T, headers?: any): Observable<T>;
    updateComplete(_id: string, item: T, headers?: any): Observable<T>;
    delete(_id: string, headers?: any): Observable<any>;
    createHttpHeaders(headers?: any): {
        headers: HttpHeaders;
    };
    httpHeadersWithoutAuth(headers?: any): {
        headers: HttpHeaders;
    };
}
