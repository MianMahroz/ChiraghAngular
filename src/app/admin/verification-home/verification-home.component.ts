import { SellerService } from './../../shared/seller.service';
import { personalInfoDTO } from './../../register/personalInfoDTO';
import { PropertyFinancialDTO } from './../../SellerForm/property-financials/propertyfinancialDTO';
import { PropertyRentalDetailDTO } from './../../SellerForm/property-rental/propertyRentalDTO';
import { PropertyDetailsDto } from './../../SellerForm/property-details/propertymodel';
import { OwnerDetails } from './../../SellerForm/owner-details/ownerdetails.model';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from './../../shared/property.service';
import { TokenStorage } from './../../core/token.storage';
import { AuthService } from './../../core/auth.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import {ModalGalleryModule,Image} from 'angular-modal-gallery';
import { UserService } from './../../shared/user.service';
import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-verification-home',
  templateUrl: './verification-home.component.html',
  styleUrls: ['./verification-home.component.css']
})
export class VerificationHomeComponent implements OnInit {
  completePropertiesList:any;
  currentProperty:any;
  showsellerdetails=false;
  showsellerhome=false;
  propertyId:number;
  completePropertyArr:any;
  ownerDto=new OwnerDetails();
  propertyDetailsDto=new PropertyDetailsDto();
  propertyRentalDetailDTO=new PropertyRentalDetailDTO();
  propertyFinancialDTO=new PropertyFinancialDTO();
  personalinfoDTO =new personalInfoDTO();
  ownerDetailsEdit=false;
  currentPropertyId:number;
  selectedPassport: FileList
  selectedIdCopy: FileList
  selectedScannedPoa: FileList
  passportFile:File;
  idCopyFile:File;
  images: Image[]=[] ;
  editOwner=false;
  editPOA=false;
  editPropertyDetails=false;
  selectedMorgageNoc: FileList
  morgageNocFile:File;
  selectedScannedTitleDeed: FileList;
  scannedTitleDeedFile:File;
  scannedNotorizedPoaFile:File;
  editFinancialDetails=false;
  editRentalDetails=false;
  scannedTenentContractFile:File;
  selectedscannedTenentContract: FileList;

  grantEditAccessToFinancialDetails():void{
    this.editFinancialDetails=true;
  }
  grantEditAccessToRentalDetails():void{
    this.editRentalDetails=true;
  }
  grantEditAccess():void{
    this.editOwner=true;
  }
  grantEditAccessToPOA():void{
    this.editPOA=true;
  }
  grantEditAccessToPropertyDetails():void{
    this.editPropertyDetails=true;
  }
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
 selectScannedTitleDeed(event) {
  this.selectedScannedTitleDeed = event.target.files;
  this.scannedTitleDeedFile=this.selectedScannedTitleDeed.item(0);
  event.srcElement.value = null;
}
scannedTenantContract(event) {
  this.selectedscannedTenentContract = event.target.files;
  this.scannedTenentContractFile=this.selectedscannedTenentContract.item(0);
  event.srcElement.value = null;
}
selectMorgageNoc(event) {
  this.selectedMorgageNoc = event.target.files;
  this.morgageNocFile=this.selectedMorgageNoc.item(0);
  event.srcElement.value = null;
}

