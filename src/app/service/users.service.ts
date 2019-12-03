import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user';
import { AuthenticationService } from './authentication.service';
import { RoleModel } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  addUser(user: UserModel) {
      return this.http.post<UserModel>("http://localhost:8080/add-user", user, { 
          headers: this.auth.httpHeaders().headers });
  }
  getAllRoles() {
    return this.http.get<RoleModel[]>(`http://localhost:8080/roles`, { headers: this.auth.httpHeaders().headers });
  }
}
