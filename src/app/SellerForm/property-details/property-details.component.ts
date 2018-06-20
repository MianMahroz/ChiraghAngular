import { ToasterServiceService } from './../../toaster-service.service';
import { SellerService } from './../../shared/seller.service';
import { Component, OnInit } from '@angular/core';
import { PropertyDetailsDto } from './propertymodel';
import { PropertyService } from '../../shared/property.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TokenStorage } from '../../core/token.storage';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  propertyDetailsDto=new PropertyDetailsDto();
  action:string;
  selectedScannedTitleDeed: FileList;
  scannedTitleDeedFile:File;

  constructor(private myToast:ToasterServiceService,private sellerService:SellerService,private route:ActivatedRoute,private propertyService:PropertyService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }

  ngOnInit() {
    //for testing purpose
    // this.token.saveUserName('BesterCapital2');
    // this.token.savePropertyId('111');

    this.action='';
    this.action=this.route.snapshot.params['action'];
    console.log(this.action);
    if(this.action=='back'||this.action=='next'){
        console.log('Inside Action');
          this.getEnteredProperty();
      }//end of back if
  }

  selectScannedTitleDeed(event) {
    this.selectedScannedTitleDeed = event.target.files;
    this.scannedTitleDeedFile=this.selectedScannedTitleDeed.item(0);
    event.srcElement.value = null;
  }

  addPropertyDetails(): string {
    if(this.token.getuserName()==null){
      console.log('Invalid Session');
      this.myToast.Error('User Status','Invalid Session');
      return "Invalid Session";
    }
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
            this.propertyDetailsDto.propertyId=this.token.getPropertyId();
            this.propertyDetailsDto.userName=this.token.getuserName();
            this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/','S-titleDeedCopy'+this.token.getPropertyId(),this.token.getuserName(),this.scannedTitleDeedFile).subscribe(
             fileNameData=>{
               console.log(fileNameData);

               if(fileNameData.type==3){
                    this.propertyDetailsDto.scannedTitleDeed=fileNameData.partialText;
                    this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
                    propertydata=>{
                        console.log(propertydata);
                        this.router.navigate(['/propertyFinancialDetails']);
                    }//end of propertydata
                  );//end of propertySubscription
               }//end of type check
               else if(fileNameData=='Data'){
                this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
                  propertydata=>{
                      console.log(propertydata);
                      this.myToast.Info('Status','Property Details Added Successfully');
                      this.router.navigate(['/propertyFinancialDetails/next']);
                  }//end of propertydata
                );//end of propertySubscription
               }//end of else if
             }//end of fileNameData
            );//end of title Deed Upload File
            }//end of if of token
     }//end of outer data predicate
    );//end of outer subscription
    return "";
  }//end of loginChiraghUser


  getEnteredProperty(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);
        if(this.token.getToken()!=null){
          this.propertyService.getPropertyById(this.token.getPropertyId(),this.token.getuserName()).subscribe(
            propertyDetailsData=>{
                if(propertyDetailsData.plotNo!=null){
                    console.log(propertyDetailsData);
                    this.propertyDetailsDto=propertyDetailsData;
                    this.myToast.Info('Status','Property data loaded Successfully');
                }//end of if of propertyDetailsData
             }//end of ownerData
         );//end of subscription of getOwners

        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser



}
