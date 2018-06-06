import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../core/token.storage';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { SellerService } from '../../shared/seller.service';
import { OwnerDetails } from './ownerdetails.model';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  
  selectedPassport: FileList
  selectedIdCopy: FileList
  selectedScannedPoa: FileList

  passportFile:File;
  idCopyFile:File;
  ownerDto=new OwnerDetails();

  constructor(private sellerService:SellerService,private userService:UserService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }
  
    ngOnInit() {
       // this.createNewProperty();
      this.token.savePropertyId('0');  
     // console.log(this.token.getuserName());
     if(this.token.getuserName()==null){
      console.log('Invalid Session');
      this.router.navigate(['../login']);
      return "Invalid Session";
    }
    
    }
    selectPassport(event) {
      this.selectedPassport = event.target.files;
      this.passportFile=this.selectedPassport.item(0);
    }
    selectIdCopy(event) {
      this.selectedIdCopy = event.target.files;
      this.idCopyFile=this.selectedIdCopy.item(0);
    }
    
   
  addOwner(operation:string): string {
    if(this.token.getuserName()==null){
      console.log('Invalid Session');
      this.router.navigate(['../login']);
      return "Invalid Session";
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
                        return 'Property not Created';
                      }
                         this.token.savePropertyId(data11)
                         this.ownerDto.propertyId=this.token.getPropertyId();
             
                   this.sellerService.addOwner(this.ownerDto).subscribe(
                    data1=>{
                      console.log('Owner');
                      console.log(data1);
                      this.ownerDto.propertySellerId=data1;
                      this.sellerService.saveDocument(data1+'-Sowner-passport'+this.token.getPropertyId(),this.token.getuserName(),this.passportFile).subscribe(
                      data2=>{
                        // console.log(data2);
                             if(data2.type==3){
                              //  console.log(data2.partialText);
                              this.ownerDto.passportCopyUpload= data2.partialText;
                              this.sellerService.saveDocument(data1+'-Sowner-IdCopy'+this.token.getPropertyId(),this.token.getuserName(),this.idCopyFile).subscribe(
                                data3=>{
                                  // console.log(data3);
                                       if(data3.type==3){
                                        //  console.log(data3.partialText);
                                         this.ownerDto.scannedIdCopy= data3.partialText;
                              this.sellerService.updateOwner(this.ownerDto).subscribe(
                                          data5=>{
                                            console.log('Update owner');
                                            console.log(data5);
                                            if(operation=='next'){
                                              console.log('next');
                                              this.router.navigate(['../sellerPoaDetails']);
                                            }
                                            else if(operation=='add'){
                                              console.log('Add');
                                                this.ownerDto=new OwnerDetails();
                                                this.sellerService.getOwners(this.token.getPropertyId(),this.token.getuserName()).subscribe(
                                                   ownerData=>{
                                                      console.log(ownerData);
                                                   }//end of ownerData
                                                );//end of subscription of getOwners
                                            }//end of else if
                                          }//end of update owner data
                                        );//end of update owner subscription
                                        }//end of if checking type==3 of data3
                                    } //end of IdCopy Data     
                              );//end of IdCopy subscription       
                            }//end of if  checking type ==3 of data 2
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
                this.sellerService.saveDocument(data1+'-Sowner-passport'+this.token.getPropertyId(),this.token.getuserName(),this.passportFile).subscribe(
                 data2=>{
                  //  console.log(data2);
                        if(data2.type==3){
                          // console.log(data2.partialText);
                         this.ownerDto.passportCopyUpload= data2.partialText;
                         this.sellerService.saveDocument(data1+'-Sowner-IdCopy'+this.token.getPropertyId(),this.token.getuserName(),this.idCopyFile).subscribe(
                           data3=>{
                            //  console.log(data3);
                                  if(data3.type==3){
                                    // console.log(data3.partialText);
                                    this.ownerDto.scannedIdCopy= data3.partialText;
                         this.sellerService.updateOwner(this.ownerDto).subscribe(
                                     data5=>{
                                       console.log('Update owner');
                                       console.log(data5);
                                       if(operation=='next'){
                                        this.router.navigate(['../sellerPoaDetails']);
                                      }
                                      else if(operation=='add'){
                                          this.ownerDto=new OwnerDetails();
                                          this.sellerService.getOwners(this.token.getPropertyId(),this.token.getuserName()).subscribe(
                                             ownerData=>{
                                                console.log(ownerData);
                                             }//end of ownerData
                                          );//end of subscription of getOwners
                                      }//end of else if
                                     }//end of update owner data
                                   );//end of update owner subscription
                                   }//end of  If checking type==3 of data3
                               } //end of IdCopy Data     
                         );//end of IdCopy subscription       
                       }//end of if checking type==3 of data2
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
 
  

  // createNewProperty(): void {
  //   window.sessionStorage.removeItem('AuthToken');
  //   this.authService.attemptAuth().subscribe(
  //     data => {
  //       this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
  //       // console.log(data);
  //       if(this.token.getToken()!=null){
  //         this.sellerService.createProperty('BesterCapital2').subscribe(
  //            data1=>{
  //                   this.token.savePropertyId(data1)
  //                   console.log('New Property Created');    
  //                   console.log(this.token.getPropertyId());
  //           }
  //         );
  //       }//end of if        
  //    }//end of outer data predicate
  //   );//end of outer subscription 
  // }//end of loginChiraghUser





}
