import { ChiraghUser } from './../admin/adminsellerhome/ChiraghUserPOJO';
import { ForgotPasswordDTO } from './../forgot-password-form/forgotPasswordDTO';
import { ForgotPasswordRequestDTO } from './../forgot-password-request/forgotPasswordRequestDTO';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { User} from '../user/user.model';
import { registerDTO } from '../register/registerDTO';
import { TokenStorage } from '../core/token.storage';
import { ChangePasswordDTO } from './../changepassword/changepasswordDTO';
import { personalInfoDTO } from './../register/personalInfoDTO';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserService {

  constructor(private http: HttpClient,private token:TokenStorage) {}

  private userUrl = this.token.getServerpath()+'/api/user';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/getAll');
  }

  public getSessionUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/getSessionUser');
  }

  public login(userName:string,userPassword:string): Observable<any> {
      var obj={
                "userName":userName,
                "userPassword":userPassword
      };
      return this.http.post<any>(this.userUrl + '/login', obj,httpOptions);
  }

  public register(registerdto:registerDTO): Observable<any> {
    return this.http.post<any>(this.userUrl + '/registerUser', registerdto,httpOptions);
}

public confirmEmailRequest(email:string): Observable<any> {
  return this.http.post<any>(this.userUrl + '/confirmEmailRequest', email,httpOptions);
}

public confirmEmailByToken(token:string): Observable<any> {
  return this.http.post<any>(this.userUrl + '/confirmEmailByToken', token,httpOptions);
}

//forgot password service calls
public forgotPasswordServiceRequest(forgotPasswordRequestDTO:ForgotPasswordRequestDTO): Observable<any> {
  return this.http.post<any>(this.userUrl + '/resetPasswordRequest', forgotPasswordRequestDTO,httpOptions);
}

public resetPassword(forgotPasswordDTO:ForgotPasswordDTO): Observable<any> {
  return this.http.post<any>(this.userUrl + '/resetPassword', forgotPasswordDTO,httpOptions);
}

public getUserswithCompleteProperties(userName:string): Observable<ChiraghUser[]> {
  return this.http.get<ChiraghUser[]>(this.userUrl + '/getUserWithCompleteProperties/'+userName);
}


public getpersonalinfo(userName:string): Observable<any> {
  return this.http.get<any>(this.userUrl + '/getpersonalinfo/'+userName,httpOptions);
}

public changePassword(userName:string,changePasswordDTO:ChangePasswordDTO): Observable<any> {
  return this.http.put<any>(this.userUrl + '/changePassword/'+userName,changePasswordDTO,httpOptions);
}

public updatepersonalinfo(userName:string,personalinfoDTO:personalInfoDTO): Observable<any> {
  return this.http.put<any>(this.userUrl + '/updatePersonalInfo/'+userName,personalinfoDTO,httpOptions);
}
}
