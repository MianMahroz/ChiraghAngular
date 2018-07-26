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
//import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

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

  userIdCopy:string;
  userPassportCopy:string;
  title:string ;
  titles:string[] = ["Watch List","Property Seen","Bid Activity","History"];

  //for now using dummy data array
  public data: Array<{ propertyid: number,projectname: string,propertyimage:string}> = [
    {propertyid: 1, projectname: 'Dream Inn Dubai - Palm Villa',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},
    {propertyid: 2, projectname: 'The Palm Jumeirah, Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 3, projectname: 'Unique Luxury Apartment Downtown,Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},
    {propertyid: 4, projectname: ' The Empress Villa Jumeirah, Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 5, projectname: 'Burj Khalifa, Downtown Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},
    {propertyid: 6, projectname: 'MAG 214, Jumeirah Lake Towers,Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 7, projectname: 'Dream Inn Dubai - Palm Villa',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},
    {propertyid: 8, projectname: 'The Palm Jumeirah, Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 9, projectname: 'Unique Luxury Apartment,Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},
    {propertyid: 10, projectname: ' The Empress Villa Jumeirah, Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 11, projectname: 'Burj Khalifa, Downtown Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},
    {propertyid: 12, projectname: 'MAG 214, Jumeirah Lake Towers,Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 13, projectname: 'MAG 214, Jumeirah Lake Towers,Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 14, projectname: 'Dream Inn Dubai - Palm Villa',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},
    {propertyid: 15, projectname: 'The Palm Jumeirah, Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 16, projectname: 'Unique Luxury Apartment Downtown,Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},
    {propertyid: 17, projectname: ' The Empress Villa Jumeirah, Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 18, projectname: 'Burj Khalifa, Downtown Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},
    {propertyid: 19, projectname: 'MAG 214, Jumeirah Lake Towers,Dubai',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img3.jpg'},
    {propertyid: 20, projectname: 'Dream Inn Dubai - Palm Villa',propertyimage:'http://13.59.166.45/ChiraghDocuments/images/thumbnail-img1.jpg'},];
  

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

  firstnameValid=true;
  lastnameValid=true;
  middlenameValid=true;
  nationalityValid=true;
  idcardnoValid=true;
  idcardexpiryValid=true;
  passportnoValid=true;
  passportexpiryValid=true;
  phonenoValid=true;
  mobilenoValid=true;
  emailValid=true;
  countryValid=true;
  cityValid=true;
  addressValid=true;
  classifyourselfValid=true;
  scannedpassportcopyValid=true;
  optcodeValid=true;
  scannedidcopyValid=true;
  personalinfoValid=true;
  contactinfoValid=true;
  fileinfoValid=true;


  ngOnInit() {
    this.getUserDashboardData();
    this.getDashboardPersonalInfo();
    if(this.token.getuserName()!=null)
    this.userName=this.token.getuserName();
    this.loadListings(0);
    
  }

  loadListings(orderId:number){
    this.title=this.titles[orderId];
    // Call some service from the backend to load data
    // Assign that data to this.data 
    this.data;
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

  if (event.target.files && event.target.files[0]) {
    var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
     if (FileSize > 2) {
         this.myToast.Error('File size exceeds 2 MB');
         this.myToast.Warning('Accepted file size less than 2Mb');
         return 'File size excced !'
     }}
     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
      this.userPassportCopy = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  
      this.selectedPassport = event.target.files;
      this.passportFile=this.selectedPassport.item(0);
      this.personalinfoDTO.scannedPassportCopyUpload=this.passportFile.name;
      this.userPassportCopy=''+this.token.getImagepath()+'ChiraghUser-'+this.personalinfoDTO.userId+'/'+this.personalinfoDTO.scannedPassportCopyUpload;
      this.UpdatePersonalInfo('filevalidationForm');
      // console.log(this.passportFile);
    // this.UpdatePersonalInfo();
      event.srcElement.value = null;
}


selectIdCopy(event) {

  if (event.target.files && event.target.files[0]) {
    var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
     if (FileSize > 2) {
         this.myToast.Error('File size exceeds 2 MB');
         this.myToast.Warning('Accepted file size less than 2Mb');
         return 'File size excced !'
     }}
     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.userIdCopy = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  this.selectedIdCopy = event.target.files;
  this.idCopyFile=this.selectedIdCopy.item(0);
  this.personalinfoDTO.scannedIdCopyUpload=this.idCopyFile.name;
  this.userIdCopy=''+this.token.getImagepath()+'ChiraghUser-'+this.personalinfoDTO.userId+'/'+this.personalinfoDTO.scannedIdCopyUpload;
  this.UpdatePersonalInfo('filevalidationForm');
  event.srcElement.value = null;
}
 
  refreshPoaHtml()
  {
    this.ownerDto=new OwnerDetails();
  }

  setCurrentProperty(prop:any){
    this.currentProperty=prop;
  }

  persoanlInfovalidation():boolean {

      console.log('Personal Info Validations!');
      //var firstname1=this.ownerDto.firstName;
      //this.requiredfieldsArray['firstNamevalidation',this.ownerDto.lastName,this.ownerDto.nationality,this.ownerDto.passportNo,this.ownerDto.passportExpiryDate,this.ownerDto.mobile,this.ownerDto.email,this.ownerDto.address];
      this.firstnameValid=true;
      if(this.personalinfoDTO.firstName)
      {
      var firstname =this.personalinfoDTO.firstName.match('[a-zA-Z]*');
      if(firstname["0"]!==this.personalinfoDTO.firstName){
        this.myToast.Error('Invalid First Name');
        this.firstnameValid=false;
      }
    
    if(this.personalinfoDTO.firstName.length<3){
      this.myToast.Error('First Name must be at least 3 characters long.');
      this.firstnameValid=false;
    }
    
    if(this.personalinfoDTO.firstName.length>15){
      this.myToast.Error('First Name cannot be more than 15 characters long');
      this.firstnameValid=false;
    }}
      else{
    
        this.myToast.Error('First Name Cannot Empty');
        this.firstnameValid=false;
      }

      this.middlenameValid=true;
      if(this.personalinfoDTO.middleName){
        var middleName =this.personalinfoDTO.middleName.match('[a-zA-Z]*');
        if(middleName["0"]!==this.personalinfoDTO.middleName){
          this.myToast.Error('Invaild Middle Name');
          this.middlenameValid=false;
        }
        if(this.personalinfoDTO.middleName.length<3){
          this.myToast.Error('Middle Name must be at least 3 characters long.');
          this.middlenameValid=false;}
        if(this.personalinfoDTO.middleName.length>15){
          this.myToast.Error('Middle Name cannot be more than 15 characters long');
          this.middlenameValid=false;
        }
    
      }

      this.lastnameValid=true;
      if(this.personalinfoDTO.lastName){
      var lastname =this.personalinfoDTO.lastName.match('[a-zA-Z]*');
      if(lastname["0"]!==this.personalinfoDTO.lastName){
        this.myToast.Error('Invalid Last Name');
        this.lastnameValid=false;
      }
    
      if(this.personalinfoDTO.lastName.length<3){
        this.myToast.Error('Last Name must be at least 3 characters long.');
        this.lastnameValid=false;}
      if(this.personalinfoDTO.lastName.length>15){
        this.myToast.Error('Last Name cannot be more than 15 characters long');
        this.lastnameValid=false;
      }}
    
      else{
    
        this.myToast.Error('Last Name Cannot Empty');
        this.lastnameValid=false;
      }

      this.nationalityValid=true;
      if(this.personalinfoDTO.nationality)
      {
      var nationality =this.personalinfoDTO.nationality.match('[a-zA-Z]*');
      if(nationality["0"]!==this.personalinfoDTO.nationality){
        this.myToast.Error('Invaild Nationality');
        this.nationalityValid=false;
      }}
      else{
    
        this.myToast.Error('Nationality Cannot Empty');
        this.nationalityValid=false;
      }
    this.passportnoValid=true;
      if(this.personalinfoDTO.passportNumber){
      var passportNo =this.personalinfoDTO.passportNumber.match('[a-zA-Z0-9]*');
      if(passportNo["0"]!==this.personalinfoDTO.passportNumber){
        this.myToast.Error('Invaild Passport Number');
        this.passportnoValid=false;
      }
    
      if(this.personalinfoDTO.passportNumber.length>15){
        this.myToast.Error('Passport Number cannot be more than 15 characters long');
        this.passportnoValid=false;
      }}
      else{
    
        this.myToast.Error('Passport Number Cannot Empty');
        this.passportnoValid=false;
      }
       this.passportexpiryValid=true;
       console.log(this.personalinfoDTO.passportExpiryDate);
      
      if(this.personalinfoDTO.passportExpiryDate)
      {
      var stringdate=this.personalinfoDTO.passportExpiryDate.toString();
      var passportExpiryDate =stringdate.match('[0-9-]*');
      if(passportExpiryDate["0"]!==this.personalinfoDTO.passportExpiryDate){
        this.myToast.Error('Invaild Passport Expiry Date');
        this.passportexpiryValid=false;
      }}
    
      else{
    
        this.myToast.Error('Passport Expiry Date Cannot Empty');
        this.passportexpiryValid=false;
      }

      console.log(this.personalinfoDTO.idCardExpiryDate);
      this.idcardexpiryValid=true;
      if(this.personalinfoDTO.idCardExpiryDate){
        var datestring=this.personalinfoDTO.idCardExpiryDate.toString();
        var idCardExpiration=datestring.match('[0-9-]*');
        if(idCardExpiration["0"]!==this.personalinfoDTO.idCardExpiryDate){
          this.myToast.Error('Invaild Id Card Expiration');
          this.idcardexpiryValid=false;
        }}
  
        this.idcardnoValid=true;
      if(this.personalinfoDTO.idCardNumber){
        var idCardNo=this.personalinfoDTO.idCardNumber.match('[0-9]*');
        if(idCardNo["0"]!==this.personalinfoDTO.idCardNumber){
          this.myToast.Error('Invaild Id Card ');
          this.idcardnoValid=false;
        }
        if(this.personalinfoDTO.idCardNumber.length>18){
        this.myToast.Error('ID Card Number cannot be more than 18 characters long.');
        this.idcardnoValid=false;}}

      
      if(this.firstnameValid==false||this.middlenameValid==false||this.lastnameValid==false||this.nationalityValid==false||this.passportnoValid==false
      ||this.idcardnoValid==false||this.idcardexpiryValid==false||this.passportexpiryValid==false){
         this.personalinfoValid=false;
      }
    
      else
      {
        this.personalinfoValid=true;
      }
    
      return this.personalinfoValid;
      }
    


      contactInfovalidation():boolean {

        console.log('Contact Info Validations!');
      
        this.optcodeValid=true;
        if(this.personalinfoDTO.mobileOtpCode){
        var otpcode =this.personalinfoDTO.mobileOtpCode.match('[0-9_]*');
        if(otpcode["0"]!==this.personalinfoDTO.mobileOtpCode){
          this.myToast.Error('Invalid Otp Code!');
          this.optcodeValid=false;
        }
      
        if(this.personalinfoDTO.mobileOtpCode.length>4){
          this.myToast.Error(' OTP code should be 4 digit number');
          this.optcodeValid=false;
        }}
      
        else{
      
          this.myToast.Error('OTP Code Cannot Empty');
          this.optcodeValid=false;
        }
        
        this.mobilenoValid=true;
        if(this.personalinfoDTO.mobileNo){
          var mobile =this.personalinfoDTO.mobileNo.match('[0-9]*');
          if(mobile["0"]!==this.personalinfoDTO.mobileNo){
            this.myToast.Error('Invaild Mobile Number');
            this.mobilenoValid=false;
          }
        
          if(this.personalinfoDTO.mobileNo.length>16 && this.personalinfoDTO.mobileNo.length<16){
            this.myToast.Error('Please enter a 16 digit number');
            this.mobilenoValid=false;
          }}
        
          else{
        
            this.myToast.Error('Mobile Number Cannot Empty');
            this.mobilenoValid=false;
          }
        this.emailValid=true;
        if(this.personalinfoDTO.userEmail){
          var email =this.personalinfoDTO.userEmail.match('[^ @]*@[^ @]*');
          if(email["0"]!==this.personalinfoDTO.userEmail){
            this.myToast.Error('Invaild Email');
            this.emailValid=false;
          }}
          else{
        
            this.myToast.Error('Email Cannot Empty');
            this.emailValid=false;
          }
            this.addressValid=true;
            if(this.personalinfoDTO.streetAddress){
              var address =this.personalinfoDTO.streetAddress.match('[a-zA-Z0-9//_() & % # ~ , . "" ;:[] $ ^ @]*@[^ @]*');
              if(address["0"]!==this.personalinfoDTO.streetAddress){
                this.myToast.Error('Invaild Address');
                this.addressValid=false;
              }}
              else{
            
                this.myToast.Error('Address Cannot Empty');
                this.addressValid=false;
              }
              
            this.phonenoValid=true;
            if(this.personalinfoDTO.phoneNumber){
              var telephone=this.personalinfoDTO.phoneNumber.match('[0-9]*');
              if(telephone["0"]!==this.personalinfoDTO.phoneNumber){
                this.myToast.Error('Invaild Phone Number ');
                this.phonenoValid=false;
              }
              if(this.personalinfoDTO.phoneNumber.length>18){
              this.myToast.Error('Please enter a 16 digit number.');
              this.phonenoValid=false;
            }}

              this.cityValid=true;
              if(this.personalinfoDTO.userCity){
               // var city =this.personalinfoDTO.userCity.match('[a-zA-Z0-9//_() & % # ~ , . "" ;:[] $ ^ @]*@[^ @]*');
                //if(city["0"]!==this.personalinfoDTO.userCity){
                 // this.myToast.Error('Invaild Address');
                  this.cityValid=true;
                }
                else{
              
                  this.myToast.Error('City Cannot Empty');
                  this.cityValid=false;
                }

                this.countryValid=true;
                if(this.personalinfoDTO.country){
                    this.countryValid=true;
                  }
                  else{
                
                    this.myToast.Error('Country Cannot Empty');
                    this.countryValid=false;
                  }
      
        if(this.phonenoValid==false||this.mobilenoValid==false||this.emailValid==false||this.countryValid==false||this.cityValid==false
        ||this.addressValid==false||this.optcodeValid==false){
           this.contactinfoValid=false;
        }
      
        else
        {
          this.contactinfoValid=true;
        }
      
        return this.contactinfoValid;
        }
      

      fileInfovalidation():boolean {

        console.log('File Info Validations!');
      
        
              this.classifyourselfValid=true;
              if(this.personalinfoDTO.classifyYourself==true){
                  
                this.classifyourselfValid=true;
              }  
              else{
                this.myToast.Error('Classify Yourself Required!');
                this.classifyourselfValid=false;
              }    
       
      
                this.scannedpassportcopyValid=true;
              if(this.personalinfoDTO.scannedPassportCopyUpload==null||this.personalinfoDTO.scannedPassportCopyUpload==undefined){
                  this.myToast.Error('Passport Copy Upload required ');
                  this.scannedpassportcopyValid=false;
              }
              this.scannedidcopyValid=true;
              if(this.personalinfoDTO.scannedIdCopyUpload==null||this.personalinfoDTO.scannedIdCopyUpload==undefined){
                this.myToast.Error('Id Copy Upload required ');
                this.scannedidcopyValid=false;
            }
      
        if(this.scannedidcopyValid==false||this.scannedpassportcopyValid==false||this.classifyourselfValid==false){
           this.fileinfoValid=false;
        }
      
        else
        {
          this.fileinfoValid=true;
        }
      
        return this.fileinfoValid;
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
    if(data.scannedPassportCopyUpload==null||data.scannedIdCopyUpload==undefined){
      this.myToast.Error('Passport Copy Upload Required!')
    }

    if(data.scannedIdCopyUpload==null||data.scannedIdCopyUpload==undefined){
      this.myToast.Error('Id Copy Upload Required!')
    }
     if(data.classifyYourself==true){

     }
     else{
      this.myToast.Error('Classify Yourself Required!');
     }

    this.userPassportCopy=''+this.token.getImagepath()+'ChiraghUser-'+this.personalinfoDTO.userId+'/'+this.personalinfoDTO.scannedPassportCopyUpload;
    this.userIdCopy=''+this.token.getImagepath()+'ChiraghUser-'+this.personalinfoDTO.userId+'/'+this.personalinfoDTO.scannedIdCopyUpload;
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

  UpdatePersonalInfo(data:string): string{
    
    console.log(data);
    if(data=='contactinfoForm'){
     // data=null;
      console.log(data);
      if(this.contactInfovalidation()==true){}
      else {
        return "Invalid Contact Info Form";}}
    
      if(data=='personalInfoForm'){
        data=null;
        //this.contactinfoValid=false;
       // this.fileinfoValid=false;
      if(this.persoanlInfovalidation()==true){}
     else{
      return "Invalid Personal Info Form";}}
  
      if(data=='filevalidationForm'){
        data=null;
       // this.personalinfoValid=false;
       // this.contactinfoValid=false;
      if(this.fileInfovalidation()==true){}
      else {
        return "Invalid file Info Form";}}

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
                      return "Personal Info Not Updated";
                     }

                     else if(data.msg=="Personal Info Updated Successfully")
                     {
                      this.myToast.Success('Status',data.msg);
                      return "Personal Info Updated Successfully";
                     }

                     else if(data.msg=="Invalid Session")
                     {
                      this.myToast.Error('Status',data.msg);
                      return "Invalid Session";
                     }
               }
             );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end 
}
