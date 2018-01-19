import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Form} from '@angular/forms/src/directives/form_interface'
import {RemoteService} from '../../../services/remote/remote.service'
import {RegisterModel} from "../../../services/models/register.model";
import {Router} from "@angular/router";
import {PasswordValidation} from './validatePassword'


@Component({
  selector: 'bull-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public register: FormGroup;
  public model: RegisterModel;
  public registerFail: boolean;
  public userN: any;
  public passW: any;
  public confirmP: any;

  constructor(private router: Router, private fb: FormBuilder, private remoteService: RemoteService) {
    this.model = new RegisterModel('', '', 'user', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')
  }

  ngOnInit() {
    // FORM GROUP REGISTER
    this.register = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      auth: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      }, {
        validator: PasswordValidation.MatchPassword
      })
    })
  }

  // SUBMIT REGISTER MODEL
  submit() {
    this.model.username = this.register.value['username'];
    this.model.password = this.register.value.auth['password'];

    //NOTIFICATIONS
    if(this.model.username === ''){
      this.userN = true;
      return
    }
    else if(this.model.password === ''){
      this.userN = false;
      this.passW = true;
      return
    }
    else if(this.register.value.auth['password'] !== this.register.value.auth['confirmPassword']){
      this.passW = false;
      this.confirmP = true;
      return
    }

    // POST REGISTER
    this.remoteService.register(this.model).subscribe(data => {
        this.successfulRegister();
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err.message);
        this.registerFail = true;
      })
  }



  successfulRegister(): void {
    this.registerFail = false;
    this.router.navigate(['/']);
  }
}
