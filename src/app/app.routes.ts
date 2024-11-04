import { Routes } from '@angular/router';
import { AboutComponent } from "./about/about.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  { path: "", redirectTo: "about", pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent }
];