  ownerVerified(isVerified:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          this.ownerDto.isPersonalDetailsVerified=isVerified;
          this.ownerDto.userName=this.token.getAdminuserName();
          this.ownerDto.propertyId=this.currentPropertyId;
         this.sellerService.updateOwner(this.ownerDto).subscribe(
           data=>{
                     this.mytoastr.Info('Status','Owner Verified Successfully');
                     this.ownerDto=new OwnerDetails();
                     this.getCompleteProperties();
                     this.refreshDto();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser

  financialDetailsVerified(isVerified:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          this.propertyFinancialDTO.isPropertyFinancialDetailsVerified=isVerified;
          this.propertyFinancialDTO.userName=this.token.getAdminuserName();
          this.propertyFinancialDTO.propertyId=this.currentPropertyId;
          this.propertyService.updatePropertyFinancials(this.propertyFinancialDTO).subscribe(
           data=>{
                     this.mytoastr.Info('','Property Financial Details Verified Successfully');
                     this.propertyFinancialDTO=new PropertyFinancialDTO();
                     this.getCompleteProperties();
                     this.refreshDto();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser

  rentalDetailsVerified(isVerified:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          this.propertyRentalDetailDTO.isPropertyRentalDetailsVerified=isVerified;
          this.propertyRentalDetailDTO.userName=this.token.getAdminuserName();
          this.propertyRentalDetailDTO.propertyId=this.currentPropertyId;
          this.propertyService.updatePropertyRental(this.propertyRentalDetailDTO).subscribe(
           data=>{
                     this.mytoastr.Info('','Property Rental Details Verified Successfully');
                     this.propertyRentalDetailDTO=new PropertyRentalDetailDTO();
                     this.getCompleteProperties();
                     this.refreshDto();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser

  propertyDetailsVerified(isVerified:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          this.propertyDetailsDto.isPropertyDetailsVerified=isVerified;
          this.propertyDetailsDto.userName=this.token.getAdminuserName();
          this.propertyDetailsDto.propertyId=this.currentPropertyId;
          this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
           data=>{
                     this.mytoastr.Info('Status','Property Details Verified Successfully');
                     this.propertyDetailsDto=new PropertyDetailsDto();
                     this.getCompleteProperties();
                     this.refreshDto();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser


  refreshDto():void{
    //  this.images=null;
     this.ownerDto=new OwnerDetails();
     this.propertyDetailsDto=new PropertyDetailsDto();
     this.propertyFinancialDTO=new PropertyFinancialDTO();
     this.propertyRentalDetailDTO=new PropertyRentalDetailDTO();
     this.editPropertyDetails=false;
     this.editFinancialDetails=false;
     this.editRentalDetails=false;
     this.editOwner=false;
     this.editPOA=false;
     this.images=[];
  }//end of refresh dto

  setCurrentProperty(prop:any){
    this.currentPropertyId=prop.propertyId;
    this.currentProperty=prop;
    console.log(this.currentProperty);
  }


  getPropertyDetailsImages():void{
    this.images = [
      new Image(
        0,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.propertyDetailsDto.scannedTitleDeed,
          extUrl: 'http://demo.chiragh.com/'
        }
      )];
}//end of get owner details

  getOwnerImages():void{
      this.images = [
        new Image(
          0,
          { // modal
            img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.scannedIdCopy,
            extUrl: 'http://demo.chiragh.com/'
          }
        ),
        new Image(
          1,
          { // modal
            img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.passportCopyUpload,
            extUrl: 'http://demo.chiragh.com/'
          }
        )];
  }//end of get owner details

  getPOAImages():void{
    this.images = [
      new Image(
        0,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.scannedIdCopy,
          extUrl: 'http://demo.chiragh.com/'
        }
      ),
      new Image(
        1,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.passportCopyUpload,
          extUrl: 'http://demo.chiragh.com/'
        }
      ),
      new Image(
        2,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.scannedNotorizedCopy,
          extUrl: 'http://demo.chiragh.com/'
        }
      )
    ];
}//end of get owner details

selectScannedPoa(event) {
  this.selectedScannedPoa = event.target.files;
  this.scannedNotorizedPoaFile=this.selectedScannedPoa.item(0);
  event.srcElement.value = null;
}
  getOwnerDetails(data:any):void{
   console.log(' Owner Clicked!!');
   if(data.ownerType=='owner'){
      this.ownerDto=data;
      this.getOwnerImages();
      this.editOwner=false;
   }
  }
  getPOADetails(data:any):void{
    console.log(' POA Clicked!!');
    if(data.ownerType=='poa'){
       this.ownerDto=data;
       this.getPOAImages();
       this.editPOA=false;
    }
   }
   getPropertyFinancialDetailsImages():void{
    this.images = [
      new Image(
        0,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.propertyFinancialDTO.morgageNoc,
          extUrl: 'http://demo.chiragh.com/'
        }
      )];
}//end of get owner details
getPropertyRentalDetailsImages():void{
  this.images = [
    new Image(
      0,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.propertyRentalDetailDTO.tenancyContractUpload,
        extUrl: 'http://demo.chiragh.com/'
      }
    )];
}//end of get owner details

   getPropertyDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyDetailsDto=data;
    this.getPropertyDetailsImages();
   }


   getPropertyRentalDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyRentalDetailDTO=data;
    this.getPropertyRentalDetailsImages();
   }

   getPropertyFinancialDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyFinancialDTO=data;
    this.getPropertyFinancialDetailsImages();
   }

   getpersonalinfoDetails(data:any):void{
    console.log(' Personal info Clicked!!');
    this.personalinfoDTO=data;
   }
  constructor(private sellerService:SellerService,private route:ActivatedRoute ,private propertyService:PropertyService,private mytoastr:ToasterServiceService,private userService:UserService,private http: HttpClient,private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {

  }

  showSellerHome(){
    this.showsellerhome=true;
      }
  ngOnInit() {
    if(this.token.getAdminuserName()==null){
      console.log('Invalid Session');
      this.mytoastr.Error('','Invalid Session!')
      this.router.navigate(['/adminsignin']);
      return "Invalid Session";
    }//end of if
    this.showsellerhome=false;
    this.showsellerdetails=false;
    this.showsellerdetails=this.route.snapshot.params['action'];
    this.propertyId=this.route.snapshot.params['propertyId'];
    this.getCompleteProperties();
  }//end of oninit


  getCompleteProperties(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);
        if(this.token.getToken()!=null){
            this.propertyService.getCompleteProperties(this.token.getAdminuserName()).subscribe(
                   data=>{
                            console.log('Output of service call');

                            this.completePropertyArr=data;
                            console.log(this.completePropertyArr);
                   }//end of data of getCompleteProperties
            );//end of getProperties subscribe
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of loginChiraghUser

  getAdminSellerHomeData(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
            this.propertyService.getAdminSellerHomeData(this.token.getAdminuserName()).subscribe(
             sellerHomePageData=>{
                  console.log(sellerHomePageData);
                  this.completePropertyArr=sellerHomePageData;
             }

            );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of loginChiraghUser

//code of ngx-galary







}//end of class
