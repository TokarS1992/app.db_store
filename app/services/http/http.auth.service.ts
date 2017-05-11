import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestMethod } from '@angular/http';
import { HttpService, IApiResponse, IUrls } from './http.service';
import { IAuth } from '../../models/auth/auth.interface';

interface IAuthEvents {
    registrate(data: Object): Observable<IResponseAuth>,
    authentificated(data: Object): Observable<IResponseAuth>,
    logout(): Observable<IResponseAuth>,
    getSession() : Observable<IResponseAuth>
}

interface IResponseAuth extends IApiResponse<IAuth> {
    redirectTo: string,
    newUser: boolean,
    userPass: boolean,
    authenticated: boolean
}

@Injectable()
export class HttpAuthService extends HttpService implements IAuthEvents {

    constructor( http: Http ) {
        super(http)
    }

    public urlsAuth: IUrls = [
        { name: "/api/registrate" },
        { name: "/api/login" },
        { name: "/api/logout" },
        { name: "/api/session" }
    ]

    public registrate(data: Object): Observable<IResponseAuth> {
        return <Observable<IResponseAuth>> super.apiRequest( RequestMethod.Post, this.urlsAuth[0].name, data );
    }

    public authentificated(data: Object): Observable<IResponseAuth> {
        return <Observable<IResponseAuth>> super.apiRequest( RequestMethod.Post, this.urlsAuth[1].name, data );
    }

    public logout(): Observable<IResponseAuth> {
        return <Observable<IResponseAuth>> super.apiRequest( RequestMethod.Get, this.urlsAuth[2].name, null );
    }

    public getSession() : Observable<IResponseAuth> {
        return <Observable<IResponseAuth>> super.apiRequest( RequestMethod.Get, this.urlsAuth[3].name, null );
    }

}