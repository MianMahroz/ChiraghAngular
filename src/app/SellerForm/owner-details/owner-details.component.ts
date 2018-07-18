import { ToasterServiceService } from './../../toaster-service.service';
import { fileUpload } from './fileUpload';
import { Component, OnInit, Input } from '@angular/core';
import { TokenStorage } from '../../core/token.storage';
import { AuthService } from '../../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { SellerService } from '../../shared/seller.service';
import { OwnerDetails } from './ownerdetails.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AfterViewInit, ViewChild} from '@angular/core';
import {ModalGalleryModule,Image} from 'angular-modal-gallery';
import { empty } from 'rxjs/Observer';
@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements AfterViewInit {

 adminPropertyId:number;
 role:string;

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

  displayedColumns = ['firstName', 'lastName','nationality','passportNo','passportExpiryDate','mobile'];
  dataSource = new MatTableDataSource<OwnerDetails>();
  atLeastOneOwner=false;

  selectedPassport: FileList
  selectedIdCopy: FileList
  selectedScannedPoa: FileList
  //get image variables
  pid:number;
  fileName:string;
  action:string;//for back button
  passportFile:File;
  idCopyFile:File;
  ownerDto=new OwnerDetails();
  idCardFileUploadPath:string;
  passportFileUploadPath:string;

  images: Image[]=[] ;

  firstnameValid=true;
  lastnameValid=true;
  nationalityValid=true;
  passportValid=true;
  passportexpiryValid=true;
  emailValid=true;
  moblieValid=true;
  addressValid=true;
  middlenameValid=true;
  idcardValid=true;
  phonenoValid=true;
  poboxValid=true;
  idcardexpiryValid=true;
  formValid=true;
  passportuploadValid=true;
  idcopyuploadValid=true;
  //requiredfieldsArray:any[];


  constructor(private myToast:ToasterServiceService,private route:ActivatedRoute,private sellerService:SellerService,private userService:UserService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.loadScript('./assets/js/common.js');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
      )];
}//end of get owner details

  rowClicked(row: any): void {
    console.log(row);
    this.myToast.Success('Status','Owner Data Loaded Successfully');
    this.ownerDto=row;
    console.log(this.token.getImagepath());
    this.getOwnerImages();
    this.pid=92;
    this.fileName=this.ownerDto.idCardNo;
    this.idCardFileUploadPath='../ChiraghDocuments/propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy;
    this.passportFileUploadPath='../ChiraghDocuments/propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.passportCopyUpload;
  }

    ngOnInit() {
      this.role=this.token.getUserRole();
      this.adminPropertyId=this.token.getAdminPropertyId();
      console.log(this.role);
      if(this.token.getuserName()==null){
        this.router.navigate(['/login']);
        return "Invalid Session";
      }//end of if
       if(this.role=='chiraghuser'){
        console.log('its here ');
        this.atLeastOneOwner=false;



        this.action='';
        this.action=this.route.snapshot.params['action'];
        console.log(this.action);
        if(this.action=='back'){
            console.log('Inside Action');
              this.getAllEnteredOwner(this.token.getPropertyId());
          }//end of back if
          else{
            this.token.savePropertyId('0');
          }
    }//end of admin else
    else{
      this.router.navigate(['/login']);
    }
  }//end of nginit
    selectPassport(event) {
      this.selectedPassport = event.target.files;
      this.passportFile=this.selectedPassport.item(0);
      event.srcElement.value = null;
      // console.log(this.passportFile);
      this.ownerDto.passportCopyUpload=this.passportFile.name;
    
    }
    selectIdCopy(event) {
      this.selectedIdCopy = event.target.files;
      this.idCopyFile=this.selectedIdCopy.item(0);
      // console.log(this.idCopyFile);
      event.srcElement.value = null;
      this.ownerDto.scannedIdCopy=this.idCopyFile.name;
   }

   showValidationToast(msg:string):void{
    this.myToast.Warning('',msg);
   }

   applyValidation():void{

   }
