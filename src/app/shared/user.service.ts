import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../user/user.model';
import { registerDTO } from '../register/registerDTO';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  private userUrl = 'http://localhost:8084/api/user';

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





}