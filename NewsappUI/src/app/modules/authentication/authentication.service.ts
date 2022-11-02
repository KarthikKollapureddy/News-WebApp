import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
export const TOKEN_NAME:string = "jwt_token";
import { User } from './user';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  updatepasswordEndPoint:string='http://localhost:8082/api/v1/userservice/changepassword';
  
  authServiceEndpoint:string = "http://localhost:8082/api/v1/userservice";

  constructor(private http: HttpClient) { 
    // this.updatepasswordEndPoint='http://localhost:8082/api/v1/userservice/changepassword'
    
  }

  registerUser(newUser) {
    const url = `${this.authServiceEndpoint}/register`;
    console.log(url);
    return this.http.post(url, newUser, {responseType: 'text'});
  }
  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  deleteToken() {
    return localStorage.removeItem(TOKEN_NAME);
  }
  setToken(token:string) {
    return localStorage.setItem(TOKEN_NAME, token);
  }
  loginUser(newUser) {
    const url = `${this.authServiceEndpoint}/login`;
    console.log(url);
    return this.http.post(url, newUser);
  }
  getTokenExpirationDate(token: string) {
    const decoded = jwt_decode(token);
    if(decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) {
      token = this.getToken();
    }
    if(!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if(date === undefined || date === null) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
  
  updatePassword(user:User,userid:any){
    // console.log(localStorage.getItem('userId'))
    console.log(localStorage.getItem('userId')+" in service updatepassword")
    console.log(user.oldpassword+" in service  updatepassword "+ user.newpassword)
    const url =this.updatepasswordEndPoint+'/'+localStorage.getItem('userId')
    
    console.log(url)
    return this.http.put(url,user)
  }
}