validation():boolean {

//   if(this.idCopyFile==null && this.passportFile==null)
//   {
//     this.myToast.Warning('Enter Different Details For Another Owner');
//      return false;
//   }
// else{
  console.log('Owner Validations!');
  //var firstname1=this.ownerDto.firstName;
  //this.requiredfieldsArray['firstNamevalidation',this.ownerDto.lastName,this.ownerDto.nationality,this.ownerDto.passportNo,this.ownerDto.passportExpiryDate,this.ownerDto.mobile,this.ownerDto.email,this.ownerDto.address];
  this.firstnameValid=true;
  if(this.ownerDto.firstName)
  {
  var firstname =this.ownerDto.firstName.match('[a-zA-Z]*');
  if(firstname["0"]!==this.ownerDto.firstName){
    this.myToast.Error('Invalid First Name');
    this.firstnameValid=false;
  }

if(this.ownerDto.firstName.length<3){
  this.myToast.Error('First Name must be at least 3 characters long.');
  this.firstnameValid=false;
}

if(this.ownerDto.firstName.length>15){
  this.myToast.Error('First Name cannot be more than 15 characters long');
  this.firstnameValid=false;
}}
  else{

    this.myToast.Error('First Name Cannot Empty');
    this.firstnameValid=false;
  }
  this.lastnameValid=true;
  if(this.ownerDto.lastName){
  var lastname =this.ownerDto.lastName.match('[a-zA-Z]*');
  if(lastname["0"]!==this.ownerDto.lastName){
    this.myToast.Error('Invalid Last Name');
    this.lastnameValid=false;
  }

  if(this.ownerDto.lastName.length<3){
    this.myToast.Error('Last Name must be at least 3 characters long.');
    this.lastnameValid=false;}
  if(this.ownerDto.lastName.length>15){
    this.myToast.Error('Last Name cannot be more than 15 characters long');
    this.lastnameValid=false;
  }}

  else{

    this.myToast.Error('Last Name Cannot Empty');
    this.lastnameValid=false;
  }
this.nationalityValid=true;
  if(this.ownerDto.nationality)
  {
  var nationality =this.ownerDto.nationality.match('[a-zA-Z]*');
  if(nationality["0"]!==this.ownerDto.nationality){
    this.myToast.Error('Invaild Nationality');
    this.nationalityValid=false;
  }}
  else{

    this.myToast.Error('Nationality Cannot Empty');
    this.nationalityValid=false;
  }
this.passportValid=true;
  if(this.ownerDto.passportNo){
  var passportNo =this.ownerDto.passportNo.match('[a-zA-Z0-9]*');
  if(passportNo["0"]!==this.ownerDto.passportNo){
    this.myToast.Error('Invaild Passport Number');
    this.passportValid=false;
  }

  if(this.ownerDto.passportNo.length>15){
    this.myToast.Error('Passport Number cannot be more than 15 characters long');
    this.passportValid=false;
  }}
  else{

    this.myToast.Error('Passport Number Cannot Empty');
    this.passportValid=false;
  }
   this.passportexpiryValid=true;
   console.log(this.ownerDto.passportExpiryDate);
   console.log(this.ownerDto.idCardExpiration);
  if(this.ownerDto.passportExpiryDate)
  {
  var stringdate=this.ownerDto.passportExpiryDate.toString();
  var passportExpiryDate =stringdate.match('[0-9-]*');
  if(passportExpiryDate["0"]!==this.ownerDto.passportExpiryDate){
    this.myToast.Error('Invaild Passport Expiry Date');
    this.passportexpiryValid=false;
  }}

  else{

    this.myToast.Error('Passport Expiry Date Cannot Empty');
    this.passportexpiryValid=false;
  }
this.moblieValid=true;
if(this.ownerDto.mobile){
  var mobile =this.ownerDto.mobile.match('[0-9]*');
  if(mobile["0"]!==this.ownerDto.mobile){
    this.myToast.Error('Invaild Mobile Number');
    this.moblieValid=false;
  }

  if(this.ownerDto.mobile.length>16 && this.ownerDto.mobile.length<16){
    this.myToast.Error('Please enter a 16 digit number');
    this.moblieValid=false;
  }}

  else{

    this.myToast.Error('Mobile Number Cannot Empty');
    this.moblieValid=false;
  }
this.emailValid=true;
if(this.ownerDto.email){
  var email =this.ownerDto.email.match('[^ @]*@[^ @]*');
  if(email["0"]!==this.ownerDto.email){
    this.myToast.Error('Invaild Email');
    this.emailValid=false;
  }}
  else{

    this.myToast.Error('Email Cannot Empty');
    this.emailValid=false;
  }
this.addressValid=true;
if(this.ownerDto.address){
  var address =this.ownerDto.address.match('[a-zA-Z0-9//_() & % # ~ , . "" ;:[] $ ^ @]*@[^ @]*');
  if(address["0"]!==this.ownerDto.email){
    this.myToast.Error('Invaild Address');
    this.addressValid=false;
  }}
  else{

    this.myToast.Error('Address Cannot Empty');
    this.addressValid=false;
  }
   this.middlenameValid=true;
  if(this.ownerDto.middleName){
    var middleName =this.ownerDto.middleName.match('[a-zA-Z]*');
    if(middleName["0"]!==this.ownerDto.middleName){
      this.myToast.Error('Invaild Middle Name');
      this.middlenameValid=false;
    }
    if(this.ownerDto.middleName.length<3){
      this.myToast.Error('Middle Name must be at least 3 characters long.');
      this.middlenameValid=false;}
    if(this.ownerDto.middleName.length>15){
      this.myToast.Error('Middle Name cannot be more than 15 characters long');
      this.middlenameValid=false;
    }

  }
  console.log(this.ownerDto.idCardExpiration);
    this.idcardexpiryValid=true;
    if(this.ownerDto.idCardExpiration){
      var datestring=this.ownerDto.idCardExpiration.toString();
      var idCardExpiration=datestring.match('[0-9-]*');
      if(idCardExpiration["0"]!==this.ownerDto.idCardExpiration){
        this.myToast.Error('Invaild Id Card Expiration');
        this.idcardexpiryValid=false;
      }}

      this.idcardValid=true;
    if(this.ownerDto.idCardNo){
      var idCardNo=this.ownerDto.idCardNo.match('[0-9]*');
      if(idCardNo["0"]!==this.ownerDto.idCardNo){
        this.myToast.Error('Invaild Id Card ');
        this.idcardValid=false;
      }
      if(this.ownerDto.idCardNo.length>18){
      this.myToast.Error('ID Card Number cannot be more than 18 characters long.');
      this.idcardValid=false;}}

      this.phonenoValid=true;
      if(this.ownerDto.telephone){
        var telephone=this.ownerDto.telephone.match('[0-9]*');
        if(telephone["0"]!==this.ownerDto.idCardNo){
          this.myToast.Error('Invaild Phone Number ');
          this.phonenoValid=false;
        }
        if(this.ownerDto.telephone.length>18){
        this.myToast.Error('Please enter a 16 digit number.');
        this.phonenoValid=false;}}

        this.poboxValid=true;
        if(this.ownerDto.pobox){
          var pobox=this.ownerDto.pobox.match('[0-9]*');
          if(pobox["0"]!==this.ownerDto.pobox){
            this.myToast.Error('Invaild Phone Number ');
            this.poboxValid=false;
          }
          if(this.ownerDto.pobox.length>18){
          this.myToast.Error('P.O Box cannot be more than 18 characters long.');
          this.poboxValid=false;}}

          this.passportuploadValid=true;
        if(this.ownerDto.passportCopyUpload==null||this.ownerDto.passportCopyUpload==undefined){
            this.myToast.Error('Passport Copy Upload required ');
            this.passportuploadValid=false;
        }
        this.idcopyuploadValid=true;
        if(this.ownerDto.scannedIdCopy==null||this.ownerDto.scannedIdCopy==undefined){
          this.myToast.Error('Id Copy Upload required ');
          this.idcopyuploadValid=false;
      }

  if(this.firstnameValid==false||this.lastnameValid==false||this.nationalityValid==false||this.passportValid==false
  ||this.moblieValid==false||this.emailValid==false||this.addressValid==false
  ||this.idcardValid==false||this.phonenoValid==false||this.poboxValid==false
  ||this.passportuploadValid==false||this.idcopyuploadValid==false){
     this.formValid=false;
  }

  else
  {
    this.formValid=true;
  }

  return this.formValid;
  }

  addOwner(operation:string): string {
    if(this.token.getuserName()==null){
      this.myToast.Error('Status','Invalid Session');
      console.log('Invalid Session');
      this.router.navigate(['/login']);
      return "Invalid Session";
    }


    if(this.validation()==true){

    }
    else {
      return "Invalid Owner Form";
    }

    if(this.ownerDto.firstName==null || this.ownerDto.firstName==''&&operation=='next'){
      this.router.navigate(['/sellerPoaDetails/next']);
    }

    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
              var pid=0;
              pid=this.token.getPropertyId();
              this.ownerDto.ownerType='owner';
              this.ownerDto.userName=this.token.getuserName();
              if(pid==0||pid==null){
                  this.sellerService.createProperty(this.token.getuserName()).subscribe(
                    data11=>{
                      if(!this.token.getPropertyId){
                        this.myToast.Error('Status','Property Not Created Successfully');
                        return 'Property not Created';
                      }
                         this.token.savePropertyId(data11)
                         this.ownerDto.propertyId=this.token.getPropertyId();
                         this.ownerDto.isPersonalDetailsVerified='false';
                  this.sellerService.addOwner(this.ownerDto).subscribe(
                    data1=>{
                      console.log('Owner');
                      console.log(data1);
                      this.ownerDto.propertySellerId=data1;
                  this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data1+',Sowner-passport,'+this.token.getPropertyId(),this.token.getuserName(),this.passportFile).subscribe(
                      data2=>{
                        console.log(data2);
                             if(data2.type==3){
                              //  console.log(data2.partialText);
                              this.ownerDto.passportCopyUpload= data2.partialText;
                  this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data1+',Sowner-IdCopy'+this.token.getPropertyId(),this.token.getuserName(),this.idCopyFile).subscribe(
                                data3=>{
                                  // console.log(data3);
                                       if(data3.type==3){
                                        //  console.log(data3.partialText);

                                        this.ownerDto.scannedIdCopy= data3.partialText;

                                        this.sellerService.updateOwner(this.ownerDto).subscribe(
                                          data5=>{
                                            console.log('Update owner');
                                            console.log(data5);
                                            this.editProcessHelper(operation);
                                          }//end of update owner data
                                        );//end of update owner subscription
                                        }//end of if checking type==3 of data3
                                    } //end of IdCopy Data
                              );//end of IdCopy subscription
                            }//end of if  checking type ==3 of data 2
                            else if(data2=='Data'){
                               this.editProcessHelper(operation);
                            }//end of else if of Edit Image Functionality
                          }//end of data2
                    );//end of Passport subscription


                    }//end of seller data
                  ); //end of owner save subscription
                     }//end of data of create property
                  );         //create property subscription
                 // this.myToast.Success('Status','Owner Add Successfully');
                  return "Owner Add Successfully";
             }//end of pid if
             else{
              this.ownerDto.propertyId=this.token.getPropertyId();//setting proeprty Id
              this.ownerDto.userName=this.token.getuserName();
              this.ownerDto.isPersonalDetailsVerified='false';
            this.sellerService.addOwner(this.ownerDto).subscribe(
               data1=>{
                console.log(' owner');
                console.log(data1);

            this.ownerDto.propertySellerId=data1;
            this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data1+',Sowner-passport'+this.token.getPropertyId(),this.token.getuserName(),this.passportFile).subscribe(
                 data2=>{
                   console.log(data2);
                        if(data2.type==3){
                          // console.log(data2.partialText);
                         this.ownerDto.passportCopyUpload= data2.partialText;
            this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data1+',Sowner-IdCopy'+this.token.getPropertyId(),this.token.getuserName(),this.idCopyFile).subscribe(
                           data3=>{
                            //  console.log(data3);
                                  if(data3.type==3){
                                    // console.log(data3.partialText);
                                    this.ownerDto.scannedIdCopy= data3.partialText;
            this.sellerService.updateOwner(this.ownerDto).subscribe(
                                     data5=>{
                                       console.log('Update owner');
                                       console.log(data5);
                                       this.editProcessHelper(operation);
                                     }//end of update owner data
                                   );//end of update owner subscription
                                   }//end of  If checking type==3 of data3
                               } //end of IdCopy Data
                         );//end of IdCopy subscription
                       }//end of if checking type==3 of data2
                       else if(data2=='Data'){
                        this.editProcessHelper(operation);
                      }//end of else if of Edit Image Functionality
                     }
               );//end of Passport subscription

               }//end of seller data
             ); //end of owner save subscription

 }//end of  else

        }//end of if
     }//end of outer data predicate
    );
  //end of oauth service subscription
    return "";
  }//end of loginChiraghUser


