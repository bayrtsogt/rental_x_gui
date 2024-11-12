import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize currentUser with the value stored in localStorage (if any)
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  setRole(role: string){    // @ts-ignore
    localStorage.setItem('role', role);
  }

  login(username: string, password: string): Observable<any> {
    // Replace with your API endpoint
    return this.http.get("http://127.0.0.1:8080/user/login?username=" + username + "&password=" + password, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(result => {
        // @ts-ignore
        let user = result["data"]["user"];
        // Store user details and JWT token in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userName', JSON.stringify(user['firstName']));
        localStorage.setItem('userId', JSON.stringify(user['id']));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }


  logout(): void {
    // Remove user from localStorage and set currentUser to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('tenant');
    localStorage.removeItem('owner');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Get current user
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  changeRole(role: string) {
    localStorage.setItem('role', role);
  }
}
