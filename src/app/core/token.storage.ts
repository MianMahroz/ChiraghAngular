import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const TOKEN_Refresh_KEY = 'refresh_token';
const TOKEN_EXPIRES_IN = 'expires_in';


@Injectable()
export class TokenStorage {

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

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string {
    return sessionStorage.getItem(TOKEN_Refresh_KEY);
  }
  
  public getExpiresIn(): number {
    return Number(sessionStorage.getItem(TOKEN_EXPIRES_IN)); 
  }

}