editProcessHelper(operation:string):void{
  if(operation=='next'){
    console.log('next');
    this.router.navigate(['/sellerPoaDetails/next']);
  }
  else if(operation=='add'){
    console.log('Add');
//resetting fields
      this.ownerDto=new OwnerDetails();
      this.idCopyFile=null;
      this.passportFile=null;
      this.selectedIdCopy=null;
      this.selectedPassport=null;

      this.sellerService.getOwners(this.token.getPropertyId(),this.token.getuserName()).subscribe(
         ownerData=>{
          this.atLeastOneOwner=true;
          this.myToast.Success('Status','Add Another Owner Details');
          console.log(ownerData);
            this.dataSource.data = ownerData;
            //this.ownerDto=ownerData[ownerData.length-1]
          }//end of ownerData
      );//end of subscription of getOwners
  }//end of else if
}

  getAllEnteredOwner(propertyId:number): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);
        if(this.token.getToken()!=null){
          this.sellerService.getOwners(propertyId,this.token.getuserName()).subscribe(
            ownerData=>{
              if(ownerData.length!=0){
                  this.atLeastOneOwner=true;
                  this.myToast.Success('Status','Owner Data Loaded Successfully');
                  console.log(ownerData);
                  this.dataSource.data = ownerData;
                  this.ownerDto=ownerData[ownerData.length-1];
                }//end of lenght condition
              else{
                this.dataSource.data = ownerData;
                this.atLeastOneOwner=false;
              }//end of else
             }//end of ownerData
         );//end of subscription of getOwners

        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser


//start of admin methods

ownerVerified(): void {
  window.sessionStorage.removeItem('AuthToken');
  this.authService.attemptAuth().subscribe(
    data => {
      this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
      if(this.token.getToken()!=null){
        this.ownerDto.isPersonalDetailsVerified='true';
        this.ownerDto.userName=this.token.getAdminuserName();
        this.ownerDto.propertyId=this.adminPropertyId;
       this.sellerService.updateOwner(this.ownerDto).subscribe(
         data=>{
                   this.myToast.Info('Status','Owner Verified Successfully');
                   this.ownerDto=new OwnerDetails();
                   this.getAllEnteredOwner(this.adminPropertyId);
         }//end of
       );
      }//end of if

   }//end of outer data predicate
  );//end of outer subscription

}//end of loginChiraghUser



}//end of class

