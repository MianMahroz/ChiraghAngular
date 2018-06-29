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
  rowClicked(row: any): void {
    console.log(row);
    this.myToast.Success('Status','Owner Data Loaded Successfully');
    this.ownerDto=row;
    console.log(this.token.getImagepath());

    this.images = [
      new Image(
        0,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.adminPropertyId+'/'+this.ownerDto.scannedIdCopy,
          extUrl: 'http://www.google.com'
        }
      ),
      new Image(
        1,
        { // modal
          img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/img2.png',
          description: 'Description 2'
        }
      )];
    this.pid=92;
    this.fileName=this.ownerDto.idCardNo;
    this.idCardFileUploadPath='../ChiraghDocuments/propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy;
    this.passportFileUploadPath='../ChiraghDocuments/propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.passportCopyUpload;
  }

    ngOnInit() {
<<<<<<< HEAD
      this.role=this.token.getUserRole();
      this.adminPropertyId=this.token.getAdminPropertyId();
      console.log(this.role);
      if(this.adminPropertyId!=0||this.adminPropertyId!=null&&this.token.getUserRole()!='chiraghuser'){
        console.log(this.adminPropertyId);
        this.token.saveUserName(this.token.getAdminuserName());
        this.getAllEnteredOwner(this.adminPropertyId);
      }//end of admin code if
      else if(this.role=='chiraghuser'){
        console.log('its here ');
        this.atLeastOneOwner=false;
            if(this.token.getuserName()==null){
            this.router.navigate(['/login']);
            return "Invalid Session";
          }//end of if

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
  }//end of nginit
=======

      // if(this.token.getAdminuserName()){
      //     this.token.savePropertyId(this.clickedPropertyData.propertyId);
      //     this.token.saveUserName(this.token.getAdminuserName());
      //     this.getAllEnteredOwner();
      // }//end of if
      // else{
      //   this.router.navigate(['/adminsignin']);
      // }
      // this.atLeastOneOwner=false;

      // console.log(this.token.getuserName());
      // if(this.token.getuserName()==null){
      //   console.log('Invalid Session');
      //   this.router.navigate(['/login']);
      //   return "Invalid Session";
      // }//end of if
      
      this.action='';
      this.action=this.route.snapshot.params['action'];
      console.log(this.action);
      if(this.action=='back'){
          console.log('Inside Action');
            this.getAllEnteredOwner();
        }//end of back if
        else{
          this.token.savePropertyId('0');
        }

    }//end of nginit
>>>>>>> 1c9afc6b8ffa3187d487d2b61e971b81391ffe59
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


  addOwner(operation:string): string {
    if(this.token.getuserName()==null){
      this.myToast.Error('Status','Invalid Session');
      console.log('Invalid Session');
      this.router.navigate(['/login']);
      return "Invalid Session";
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
                  return "Owner Add Successfully";
             }//end of pid if
             else{
              this.ownerDto.propertyId=this.token.getPropertyId();//setting proeprty Id
              this.ownerDto.userName=this.token.getuserName();
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
            this.sellerService.saveDocument('/propertyId,'+this.token.getPropertyId()+'/',data1+',Sowner-IdCopy'+this.token.getPropertyId(),this.token.getuserName(),this.idCopyFile).subscribe(
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
    );//end of oauth service subscription
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
          this.myToast.Success('Status','Owner Add Successfully');
          console.log(ownerData);
            this.dataSource.data = ownerData;
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
