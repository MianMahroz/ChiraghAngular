import { OwnerDetails } from './../SellerForm/owner-details/ownerdetails.model';
import { PropertyService } from './../shared/property.service';
import { TokenStorage } from './../core/token.storage';
import { AuthService } from './../core/auth.service';
import { Router } from '@angular/router';
import { ToasterServiceService } from './../toaster-service.service';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { PropertyDetailsDto } from './../SellerForm/property-details/propertymodel';
import {PropertyRentalDetailDTO  } from './../SellerForm/property-rental/propertyRentalDTO';
import { PropertyFinancialDTO } from './../SellerForm/property-financials/propertyfinancialDTO';
import { personalInfoDTO } from './../register/personalInfoDTO';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  async ngAfterViewInit() {
		await this.loadScript('./assets/js/common.js');
	}

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }
  constructor(private propertyService:PropertyService,private myToast:ToasterServiceService,private userService:UserService,private router: Router,  private authService: AuthService, private token: TokenStorage) { }

  currentProperty:any;
  userData:any;
  personalinfo:any;
  ownerDto=new OwnerDetails();
  propertyDetailsDto=new PropertyDetailsDto();
  propertyRentalDetailDTO=new PropertyRentalDetailDTO();
  propertyFinancialDTO=new PropertyFinancialDTO();
  personalinfoDTO =new personalInfoDTO();


  ngOnInit() {
  this.getUserDashboardData();
  this.getDashboardPersonalInfo();
  }

  setCurrentProperty(prop:any){
    this.currentProperty=prop;
  }
  getOwnerDetails(data:any):void{
   console.log(' Owner Clicked!!');
   if(data.ownerType=='owner'){
      this.ownerDto=data;
   }
  }
  getPOADetails(data:any):void{
    console.log(' POA Clicked!!');
    if(data.ownerType=='poa'){
       this.ownerDto=data;
    }
   }


   getPropertyDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyDetailsDto=data;
   }


   getPropertyRentalDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyRentalDetailDTO=data;
   }

   getPropertyFinancialDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyFinancialDTO=data;
   }

   getpersonalinfoDetails(data:any):void{
    console.log(' Personal info Clicked!!');
    this.personalinfoDTO=data;
   }

  getUserDashboardData(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
             this.propertyService.getPropertyByUserName(this.token.getuserName()).subscribe(
               data=>{
                     console.log(data);
                     this.userData=data;
               }
             );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of loginChiraghUser
  
  getDashboardPersonalInfo(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
             this.userService.getpersonalinfo(this.token.getuserName()).subscribe(
               data=>{
                     console.log(data);
                     this.personalinfo=data;
               }
             );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end 


}
