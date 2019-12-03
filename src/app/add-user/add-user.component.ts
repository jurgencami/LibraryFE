import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { AuthenticationService, User } from '../service/authentication.service';
import { UserModel } from '../models/user';
import { HttpClientService } from '../service/http-client.service';
import { RoleModel } from '../models/role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: UserModel = new UserModel;
  roles: RoleModel[];
  constructor(private UsersService: UsersService, private loginservice: AuthenticationService) { }

  ngOnInit() {
    this.getAllRoles();
  }

  addUser(): void {
    this.UsersService.addUser(this.user)
    .subscribe( (data) => {
      alert("User created successfully.");
      this.user = new UserModel;
    },
    (error) => {
      alert(error.error.message)}
    );
  }

  onSelectionChange(role: RoleModel) {
    this.user.role = role;
  }

  getAllRoles() {
      this.UsersService.getAllRoles().subscribe(result => {
        this.roles = result;
      });
  }
}
