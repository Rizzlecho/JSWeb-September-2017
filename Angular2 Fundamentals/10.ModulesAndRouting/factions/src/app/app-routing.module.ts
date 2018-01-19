import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from "./main/submodules/home/home.component";
import {BlueComponent} from "./main/submodules/blue/blue.component";
import {GreenComponent} from "./main/submodules/green/green.component";
import {OrangeComponent} from "./main/submodules/orange/orange.component";
import {RedComponent} from "./main/submodules/red/red.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'blue', component: BlueComponent},
  {path: 'green', component: GreenComponent},
  {path: 'orange', component: OrangeComponent},
  {path: 'red', component: RedComponent}
  // {path: 'error',  component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
