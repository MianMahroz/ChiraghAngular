import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const TOKEN_Refresh_KEY = 'refresh_token';
const TOKEN_EXPIRES_IN = 'expires_in';


@Injectable()
export class TokenStorage {

  serverPath:string='http://localhost:8084/ChiraghServer';
  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_Refresh_KEY);
    window.sessionStorage.removeItem(TOKEN_EXPIRES_IN);
    window.sessionStorage.clear();
  }

  public saveToken(token: string,refreshToken:string,expiresIn:string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_Refresh_KEY);
    window.sessionStorage.removeItem(TOKEN_EXPIRES_IN);
    
    window.sessionStorage.setItem(TOKEN_KEY,  token);
    window.sessionStorage.setItem(TOKEN_Refresh_KEY,  refreshToken);
    window.sessionStorage.setItem(TOKEN_EXPIRES_IN,  expiresIn);
  }

    public saveUserName(userName:string){
      window.sessionStorage.setItem("userName",  userName);
    }
    public getuserName(): string {
      return sessionStorage.getItem("userName");
    }
    public savePropertyId(propertyId:string){
      window.sessionStorage.setItem("propertyId",  propertyId);
    }
    public getPropertyId(): number {
      return Number(sessionStorage.getItem('propertyId'));
    }
    public getPropertyIdString(): string {
      return sessionStorage.getItem('propertyId');
    }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string {
    return sessionStorage.getItem(TOKEN_Refresh_KEY);
  }
  
  public getExpiresIn(): number {
    return Number(sessionStorage.getItem(TOKEN_EXPIRES_IN)); 
  }

  public getServerpath():string{
    return this.serverPath;
  }
}
