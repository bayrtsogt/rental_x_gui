import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const role = localStorage.getItem('role');

    // If no user is logged in or user doesn't have the required role
    if (!role || !route.data['roles'].includes(role)) {
      // Redirect to the login page or show an error page
      this.router.navigate(['/login']);
      return false;
    }

    // If the user has the required role
    return true;
  }
}
