import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {TokenStorage} from '../core/token.storage';
import {Observable} from 'rxjs/Observable';
import {User} from '../user/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from '../shared/user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService:UserService,private http: HttpClient,private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {
  }

  userName: string;
  userPassword: string;

  loginChiraghUser(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          this.userService.login(this.userName,this.userPassword).subscribe(
            data=>{
                  console.log(data);
                  this.router.navigate(['user']);
                }//end of inner data predicate
          );//end of inner subscription 
        }//end of if
        
     }//end of outer data predicate
    );//end of outer subscription
    
  }//end of loginChiraghUser
  
  


}
