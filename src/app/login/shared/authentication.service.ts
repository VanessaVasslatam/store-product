import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LoginObject} from "./login-object.model";
import {Session} from "../../core/models/session.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  private basePath = '/api/authenticate/';
  private basePathGetAll= '/api/getAllProduct';
  private basePathPostId= '/api/deleteProduct';
  private basePathPutUp= '/api/updateProduct';
  private basePathCrate= '/api/createProduct';

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(this.basePath + 'login', loginObj);
  }

  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(this.basePath + 'logout', {});
  }  

  getAllProduct(): Observable<any> {
    return this.http.get(this.basePathGetAll);
  }
  deleteItemProdct(id: number,valor): Observable<any> {
    return this.http.post(this.basePathPostId, {'id':id,'valor':valor})
  }
  
  updateItemProduct(id: number, request: any) : Observable<any>{
    return this.http.put(this.basePathPutUp, request, { responseType: 'text' });
  }
  createItemProduct(request: any): Observable<any> {
    return this.http.post(this.basePathCrate, request)
  }

}