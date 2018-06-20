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
  displayedColumns = ['propertySellerId', 'firstName', 'middleName', 'lastName','nationality','idCardNo','idCardExpiration','passportNo','passportExpiryDate','telephone','mobile'];
  dataSource = new MatTableDataSource<OwnerDetails>();
  action:string;


  constructor(private myToast:ToasterServiceService,private route:ActivatedRoute,private sellerService:SellerService,private userService:UserService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
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
    this.myToast.Info('Status','POA Data Loaded Successfully');
    this.ownerDto=row;
    this.idCardFileUploadPath='../ChiraghDocuments/propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy;
    this.passportFileUploadPath='../ChiraghDocuments/propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.passportCopyUpload;
    this.scannedPoaFileUploadPath='../ChiraghDocuments/propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedNotorizedCopy;

  }
  ngOnInit() {

    // //for testing purpose
    // this.token.saveUserName('BesterCapital2');
    // this.token.savePropertyId('111');
    this.atLeastOnePoa=false;
    this.action='';
    this.action=this.route.snapshot.params['action'];
    console.log(this.action);
    if(this.action=='back'||this.action=='next'){
          console.log('Inside Action');
          this.getAllEnteredPoa();
      }//end of back if
  }

  selectPassport(event) {
    this.selectedPassport = event.target.files;
    this.passportFile=this.selectedPassport.item(0);
    event.srcElement.value = null;
  }
  selectIdCopy(event) {
    this.selectedIdCopy = event.target.files;
    this.idCopyFile=this.selectedIdCopy.item(0);
    event.srcElement.value = null;
  }
  selectScannedPoa(event) {
    this.selectedScannedPoa = event.target.files;
    this.scannedNotorizedPoaFile=this.selectedScannedPoa.item(0);
    event.srcElement.value = null;
  }

  addPOA(operation:string): string {
    if(this.token.getuserName()==null){
      this.myToast.Error('Status','Invalid Session');
      console.log('Invalid Session');
      return "Invalid Session";
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
                  this.ownerDto.propertySellerId=data1;
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
               this.myToast.Success('Status','POA data loaded Successfully');
            }//end of if on ownerdata check
             }//end of ownerData
         );//end of subscription of getOwners
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser


}
