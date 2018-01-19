import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {RemoteService} from '../../../services/remote/remote.service'
import {LoginModel} from "../../../services/models/login.model";
import {Router} from "@angular/router";

@Component({
  selector: 'bull-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: FormGroup;
  public model: LoginModel;
  public loginFail:boolean;

  constructor(private router: Router, private fb: FormBuilder, private remoteService: RemoteService) {
    this.model = new LoginModel('', '')
  }

  ngOnInit() {
    this.login = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]]
    })
  }

  // SUBMIT LOGIN FORM
  submit(): void {
    this.model.username = this.login.value['username'];
    this.model.password = this.login.value['password'];

    this.remoteService.login(this.model)
      .subscribe(
        data => {

           this.successfulLogin(data);
        },
        err => {
          this.loginFail = true;
        }
      )
  }


  successfulLogin(data): void {
    this.remoteService.loggedIn();
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    this.loginFail = false;
    this.router.navigate(['/']);
    window.location.reload();
  }

}
