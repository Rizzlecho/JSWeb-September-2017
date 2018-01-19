import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {AuthComponent} from './components/auth/auth.component';

import {AuthService} from './services/auth/auth.service';
import {PokeSearchService} from './services/poke-search/poke-search.service';
import {FocusService} from './services/focus/focus.service';


import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { PokeTableComponent } from './components/poke-table/poke-table.component';
import { TableElementComponent } from './components/table-element/table-element.component';
import { FocusedComponent } from './components/focused/focused.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    PokeTableComponent,
    TableElementComponent,
    FocusedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    PokeSearchService,
    FocusService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
