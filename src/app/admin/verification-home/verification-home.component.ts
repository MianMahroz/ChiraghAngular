import { HttpClient } from '@angular/common/http';
import { PropertyService } from './../../shared/property.service';
import { TokenStorage } from './../../core/token.storage';
import { AuthService } from './../../core/auth.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './../../shared/user.service';
import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-verification-home',
  templateUrl: './verification-home.component.html',
  styleUrls: ['./verification-home.component.css']
})
export class VerificationHomeComponent implements OnInit {
  completePropertiesList:any;
  showsellerdetails=false;
  showsellerhome=false;
  propertyId:number;
  constructor(private route:ActivatedRoute ,private propertyService:PropertyService,private mytoastr:ToasterServiceService,private userService:UserService,private http: HttpClient,private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {

  }

  showSellerHome(){
    this.showsellerhome=true;
      }
  ngOnInit() {
    if(this.token.getAdminuserName()==null){
      console.log('Invalid Session');
      this.mytoastr.Error('','Invalid Session!')
      this.router.navigate(['/adminsignin']);
      return "Invalid Session";
    }//end of if
    this.showsellerhome=false;
    this.showsellerdetails=false;
    this.showsellerdetails=this.route.snapshot.params['action'];
    this.propertyId=this.route.snapshot.params['propertyId'];
  }//end of oninit


  getCompleteProperties(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);
        if(this.token.getToken()!=null){
            this.propertyService.getCompleteProperties(this.token.getAdminuserName()).subscribe(
                   data=>{
                            console.log('Output of service call');
                            console.log(data);
                   }//end of data of getCompleteProperties
            );//end of getProperties subscribe
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of loginChiraghUser

}//end of class
