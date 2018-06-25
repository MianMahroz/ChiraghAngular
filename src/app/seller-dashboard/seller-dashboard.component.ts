import { OwnerDetails } from './../SellerForm/owner-details/ownerdetails.model';
import { PropertyService } from './../shared/property.service';
import { TokenStorage } from './../core/token.storage';
import { AuthService } from './../core/auth.service';
import { Router } from '@angular/router';
import { ToasterServiceService } from './../toaster-service.service';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  constructor(private propertyService:PropertyService,private myToast:ToasterServiceService,private userService:UserService,private router: Router,  private authService: AuthService, private token: TokenStorage) { }

  userData:any;
  ownerDto=new OwnerDetails();
  ngOnInit() {
  this.getUserDashboardData();
  }

  getOwnerDetails(data:any):void{
   console.log('Clicked!!');
   if(data.ownerType=='owner'){
      this.ownerDto=data;
   }
  }
  getPOADetails(data:any):void{
    console.log(' POA Clicked!!');
    if(data.ownerType=='poa'){
       this.ownerDto=data;
    }
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

  }//end of loginChiraghUser

}
