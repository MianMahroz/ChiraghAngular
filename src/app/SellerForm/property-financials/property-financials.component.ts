import { Component, OnInit } from '@angular/core';
import { PropertyFinancialDTO } from './propertyfinancialDTO';
import { TokenStorage } from '../../core/token.storage';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from '../../shared/property.service';
import { SellerService } from '../../shared/seller.service';

@Component({
  selector: 'app-property-financials',
  templateUrl: './property-financials.component.html',
  styleUrls: ['./property-financials.component.css']
})
export class PropertyFinancialsComponent implements OnInit {

  constructor(private sellerService:SellerService,private propertyService:PropertyService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }

  propertyFinancialDTO=new PropertyFinancialDTO();
  selectedMorgageNoc: FileList
  morgageNocFile:File;
  
  ngOnInit() {
    // this.token.savePropertyId('111');
    // this.token.saveUserName('BesterCapital1');
  }


  selectMorgageNoc(event) {
    this.selectedMorgageNoc = event.target.files;
    this.morgageNocFile=this.selectedMorgageNoc.item(0);
  }

  addPropertyFinancialDetails(): string {
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
          this.propertyFinancialDTO.propertyId=this.token.getPropertyId();
          this.sellerService.saveDocument('PropertyFinancials-morgageNocCopy'+this.token.getPropertyId(),this.token.getuserName(),this.morgageNocFile).subscribe(
            data2=>{
                        if(data2.type==3){
                          console.log(data2);
                          
                          this.propertyFinancialDTO.morgageNoc=data2.partialText;
                          this.propertyFinancialDTO.userName=this.token.getuserName();
                          this.propertyService.updatePropertyFinancials(this.propertyFinancialDTO).subscribe(
                            propertyFinancialData=>{
                                    console.log(propertyFinancialData);
                                   if(propertyFinancialData.msg=='Property Financial Detail Updated Successfully'){
                                    this. router.navigate(['../propertyRental']);          
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
