import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeadersComponent } from './components/headers/headers.component';
import { ArticleComponent } from './components/article/article.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
