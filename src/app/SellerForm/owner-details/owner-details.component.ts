import { ToasterServiceService } from './../../toaster-service.service';
import { fileUpload } from './fileUpload';
import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../core/token.storage';
import { AuthService } from '../../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { SellerService } from '../../shared/seller.service';
import { OwnerDetails } from './ownerdetails.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AfterViewInit, ViewChild} from '@angular/core';
@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements AfterViewInit {

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
    this.pid=92;
    this.fileName=this.ownerDto.idCardNo;
    this.idCardFileUploadPath='../ChiraghDocuments/propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy;
    this.passportFileUploadPath='../ChiraghDocuments/propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.passportCopyUpload;
  }

    ngOnInit() {
      this.atLeastOneOwner=false;
      // this.createNewProperty();
      // this.token.saveUserName('BesterCapital2');
      // this.token.savePropertyId('111');

     // console.log(this.token.getuserName());
     if(this.token.getuserName()==null){
      console.log('Invalid Session');
      this.router.navigate(['/login']);
      return "Invalid Session";
    }//end of if

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

  getAllEnteredOwner(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);
        if(this.token.getToken()!=null){
          this.sellerService.getOwners(this.token.getPropertyId(),this.token.getuserName()).subscribe(
            ownerData=>{
             this.atLeastOneOwner=true;
             this.myToast.Success('Status','Owner Data Loaded Successfully');
             console.log(ownerData);
               this.dataSource.data = ownerData;
             }//end of ownerData
         );//end of subscription of getOwners

        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser





}
