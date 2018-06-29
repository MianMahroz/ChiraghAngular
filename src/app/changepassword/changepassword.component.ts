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

  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
  terms=false;
  bar1=false;
  bar2=false;
  status:string;

  passwordFocus1(){
    this.bar1=true;
   }
   passwordFocus2(){
     this.bar1=false;
     this.bar2=true;
    }

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
                     if(data.msg=="Your Password Changed Successfully"){
                      this.myToast.Success('Status',data.msg);

                      this.router.navigate(['sellerDashboard']);

                     }

                     else if(data.msg=="Use different password from the previous!")
                     {
                      this.myToast.Error('Status',data.msg);
                     }

                     else if(data.msg=="Password not match!")
                     {
                      this.myToast.Error('Status',data.msg);
                     }

                     else if(data.msg=="User not found!")
                     {
                      this.myToast.Error('Status',data.msg);
                     }

                     
               }
             );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end 




}
