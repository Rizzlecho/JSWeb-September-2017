import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";

import {DuplicateCheck} from "./validateName";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DuplicateCheck],
  bootstrap: [AppComponent]
})
export class AppModule { }
