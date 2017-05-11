import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, RequestMethod } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Models
import * as models from '../../models/index';
import { Product } from "../../models/product";

export interface IApiResponse<T> extends Response {
  success: boolean;
  message: string;
  data: Array<T>;
}

interface ICatalogApiService {
    getAllCatalog(): Observable<IApiResponse<models.Product>>,
    getProductById(id: number): Observable<IApiResponse<models.Product>>,
    deleteProductById(data: Object): Observable<IApiResponse<models.Product>>,
    createNewProduct(newProduct: Product): Observable<IApiResponse<Product>>
}

interface ICategoriesApiService {
    getAllCategories(): Observable<IApiResponse<models.Categories>>
}

export interface IUrls {
    [ index: number ]: { name: string }
}

@Injectable()
export class HttpService implements ICatalogApiService, ICategoriesApiService{

    constructor( private http: Http ) { }
    
    public urls: IUrls = [
        { name: "/api/catalog" },
        { name: "/api/categories" }
    ]

    private headers: Headers = new Headers( {'Content-Type': 'application/json'} );

    public getData(url: any) {
        return this.http.get(url);
    }
    
    public getAllCatalog() : Observable<IApiResponse<models.Product>> {
        return <Observable<IApiResponse<models.Product>>> this.apiRequest( RequestMethod.Get, this.urls[0].name, null )
    }

    public getProductById(id: number): Observable<IApiResponse<models.Product>> {
        return <Observable<IApiResponse<models.Product>>> this.apiRequest(RequestMethod.Get, this.urls[0].name + '/' + id, null);
    }
    
    public deleteProductById(data: Object) : Observable<IApiResponse<models.Product>> {
        return <Observable<IApiResponse<models.Product>>> this.apiRequest(RequestMethod.Delete, this.urls[0].name + '/delete', data);
    }

    public  createNewProduct(newProduct: Product): Observable<IApiResponse<Product>> {
        return <Observable<IApiResponse<Product>>> this.apiRequest(RequestMethod.Post, this.urls[0].name, JSON.stringify(newProduct));
    }

    public getAllCategories() : Observable<IApiResponse<models.Categories>>  {
        return <Observable<IApiResponse<models.Categories>>> this.apiRequest( RequestMethod.Get, this.urls[1].name, null )
    }

    // public checkAuthAdmin() : 

    // Success handle
    private extractData(response: Response): Observable<Response> {
        if(response.status < 200 || response.status >= 300){
          throw new Error('Bad response status: ' + response.status);
        }
        return response.json();
    }

    //Error handler
    private handleError(error: any = 'Server Error') {
        console.error(error.message);
        console.log("Something went wrong while trying to access the url provided");
        return Observable.throw(error.message);
    }
    
    // Request to the server
    public apiRequest(method: RequestMethod, url: string, body: any) : Observable<Response> {
        return this.http.request( url, { body, method, headers: this.headers } )
            .map(this.extractData)
            .catch(this.handleError)
    }
}