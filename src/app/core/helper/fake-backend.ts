import { Injectable, Optional } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {User} from "../models/user.model";
import {Product} from "../models/product.model";
import {USERS} from "../mocks/mock-users";
import { PRODUCT } from '../mocks/mock-producto';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  foundGet = [];
  foundDelete

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    
    return of(null).pipe(mergeMap(() => {

     
      if (request.url.endsWith('/api/authenticate/login') && request.method === 'POST') {
        let params = request.body;

        
        let found: User = USERS.find((user: User) => {return (params.username === user.username);});
        if (found) {
          if(params.password === found.password) {
            return of(new HttpResponse({status: 200, body: {token: 'fake-token-jwt', user: found}}));
          }else{
            return throwError({code: 2, message: 'El password no es el correcto '});
          }
        } else {
          return throwError({code: 1, message: 'El usuario no existe'});
        }

      }

      if (request.url.endsWith('/api/authenticate/logout') && request.method === 'POST') {
        return of(new HttpResponse({status: 200, body: true}));
      }

      if (request.url.endsWith('/api/getAllProduct') && request.method === 'GET') {        
        this.foundGet = PRODUCT.map((product: Product) => {return product;});
        if (this.foundGet) {
          return of(new HttpResponse({status: 200, body: this.foundGet}));
        }else{
          return of(new HttpResponse({status: 400, body: 'Error'}));
        }
        
      }
      if (request.url.endsWith('/api/deleteProduct') && request.method === 'POST') {        
        let params = request.body; 
        let id = params.id;
        let all = params.valor;
        let valornuevo = []
        
        
        for (let i = 0; i < all.length; i++) {                   
          if(all[i].id == id){  
            delete all[i];
          }else{
            valornuevo.push(all[i])
          }
        }
        //console.log('this.foundGet:DELETE '+ JSON.stringify(valornuevo));
        return of(new HttpResponse({status: 200, body: valornuevo}));  
      }
      if (request.url.endsWith('/api/updateProduct') && request.method === 'PUT') {
        this.foundGet = [];
        let params = request.body;  
        let id = params.id;
        let body = params.body;
        this.foundGet = PRODUCT.map((product: Product) => {return product;});
        for (let i = 0; i < this.foundGet.length; i++) {                   
          if(this.foundGet[i].id == id){            
            this.foundGet[i].name = body.name
            this.foundGet[i].amount = body.amount
            this.foundGet[i].store = body.store
            this.foundGet[i].type = body.type
          }
        }
        
        return of(new HttpResponse({status: 200, body: this.foundGet}));        
      }
      if (request.url.endsWith('/api/createProduct') && request.method === 'POST') {
        this.foundGet = [];
        let params = request.body;
        this.foundGet = PRODUCT.map((product: Product) => {return product;});
        let id = this.foundGet.length + 1;

        this.foundGet.push({
          'id': id,
          'name': params.name,
          'amount': params.amount,
          'store': params.store,
          'type': params.type,
        })
        return of(new HttpResponse({status: 200, body: this.foundGet}));
        
      }

      
      return next.handle(request);

    }))

    
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = { 
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
