import { PropertyRentalDetailDTO } from './../SellerForm/property-rental/propertyRentalDTO';
import { PropertyFinancialDTO } from './../SellerForm/property-financials/propertyfinancialDTO';
import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { PropertyDetailsDto } from '../SellerForm/property-details/propertymodel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class PropertyService {

  constructor(private http: HttpClient,private token:TokenStorage,private authService:AuthService) { }

  private propertyUrl = this.token.getServerpath()+'/api/property';

  public updateProperty(proertyDetailDto:PropertyDetailsDto): Observable<any> {
    return this.http.put<any>(this.propertyUrl + '/updateProperty/Details',proertyDetailDto ,httpOptions);
}
public updatePropertyFinancials(propertyFinancialDto:PropertyFinancialDTO): Observable<any> {
  return this.http.put<any>(this.propertyUrl + '/updateProperty/FinancialDetails',propertyFinancialDto ,httpOptions);
}
public updatePropertyRental(propertyRentalDetailDTO:PropertyRentalDetailDTO): Observable<any> {
  return this.http.put<any>(this.propertyUrl + '/updateProperty/rentInfo',propertyRentalDetailDTO ,httpOptions);
}

public getPropertyById(propertyId:number,userName:string): Observable<PropertyDetailsDto> {
  return this.http.get<PropertyDetailsDto>(this.propertyUrl + '/getPropertyDetails/'+propertyId+'/'+userName);
}
public getPropertyFinancialById(propertyId:number,userName:string): Observable<PropertyFinancialDTO> {
  return this.http.get<PropertyFinancialDTO>(this.propertyUrl + '/getPropertyFinancialDetails/'+propertyId+'/'+userName);
}

public getPropertyRentalById(propertyId:number,userName:string): Observable<PropertyRentalDetailDTO> {
  return this.http.get<PropertyRentalDetailDTO>(this.propertyUrl + '/getPropertyRentalDetails/'+propertyId+'/'+userName);
}

public getPropertyByUserName(userName:string): Observable<any> {
  return this.http.get<any>(this.propertyUrl + '/getAll/'+userName);
}

}
