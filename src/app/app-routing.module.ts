import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AddVehicleComponent} from "./owner/addVehicle/addVehicle.component";
import {DashboardComponent} from "./owner/dashboard/dashboard.component";
import {RoleGuard} from "./auth/role.guard";
import {AuthGuard} from "./auth/auth.guard";
import {TenantDashboardComponent} from "./tenant/dashboard/tenant-dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: 'owner/dashboard', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'owner',
    children: [
      // { path: 'dashboard', component: DashboardComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { roles: ['owner'] }},
    ], canActivate: [AuthGuard]
  },
  {
    path: 'tenant',
    children: [
      { path: 'dashboard', component: TenantDashboardComponent, canActivate: [RoleGuard], data: { roles: ['tenant'] }},
    ], canActivate: [AuthGuard]
  },
  // { path: '**', component: NotFoundComponent }  // Uncomment this for handling 404s
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
