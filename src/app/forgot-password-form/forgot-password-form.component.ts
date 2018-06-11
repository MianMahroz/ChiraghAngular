import { ForgotPasswordDTO } from './forgotPasswordDTO';
import { AuthService } from './../core/auth.service';
import { TokenStorage } from './../core/token.storage';
import { UserService } from './../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userService:UserService,private router: Router, private authService: AuthService, private token: TokenStorage) { }

  forgotPasswordDTO=new ForgotPasswordDTO();

  tokenconst:string;
  ngOnInit() {
      this.tokenconst=this.route.snapshot.params['token'];
 }

  resetPassword() {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          this.forgotPasswordDTO.token=this.tokenconst;
           this.userService.resetPassword(this.forgotPasswordDTO).subscribe(
              data=>{
                          console.log(data);
              }
           );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser

}
