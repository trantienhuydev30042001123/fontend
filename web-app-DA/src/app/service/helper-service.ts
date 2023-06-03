import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import {environment} from "../../environment/environment.pord";
import {Injectable} from "@angular/core";
import {catchError, Observable, of} from "rxjs";
import {productDTO} from "../dto/ProductDTO";
@Injectable({
  providedIn:'root'
})
export class HelperService {
  httpOptions: any;
  baseURL = `${environment.API_LOCAL}/`;
  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenService
  ) {
  }
  public getAllSearch( apiURL : string,searchKey : string,startprice : number,endPrice : number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.baseURL + apiURL + "?searchKey=" + searchKey + "&startprice=" + startprice + "&endPrice=" + endPrice , this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public getAll( apiURL : string,) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.baseURL + apiURL , this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public findInfoById(apiURL: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.baseURL + apiURL + "/" + id, this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public findProductByCategory(apiURL: string, catId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.baseURL + apiURL + "/" + catId, this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public add( apiURL: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.baseURL + apiURL + "/" + id, this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }


  getDetail(id: string | null): Observable<productDTO> {
    const url = `${this.baseURL}${id}`;
    return this.httpClient.get<productDTO>(url).pipe(
    );
  }
  public getAllproduct() {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.baseURL + "product" , this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public deleteById(apiURL: string, entity: any,): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.baseURL + apiURL + "/" + entity, this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
