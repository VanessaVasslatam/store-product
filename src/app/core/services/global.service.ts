import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class GlobalService {
    constructor(private http: HttpClient) { }
    
    private basePathGetAll= '/api/getAllProduct';
    private basePathPostId= '/api/deleteProduct';
    private basePathPutUp= '/api/updateProduct';
    private basePathCrate= '/api/createProduct';

    
    updateItemProduct(id: number, request: any) : Observable<any>{
        return this.http.put(this.basePathPutUp,  {'id': id, 'body': request }, { responseType: 'text' });
      }
    createItemProduct(request: any): Observable<any> {
        return this.http.post(this.basePathCrate, request)
    }
}