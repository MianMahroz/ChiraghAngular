import { Component, OnInit } from '@angular/core';
import { registerDTO} from './registerDTO';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';
import {TokenStorage} from '../core/token.storage';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(private userService:UserService,private router: Router,  private authService: AuthService, private token: TokenStorage) { }
  registerdto=new registerDTO();

  
  onRegister(){
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          this.userService.register(this.registerdto).subscribe(
            data1=>{
              console.log(data1);
                   if(data1.msg=="User Created Successfully"){
                      this.router.navigate(['confirmemail']);
                   }//end of if
                }//end of inner data predicate
          );//end of inner subscription 
        }//end of if
        
     }//end of outer data predicate
    );//end of outer subscription

  }//end of onRegister




}
