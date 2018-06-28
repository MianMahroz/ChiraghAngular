import { Component, OnInit } from '@angular/core';
import { TokenStorage } from './../core/token.storage';
import { AuthService } from './../core/auth.service';
import { Router } from '@angular/router';
import { ToasterServiceService } from './../toaster-service.service';
import { UserService } from './../shared/user.service';
import { ChangePasswordDTO } from './changepasswordDTO';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private myToast:ToasterServiceService,private userService:UserService,private router: Router,  private authService: AuthService, private token: TokenStorage) { }
  
  changepasswordDTO=new ChangePasswordDTO();

  ngOnInit() {
  }


  ChangePassword(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
             this.userService.changePassword(this.token.getuserName(),this.changepasswordDTO).subscribe(
               data=>{
                     console.log(data);
                     
               }
             );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end 




}
