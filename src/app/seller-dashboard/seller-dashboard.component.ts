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
import {ModalGalleryModule,Image} from 'angular-modal-gallery';
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
  selectedPassport: FileList;
  selectedIdCopy: FileList;
  passportFile:File;
  idCopyFile:File;


  images: Image[]=[] ;

  ngOnInit() {
    this.getUserDashboardData();
    this.getDashboardPersonalInfo();
    
  }

  getOwnerImages():void{
    this.images = [
      new Image(
        0,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy,
          extUrl: 'http://demo.chiragh.com/'
        }
      ),
      new Image(
        1,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.passportCopyUpload,
          extUrl: 'http://demo.chiragh.com/'
        }
      )
    ];

}//end of get owner details

getPOAImages():void{
  this.images = [
    new Image(
      0,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy,
        extUrl: 'http://demo.chiragh.com/'
      }
    ),
    new Image(
      1,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.passportCopyUpload,
        extUrl: 'http://demo.chiragh.com/'
      }
    ),
    new Image(
      2,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedNotorizedCopy,
        extUrl: 'http://demo.chiragh.com/'
      }
    )
  ];
}//end of get owner details


getPropertyFinancialDetailsImages():void{
  this.images = [
    new Image(
      0,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.propertyFinancialDTO.propertyId+'/'+this.propertyFinancialDTO.morgageNoc,
        extUrl: 'http://demo.chiragh.com/'
      }
    )];
}//end of get owner details

getPropertyRentalDetailsImages():void{
  this.images = [
    new Image(
      0,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.propertyRentalDetailDTO.propertyId+'/'+this.propertyRentalDetailDTO.tenancyContractUpload,
        extUrl: 'http://demo.chiragh.com/'
      }
    )];
}//end of get owner details

getPropertyDetailsImages():void{
  this.images = [
    new Image(
      0,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.propertyDetailsDto.propertyId+'/'+this.propertyDetailsDto.scannedTitleDeed,
        extUrl: 'http://demo.chiragh.com/'
      }
    )];
}//end of get owner details


getPersonalInfoImages():void{
  this.images = [
    new Image(
      0,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.personalinfoDTO.userId+'/'+this.personalinfoDTO.scannedIdCopyUpload,
        extUrl: 'http://demo.chiragh.com/'
      }
    ),
    new Image(
      1,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.personalinfoDTO.userId+'/'+this.personalinfoDTO.scannedPassportCopyUpload,
        extUrl: 'http://demo.chiragh.com/'
      }
    )
  ];

}//end of get owner details


selectPassport(event) {
  this.selectedPassport = event.target.files;
  this.passportFile=this.selectedPassport.item(0);
  event.srcElement.value = null;
  // console.log(this.passportFile);
}
selectIdCopy(event) {
  this.selectedIdCopy = event.target.files;
  this.idCopyFile=this.selectedIdCopy.item(0);
  // console.log(this.idCopyFile);
  event.srcElement.value = null;
}
 
  refreshPoaHtml()
  {
    this.ownerDto=new OwnerDetails();
  }

  setCurrentProperty(prop:any){
    this.currentProperty=prop;
  }
  getOwnerDetails(data:any):void{
   console.log(' Owner Clicked!');
   if(data.ownerType=='owner'){
      this.ownerDto=data;
      this.getOwnerImages();
   }
  }
  getPOADetails(data:any):void{
    console.log(' POA Clicked!');
    if(data.ownerType=='poa'){
       this.ownerDto=data;
       this.getPOAImages();
    }
   }


   getPropertyDetails(data:any):void{
    console.log(' Property Clicked!');
    this.propertyDetailsDto=data;
    this.getPropertyDetailsImages();
   }


   getPropertyRentalDetails(data:any):void{
    console.log(' Property Rental Clicked!');
    this.propertyRentalDetailDTO=data;
    this.getPropertyRentalDetailsImages();
   }

   getPropertyFinancialDetails(data:any):void{
    console.log(' Property Mortage Clicked!');
    this.propertyFinancialDTO=data;
    this.getPropertyFinancialDetailsImages();
   }

   getpersonalinfoDetails(data:any):void{
    console.log(' Personal info Clicked!');
    this.personalinfoDTO=data;
    this.getPersonalInfoImages();
   }

   cancelinfo():void{
    console.log(' Personal info Changes Discard!');
    this.getDashboardPersonalInfo();
    this.myToast.Success('Changes Are Discared Sucessfully');

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

  }//end 
  
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
                     this.getpersonalinfoDetails(this.personalinfo);
               }
             );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end 

  UpdatePersonalInfo(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
             this.userService.updatepersonalinfo(this.token.getuserName(),this.personalinfoDTO).subscribe(
               data=>{
                     console.log(data);
                     if(data.msg=="Personal Info Not Updated!"){
                      this.myToast.Error('Status',data.msg);
                     }

                     else if(data.msg=="Personal Info Updated Successfully")
                     {
                      this.myToast.Success('Status',data.msg);
                     }

                     else if(data.msg=="Invalid Session")
                     {
                      this.myToast.Error('Status',data.msg);
                     }
               }
             );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end 


}
