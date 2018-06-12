import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../shared/seller.service';
import { PropertyService } from '../../shared/property.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TokenStorage } from '../../core/token.storage';
import { PropertyRentalDetailDTO } from './propertyRentalDTO';

@Component({
  selector: 'app-property-rental',
  templateUrl: './property-rental.component.html',
  styleUrls: ['./property-rental.component.css']
})
export class PropertyRentalComponent implements OnInit {

  constructor(private sellerService:SellerService,private propertyService:PropertyService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }
  propertyRentalDetailDTO=new PropertyRentalDetailDTO();
  selectedscannedTenentContract: FileList;
  scannedTenentContractFile:File;

  ngOnInit() {
    // this.token.savePropertyId('61');
    // this.token.saveUserName('BesterCapital2');
  }


  scannedTenantContract(event) {
    this.selectedscannedTenentContract = event.target.files;
    this.scannedTenentContractFile=this.selectedscannedTenentContract.item(0);
  }

  addPropertyRentalDetails(): string {
    if(this.token.getuserName()==null){
      console.log('Invalid Session');
      return "Invalid Session";
    }
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          //for testing
          this.propertyRentalDetailDTO.propertyId=this.token.getPropertyId();
          this.sellerService.saveDocument('PropertyRentals-scannedTenantContractCopy'+this.token.getPropertyId(),this.token.getuserName(),this.scannedTenentContractFile).subscribe(
            data2=>{
                        if(data2.type==3){
                          console.log(data2);

                          this.propertyRentalDetailDTO.tenancyContractUpload=data2.partialText;
                          this.propertyRentalDetailDTO.userName=this.token.getuserName();
                          this.propertyService.updatePropertyRental(this.propertyRentalDetailDTO).subscribe(
                            propertyRentalData=>{
                                    console.log(propertyRentalData);
                                    if(propertyRentalData.msg=='Property Rental Info Updated Successfully'){
                                      this. router.navigate(['../auctionFeeDetails']);
                                    }

                                  }//end of propertyFinancialData
                        );//end of subscription of property financial Details
                        }
            }//end of data2
          );//end of save document subscription

        }//end of if

     }//end of outer data predicate
    );//end of outer subscription
    return "";
  }//end of loginChiraghUser



}
