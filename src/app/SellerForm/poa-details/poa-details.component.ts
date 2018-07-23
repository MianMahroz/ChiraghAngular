import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit } from '@angular/core';
import { OwnerDetails } from '../owner-details/ownerdetails.model';
import { SellerService } from '../../shared/seller.service';
import { UserService } from '../../shared/user.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TokenStorage } from '../../core/token.storage';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AfterViewInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-poa-details',
  templateUrl: './poa-details.component.html',
  styleUrls: ['./poa-details.component.css']
})
export class PoaDetailsComponent implements AfterViewInit {
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }
  ownerDto=new OwnerDetails();
  selectedPassport: FileList
  selectedIdCopy: FileList
  selectedScannedPoa: FileList
  idCardFileUploadPath:string;
  passportFileUploadPath:string;
  scannedPoaFileUploadPath:string;
  passportFile:File;
  idCopyFile:File;
  scannedNotorizedPoaFile:File;
  isPoaAccepted=false;
  atLeastOnePoa=false;
  displayedColumns = ['firstName', 'lastName','nationality','passportNo','passportExpiryDate','mobile'];
  dataSource = new MatTableDataSource<OwnerDetails>();
  action:string;


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
  scannedPoaFileUploadValid=true;
  isPoaAcceptedValid=true;
  idcopypoaPath:string;
  passportcopypoaPath:string;
  notorizedcopyPath:string;
  poanumberValid=true;
  poaexpiryValid=true;
  specificpropertyValid=true;



  constructor(private myToast:ToasterServiceService,private route:ActivatedRoute,private sellerService:SellerService,private userService:UserService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadScript('./assets/js/common.js');
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  rowClicked(row: any): void {
    console.log(row);
    this.myToast.Info('Status','POA Data Loaded Successfully');
    this.ownerDto=row;
    this.passportcopypoaPath =''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.ownerDto.passportCopyUpload;
    this.idcopypoaPath=''+this.token.getImagepath()+'propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy;
    this.notorizedcopyPath=''+this.token.getImagepath()+'propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy;

  }
  ngOnInit() {
    this.atLeastOnePoa=false;
    this.action='';
    this.action=this.route.snapshot.params['action'];
    console.log(this.action);
    if(this.action=='back'||this.action=='next'){
          console.log('Inside Action');
          this.getAllEnteredPoa();
      }//end of back if
  }

  selectPassport(event):string{
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
        this.passportcopypoaPath = (<FileReader>event.target).result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
        this.selectedPassport = event.target.files;
        this.passportFile=this.selectedPassport.item(0);
        this.ownerDto.passportCopyUpload=this.passportFile.name;
        this.passportcopypoaPath =''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.ownerDto.passportCopyUpload;
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
          this.idcopypoaPath = (<FileReader>event.target).result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
        this.selectedIdCopy = event.target.files;
        this.idCopyFile=this.selectedIdCopy.item(0);
        this.ownerDto.scannedIdCopy=this.idCopyFile.name;
        this.idcopypoaPath=''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.ownerDto.scannedIdCopy;
        event.srcElement.value = null;
  }
  selectScannedPoa(event) {

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
          this.notorizedcopyPath = (<FileReader>event.target).result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
        this.selectedScannedPoa = event.target.files;
        this.scannedNotorizedPoaFile=this.selectedScannedPoa.item(0);
        this.ownerDto.scannedNotorizedCopy=this.scannedNotorizedPoaFile.name;
        this.notorizedcopyPath=''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.ownerDto.scannedIdCopy;
        event.srcElement.value = null;
  }

  moveOnAddPoaNo():string{
    console.log("moving next");
    this.router.navigate(['/propertyDetails/next']);
    return "Moving to Property Detail Form";
  }

  validation():boolean {
    console.log('POA  Validations!');
    // this.ownerDto.passportExpiryDate='2018-01-01';
  // this.ownerDto.idCardExpiration='2018-02-01';
    //var firstname1=this.ownerDto.firstName;
    //this.requiredfieldsArray['firstNamevalidation',this.ownerDto.lastName,this.ownerDto.nationality,this.ownerDto.passportNo,this.ownerDto.passportExpiryDate,this.ownerDto.mobile,this.ownerDto.email,this.ownerDto.address];
    this.firstnameValid=true;
    console.log(this.ownerDto.firstName);
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
    if(email["0"]!==this.ownerDto.email){
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
          if(telephone["0"]!==this.ownerDto.telephone){
            this.myToast.Error('Invaild Phone Number ');
            this.phonenoValid=false;
          }
          if(this.ownerDto.telephone.length>16){
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

        this.isPoaAcceptedValid=true;
       // var poaaccepted=this.ownerDto.isPoaAccepted;
        if(this.ownerDto.isPoaAccepted="true"){
           // this.myToast.Error('Passport Copy Upload required ');
           this.isPoaAcceptedValid=true;
           console.log(this.ownerDto.isPoaAccepted);
           console.log("Poa Check Box");
        }
        else
        {
          console.log("Poa Check Box");
          console.log(this.ownerDto.isPoaAccepted);
          this.myToast.Error('IsPoa Accepted CheckBox required!');
          this.isPoaAcceptedValid=false;
        }

           this.scannedPoaFileUploadValid=true;
          if(this.ownerDto.scannedNotorizedCopy==null||this.ownerDto.scannedNotorizedCopy==undefined){
            this.myToast.Error('Scanned Notorized Poa Upload required');
            this.scannedPoaFileUploadValid=false;
        }

        this.poaexpiryValid=true;
        if(this.ownerDto.poaAgreementExpiry)
        {
         this.poaexpiryValid=true;
        }
        else{

          this.myToast.Error('Poa Agreement Expiry Date Cannot Empty');
          this.poaexpiryValid=false;
        }

        this.poanumberValid=true;
        if(this.ownerDto.poaNumber)
        {

           var poanumber =this.ownerDto.poaNumber.match('[0-9-]*');
           if(poanumber["0"]!==this.ownerDto.poaNumber){
           this.myToast.Error('Invaild POA Number');
           this.poanumberValid=false;
        }}
        else{

          this.myToast.Error('Poa Number Cannot Empty');
          this.poanumberValid=false;
        }


        this.specificpropertyValid=true;
        if(this.ownerDto.specificProperty)
        {
          console.log(this.ownerDto.specificProperty);
          this.specificpropertyValid=true;
        }
        else{
          console.log(this.ownerDto.specificProperty);
          this.myToast.Error('Specific Property Cannot Empty');
          this.specificpropertyValid=false;
        }

    if(this.firstnameValid==false||this.lastnameValid==false||this.nationalityValid==false||this.passportValid==false
    ||this.moblieValid==false||this.emailValid==false||this.addressValid==false
    ||this.idcardValid==false||this.phonenoValid==false||this.poboxValid==false
    ||this.passportuploadValid==false||this.idcopyuploadValid==false||this.scannedPoaFileUploadValid==false||this.isPoaAcceptedValid==false
    ||this.poanumberValid==false||this.specificpropertyValid==false||this.poaexpiryValid==false){
       this.formValid=false;
    }
    else
    {
      this.formValid=true;
    }

    return this.formValid;
    }

  addPOA(operation:string): string {
    if(this.token.getuserName()==null){
      this.myToast.Error('Status','Invalid Session');
      console.log('Invalid Session');
      return "Invalid Session";
    }
    // if(this.ownerDto.firstName!=null || this.ownerDto.firstName!='' && operation=='next'){
    //   this.router.navigate(['/propertyDetails/next']);
    // }
    if(this.validation()==true){

    }
    else {
      return "Invalid Form";
    }


    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){

         //for testing
        //this.token.savePropertyId('88');

         if(this.token.getPropertyId()==0||this.token.getPropertyId()==null){
          this.myToast.Error('Status','Property Not Found');
           return "Property Not Found";
         }

              this.ownerDto.ownerType='poa';
              this.ownerDto.propertyId=this.token.getPropertyId();//setting proeprty Id
              this.ownerDto.userName=this.token.getuserName();
              this.sellerService.addOwner(this.ownerDto).subscribe(
                data1=>{
                  this.ownerDto.sellerId=data1;
                 this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data1+'-Spoa-passport'+this.token.getPropertyId(),this.token.getuserName(),this.passportFile).subscribe(
                  data2=>{
                    console.log(data2);
                         if(data2.type==3){
                          //  console.log(data2.partialText);
                          this.ownerDto.passportCopyUpload= data2.partialText;
                          this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data1+'-Spoa-IdCopy'+this.token.getPropertyId(),this.token.getuserName(),this.idCopyFile).subscribe(
                            data3=>{
                              console.log(data3);
                                   if(data3.type==3){
                                    //  console.log(data3.partialText);
                                     this.ownerDto.scannedIdCopy= data3.partialText;
                          this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data1+'-Spoa-scannedNotorizedPoaCopy'+this.token.getPropertyId(),this.token.getuserName(),this.scannedNotorizedPoaFile).subscribe(
                                      data4=>{
                                        console.log(data4);
                                             if(data4.type==3){
                                              //  console.log(data4.partialText);
                                               this.ownerDto.scannedNotorizedCopy= data4.partialText;
                                               this.ownerDto.userName=this.token.getuserName();
                                               this.ownerDto.isPersonalDetailsVerified='false';
                          this.sellerService.updateOwner(this.ownerDto).subscribe(
                                                data5=>{
                                                  console.log('Update owner');
                                                  console.log(data5);
                                                 this.editProcessHelper(operation);
                                                }//end of update owner data
                                              );//end of update owner subscription
                                              }//end of if
                                            }//end of data4
                                          );//end of subscription of scanned notorized poa
                                    }//end of if checking type==3 of data3
                                } //end of IdCopy Data
                          );//end of IdCopy subscription
                        }//end of if  checking type ==3 of data 2
                        else if(data2=='Data'){
                           this.editProcessHelper(operation);
                        }//end of else if of data2=='Data'
                      }//end of data2
                );//end of Passport subscription
                }//end of seller data
              ); //end of owner save subscription
              this.myToast.Success('Status','POA Added Successfully');
              return "POA Add Successfully";
        }//end of if
     }//end of outer data predicate
    );//end of oauth service subscription
    return "";
  }//end of loginChiraghUser

