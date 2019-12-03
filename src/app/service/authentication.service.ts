import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user';

export class User{
  constructor(
    public status:string,
     ) {}  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public httpHeaders() {
    const currentAuthorization = sessionStorage.getItem('token');
    if (currentAuthorization) {
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: currentAuthorization,
          })
      };
      return httpOptions;
    }
    return null;
  }

  constructor(private httpClient:HttpClient) { }

  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/login',{username, password}).pipe(
     map(
       userData => {
        let userid= userData.user_id;
        sessionStorage.setItem('userid', userid);
        let tokenStr= 'Bearer '+ userData.token;
        sessionStorage.setItem('token', tokenStr);
        let role = userData.role;
        sessionStorage.setItem('role', role);
        return userData;
       }
     )
    )
  }

  isUserLoggedIn() {
    let role = sessionStorage.getItem('role')
    return (role == 'USER')
  }
  isAdminLoggedIn() {
    let role = sessionStorage.getItem('role')
    return (role == 'ADMIN')
  }

  logOut() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userid')
    sessionStorage.removeItem('role')
  }
}
