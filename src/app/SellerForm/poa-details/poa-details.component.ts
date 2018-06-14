import { Component, OnInit } from '@angular/core';
import { OwnerDetails } from '../owner-details/ownerdetails.model';
import { SellerService } from '../../shared/seller.service';
import { UserService } from '../../shared/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TokenStorage } from '../../core/token.storage';

@Component({
  selector: 'app-poa-details',
  templateUrl: './poa-details.component.html',
  styleUrls: ['./poa-details.component.css']
})
export class PoaDetailsComponent implements OnInit {
  ownerDto=new OwnerDetails();
  selectedPassport: FileList
  selectedIdCopy: FileList
  selectedScannedPoa: FileList

  passportFile:File;
  idCopyFile:File;
  scannedNotorizedPoaFile:File;
  isPoaAccepted=false;
  constructor(private sellerService:SellerService,private userService:UserService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }
 
  ngOnInit() {
  }

  selectPassport(event) {
    this.selectedPassport = event.target.files;
    this.passportFile=this.selectedPassport.item(0);
  }
  selectIdCopy(event) {
    this.selectedIdCopy = event.target.files;
    this.idCopyFile=this.selectedIdCopy.item(0);
  }
  selectScannedPoa(event) {
    this.selectedScannedPoa = event.target.files;
    this.scannedNotorizedPoaFile=this.selectedScannedPoa.item(0);
  }

  addPOA(operation:string): string {
    if(this.token.getuserName()==null){
      console.log('Invalid Session');
      return "Invalid Session";
    }
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
              
         //for testing 
        //  this.token.savePropertyId('88'); 

         if(this.token.getPropertyId()==0||this.token.getPropertyId()==null){
           return "Property Not Found";
         }
              this.ownerDto.ownerType='poa';
              this.ownerDto.propertyId=this.token.getPropertyId();//setting proeprty Id
              this.ownerDto.userName=this.token.getuserName();
              this.sellerService.addOwner(this.ownerDto).subscribe(
                data1=>{
                  this.ownerDto.propertySellerId=data1;
                 this.sellerService.saveDocument(data1+'-Spoa-passport'+this.token.getPropertyId(),this.token.getuserName(),this.passportFile).subscribe(
                  data2=>{
                    console.log(data2);
                         if(data2.type==3){
                          //  console.log(data2.partialText);
                          this.ownerDto.passportCopyUpload= data2.partialText;
                          this.sellerService.saveDocument(data1+'-Spoa-IdCopy'+this.token.getPropertyId(),this.token.getuserName(),this.idCopyFile).subscribe(
                            data3=>{
                              console.log(data3);
                                   if(data3.type==3){
                                    //  console.log(data3.partialText);
                                     this.ownerDto.scannedIdCopy= data3.partialText;
                          this.sellerService.saveDocument(data1+'-Spoa-scannedNotorizedPoaCopy'+this.token.getPropertyId(),this.token.getuserName(),this.scannedNotorizedPoaFile).subscribe(
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
                                                  if(operation=='next'){
                                                    console.log('next');
                                                    this.router.navigate(['../propertyDetails']);
                                                  }
                                                  else if(operation=='add'){
                                                    console.log('Add');
                                                      this.ownerDto=new OwnerDetails();
                                                      this.sellerService.getPoas(this.token.getPropertyId(),this.token.getuserName()).subscribe(
                                                         ownerData=>{
                                                            console.log(ownerData);
                                                         }//end of ownerData
                                                      );//end of subscription of getOwners
                                                  }//end of else if
                                                }//end of update owner data
                                              );//end of update owner subscription
                                              }//end of if
                                            }//end of data4 
                                          );//end of subscription of scanned notorized poa
                                    }//end of if checking type==3 of data3
                                } //end of IdCopy Data     
                          );//end of IdCopy subscription       
                        }//end of if  checking type ==3 of data 2
                      }//end of data2      
                );//end of Passport subscription
                }//end of seller data
              ); //end of owner save subscription
              return "POA Add Successfully";
             
        }//end of if        
     }//end of outer data predicate
    );//end of oauth service subscription 
    return "";
  }//end of loginChiraghUser
 
  
  


}