editProcessHelper(operation:string):void{
  if(operation=='next'){
    console.log('next');
    this.router.navigate(['/propertyDetails/next']);
  }
  else if(operation=='add'){
    console.log('Add');
      this.ownerDto=new OwnerDetails();
      this.idCopyFile=null;
      this.passportFile=null;
      this.scannedNotorizedPoaFile=null;
      this.selectedIdCopy=null;
      this.selectedPassport=null;
      this.selectedScannedPoa=null;
      this.passportcopypoaPath =null;
      this.idcopypoaPath=null;
      this.notorizedcopyPath=null;


      this.sellerService.getPoas(this.token.getPropertyId(),this.token.getuserName()).subscribe(
         ownerData=>{
          this.atLeastOnePoa=true;
          this.dataSource.data = ownerData;
            console.log(ownerData);
           // this.myToast.Success('Status','POA data loaded Successfully');
         }//end of ownerData
      );//end of subscription of getOwners
  }//end of else if
}


  getAllEnteredPoa(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);
        if(this.token.getToken()!=null){
          this.sellerService.getPoas(this.token.getPropertyId(),this.token.getuserName()).subscribe(
            ownerData=>{
            if(ownerData.length!=0){
               this.atLeastOnePoa=true;
               console.log(ownerData);
               this.dataSource.data = ownerData;
               //console.log(ownerData);
               this.ownerDto=ownerData[ownerData.length-1];
               this.passportcopypoaPath =''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.ownerDto.passportCopyUpload;
               this.idcopypoaPath=''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.ownerDto.scannedIdCopy;
               this.notorizedcopyPath=''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.ownerDto.scannedIdCopy;
               this.myToast.Info('Status','POA data loaded Successfully');
            }//end of if on ownerdata check
             }//end of ownerData
         );//end of subscription of getOwners
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser


}
