import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./components/home/home.component";
import {CategoryComponent} from "./components/category/category.component";
import {UploadComponent} from "./components/upload/upload.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AdminComponent} from "./components/admin/admin.component";
import {DetailsComponent} from "./components/details/details.component";

import {AuthGuard} from "./services/guards/auth.guard";
import {AdminGuard} from "./services/guards/admin.guard";
import {EditPostComponent} from "./components/edit-post/edit-post.component";
import {ErrorComponent} from "./components/error/error.component";



const routes: Routes = [
  {path: '', pathMatch: 'full',canActivate:[AuthGuard] , component:HomeComponent},
  {path: 'category/:id',canActivate:[AuthGuard], component: CategoryComponent},
  {path: 'details/:id',canActivate:[AuthGuard], component: DetailsComponent},
  {path: 'edit/:id',canActivate:[AuthGuard], component: EditPostComponent},
  {path: 'upload', canActivate:[AuthGuard], component: UploadComponent},
  {path: 'admin', canActivate:[AuthGuard, AdminGuard], component: AdminComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile',canActivate:[AuthGuard],  component: ProfileComponent},
  {path: '**',  component: ErrorComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
