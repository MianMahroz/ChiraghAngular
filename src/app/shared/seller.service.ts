import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { OwnerDetails } from '../SellerForm/owner-details/ownerdetails.model';
import { TokenStorage } from '../core/token.storage';
import { AuthService } from '../core/auth.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class SellerService {

  constructor(private http: HttpClient,private token:TokenStorage,private authService:AuthService) { }
  
  private sellerUrl = 'http://localhost:8084/api/Propertysellerdetails';
  
  public getOwners(propertyId:number): Observable<OwnerDetails[]> {
    return this.http.get<OwnerDetails[]>(this.sellerUrl + '/getOwners/'+propertyId);
  }
  public getPoas(propertyId:number): Observable<OwnerDetails[]> {
    return this.http.get<OwnerDetails[]>(this.sellerUrl + '/getPoas/'+propertyId);
  }
  public addOwner(obj:OwnerDetails): Observable<any> {
    return this.http.post<any>(this.sellerUrl + '/post', obj,httpOptions);
  }
  public updateOwner(obj:OwnerDetails): Observable<any> {
    return this.http.put<any>(this.sellerUrl + '/updateOwner', obj,httpOptions);
  }
  
  public createProperty(userName:string): Observable<any> {
    return this.http.post<any>(this.sellerUrl + '/createProperty', userName,httpOptions);
}

saveDocument(name:string,file: File): Observable<any> {
  let formdata: FormData = new FormData();
  formdata.append('file', file);
  const req = new HttpRequest('POST', this.sellerUrl+'/saveDocument/'+name, formdata, {
    reportProgress: true,
    responseType: 'text'
  });
  return this.http.request(req);
} 






}//end of service class
