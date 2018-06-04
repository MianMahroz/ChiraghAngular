import { Component, OnInit } from '@angular/core';
import { PropertyFinancialDTO } from './propertyfinancialDTO';
import { TokenStorage } from '../../core/token.storage';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from '../../shared/property.service';

@Component({
  selector: 'app-property-financials',
  templateUrl: './property-financials.component.html',
  styleUrls: ['./property-financials.component.css']
})
export class PropertyFinancialsComponent implements OnInit {

  constructor(private propertyService:PropertyService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }

  propertyFinancialDTO=new PropertyFinancialDTO();
  selectedMorgageNoc: FileList
  morgageNocFile:File;
  
  ngOnInit() {
  }


  selectMorgageNoc(event) {
    this.selectedMorgageNoc = event.target.files;
    this.morgageNocFile=this.selectedMorgageNoc.item(0);
  }

  addPropertyRentalDetails(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          //for testing 
          this.propertyFinancialDTO.propertyId=98;
          this.propertyService.updatePropertyFinancials(this.propertyFinancialDTO).subscribe(
              propertyFinancialData=>{
                      console.log(propertyFinancialData);
                      this. router.navigate(['../propertyRental']);
                    
                    }//end of propertyFinancialData
          );//end of subscription of property financial Details
        }//end of if
        
     }//end of outer data predicate
    );//end of outer subscription
    
  }//end of loginChiraghUser

}
