import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  username = ''
  password = ''
  invalidLogin = false
  
  constructor(private router: Router,
    private loginservice: AuthenticationService, private formBuilder: FormBuilder) {   }

    

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]});
  }
  get f() { return this.loginForm.controls; }
  
  checkLogin() {
    this.submitted = true;
        if (this.loginForm.invalid) {
          return;
      }
    (this.loginservice.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      data => {
        this.router.navigate([''])
        this.invalidLogin = false
      },
      error => {
        alert(error.messsage)
      }
    )
    );

  }

}
