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
import { Ng2FileSizeModule } from 'ng2-file-size';

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
  constructor(public ng2FileSize :Ng2FileSizeModule,private propertyService:PropertyService,private myToast:ToasterServiceService,private userService:UserService,private router: Router,  private authService: AuthService, private token: TokenStorage) { }
 
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
  userIdCopy:string;
  userPassportCopy:string;
  ownerIdCopy:string;
  ownerPassportCopy:string;
  poaIdCopy:string;
  poaPassportCopy:string;
  poaNotorizedCopy:string;
  pdTitleDeedCopy:string;
  mortgageNOCCopy:string;
  rentTenancyContract:string;

  images: Image[]=[] ;
  userName:string;
  ngOnInit() {
    this.getUserDashboardData();
    this.getDashboardPersonalInfo();
    if(this.token.getuserName()!=null)
    this.userName=this.token.getuserName();
    
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

  // if (event.target.files && event.target.files[0]) {
  //   var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
  //       if (FileSize > 2) {
  //           this.myToast.Error('File size exceeds 2 MB');
  //           return 'File size excced !'
  //          // $(file).val(''); //for clearing with Jquery
  //       }}
  
  this.selectedPassport = event.target.files;
  this.passportFile=this.selectedPassport.item(0);
  this.personalinfoDTO.scannedPassportCopyUpload=this.passportFile.name;
  this.UpdatePersonalInfo();
  event.srcElement.value = null;
}


selectIdCopy(event) {
  this.selectedIdCopy = event.target.files;
  this.idCopyFile=this.selectedIdCopy.item(0);
  this.personalinfoDTO.scannedIdCopyUpload=this.idCopyFile.name;
  this.UpdatePersonalInfo();
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
   console.log(data);
   if(data.ownerType=='owner'){
      this.ownerDto=data;
      this.ownerPassportCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.passportCopyUpload;
      this.ownerIdCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.scannedIdCopy;
    }
    
  }
  getPOADetails(data:any):void{
    console.log(' POA Clicked!');
    if(data.ownerType=='poa'){
      this.ownerDto=data;
      this.poaPassportCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.passportCopyUpload;
      this.poaIdCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.scannedIdCopy;
      this.poaNotorizedCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.scannedNotorizedCopy;
    }
  }


   getPropertyDetails(data:any):void{
    console.log(' Property Clicked!');
    this.propertyDetailsDto=data;
    this.pdTitleDeedCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.propertyDetailsDto.scannedTitleDeed;
   }


   getPropertyRentalDetails(data:any):void{
    console.log(' Property Rental Clicked!');
    this.propertyRentalDetailDTO=data;
    this.rentTenancyContract=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.propertyRentalDetailDTO.tenancyContractUpload;
   }

   getPropertyFinancialDetails(data:any):void{
    console.log(' Property Mortage Clicked!');
    this.propertyFinancialDTO=data;
    this.mortgageNOCCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.propertyFinancialDTO.morgageNoc;
   }

   getpersonalinfoDetails(data:any):void{
    console.log(' Personal info Clicked!');

    this.personalinfoDTO=data;
    console.log(this.personalinfoDTO.scannedIdCopyUpload);
    this.userPassportCopy=''+this.token.getImagepath()+'ChiraghUser-'+this.personalinfoDTO.userId+'/'+this.personalinfoDTO.scannedPassportCopyUpload;
    this.userIdCopy=''+this.token.getImagepath()+'ChiraghUser-'+this.personalinfoDTO.userId+'/'+this.personalinfoDTO.scannedIdCopyUpload;
   // this.personalinfoDTO.scannedIdCopyUpload=this.userPassportCopy;
    //this.personalinfoDTO.scannedIdCopyUpload=this.userIdCopy;
    // this.getPersonalInfoImages();
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
