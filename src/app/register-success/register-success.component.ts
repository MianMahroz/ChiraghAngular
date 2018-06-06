import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpClient } from 'selenium-webdriver/http';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {

  
  constructor(private route:ActivatedRoute,private userService:UserService,private router: Router, private authService: AuthService, private token: TokenStorage) { }

  tokenconst:string;
  ngOnInit() {
      this.tokenconst=this.route.snapshot.params['token'];
      this.confirmEmailByToken();
  }
  confirmEmailByToken() {
    
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          this.userService.confirmEmailByToken(this.tokenconst).subscribe(
            data1=>{
              console.log(data1);
                   if(data1.msg=="Verified"){
                       console.log('User Verified');
                   }//end of if
                   else{
                    // this.router.navigate(['home']);
                   }
                }//end of inner data predicate
                
          );//end of inner subscription
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser
  
}
