import { ForgotPasswordRequestDTO } from './forgotPasswordRequestDTO';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from './../core/token.storage';
import { AuthService } from './../core/auth.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-forgot-password-request',
  templateUrl: './forgot-password-request.component.html',
  styleUrls: ['./forgot-password-request.component.css']
})
export class ForgotPasswordRequestComponent implements OnInit {


  forgotPasswordRequestDTO=new ForgotPasswordRequestDTO();
  constructor(private userService:UserService,private http: HttpClient,private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {

}

  ngOnInit() {
  }


  forgotPasswordRequest() {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          console.log(this.forgotPasswordRequestDTO);
          this.userService.forgotPasswordServiceRequest(this.forgotPasswordRequestDTO).subscribe(
            data=>{
                       console.log(data);
            }
           );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser
}
