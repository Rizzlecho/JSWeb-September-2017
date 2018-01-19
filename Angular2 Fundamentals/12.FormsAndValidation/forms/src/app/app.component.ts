import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Form} from '@angular/forms/src/directives/form_interface'

import {DuplicateCheck} from "./validateName";

const mailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  register: FormGroup;

  constructor(private fb: FormBuilder, private val: DuplicateCheck) {
  }

  ngOnInit() {
    this.register = this.fb.group({
      mail: ['', [Validators.required, Validators.pattern(new RegExp(mailRegx)), this.checkMail.bind(this)]],
      name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
      auth: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }),
      address: ['', [Validators.required]],
      city: ['', []],
      country: ['', []],
      zip: ['', []],
    })
  }

  checkMail(v) {
    return this.val.validateMail(v.value) ? {duplicate: true} : null;
  }

  submit(e) {
    console.log(e);
  }
}
