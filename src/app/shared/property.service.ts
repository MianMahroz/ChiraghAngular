import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { PropertyDetailsDto } from '../SellerForm/property-details/propertymodel';
import { PropertyFinancialDTO } from '../SellerForm/property-financials/propertyfinancialDTO';
import { PropertyRentalDetailDTO } from '../SellerForm/property-rental/propertyRentalDTO';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class PropertyService {

  constructor(private http: HttpClient,private token:TokenStorage,private authService:AuthService) { }

  private propertyUrl = 'http://localhost:8084/api/property';
  
  public updateProperty(proertyDetailDto:PropertyDetailsDto): Observable<any> {
    return this.http.put<any>(this.propertyUrl + '/updateProperty/Details',proertyDetailDto ,httpOptions);
}
public updatePropertyFinancials(propertyFinancialDto:PropertyFinancialDTO): Observable<any> {
  return this.http.put<any>(this.propertyUrl + '/updateProperty/FinancialDetails',propertyFinancialDto ,httpOptions);
}
public updatePropertyRental(propertyRentalDetailDTO:PropertyRentalDetailDTO): Observable<any> {
  return this.http.put<any>(this.propertyUrl + '/updateProperty/rentInfo',propertyRentalDetailDTO ,httpOptions);
}




}
