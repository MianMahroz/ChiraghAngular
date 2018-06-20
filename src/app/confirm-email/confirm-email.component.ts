import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  sessionUser:string;
   constructor(private userService:UserService,private router: Router,  private authService: AuthService, private token: TokenStorage){}
  ngOnInit(){

  }
  resendEmail(){
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
                   this.sessionUser=this.token.getTempUser();
                  if(this.sessionUser!=null){
                      this.userService.confirmEmailRequest(this.sessionUser).subscribe(
                      data2=>{
                               console.log(data2);
                               if(data2.msg='Email Sent'){
                                   this.router.navigate(['/confirmEmail']);
                               }
                      }//end of email data
                    );//end of email subscription
                  }//end of sessionuser Null Check if
                  else{
                    console.log('session user was not found')
                  }
                   }//end of if
     }//end of outer data predicate
    );//end of outer subscription

  }//end of onRegister




}
