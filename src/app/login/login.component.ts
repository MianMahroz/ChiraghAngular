import { ToasterServiceService } from './../toaster-service.service';
import { ErrorDialogComponent } from './../core/error-dialog.component';


import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {TokenStorage} from '../core/token.storage';
import {Observable} from 'rxjs/Observable';
import {User} from '../user/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from '../shared/user.service';
import { loginDTO } from './loginDTO';


//Import ToastsManager

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private mytoastr:ToasterServiceService,private userService:UserService,private http: HttpClient,private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {

  }

  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strengthLabels = ['weak', 'medium', 'strong', 'very strong', 'excellent'];

  // userName: string;
  // userPassword: string;
   logindto=new loginDTO();

  loginChiraghUser(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);

        if(this.token.getToken()!=null){
          this.userService.login(this.logindto.userName,this.logindto.userPassword).subscribe(
            data1=>{
              console.log(data1);
              this.mytoastr.Error('Login',data1.msg);
                   if(data1.msg=="Login Successfully"){
                    // this.mytoastr.Success('Login',data1.msg);
                     this.token.saveUserName(this.logindto.userName);
                       this.router.navigate(['home']);
                   }//end of if
                }//end of inner data predicate
          );//end of inner subscription
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of loginChiraghUser




}
