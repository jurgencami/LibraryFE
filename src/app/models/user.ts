import { RoleModel } from './role';

export class UserModel {
    public id: number;
    public username: string;
    public password: string;
    public role: RoleModel; 
  }