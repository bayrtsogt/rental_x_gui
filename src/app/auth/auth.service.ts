import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import {EncryptionService} from "./EncryptionService";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
      private http: HttpClient,
      private router: Router,
      private messageService: MessageService,
      private encryptionService: EncryptionService // Inject EncryptionService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  login(username: string, password: string): Observable<any> {
    // Encrypt the username and password before sending them to the backend
    // const encryptedUsername = this.encryptionService.encrypt(username);
    // const encryptedPassword = this.encryptionService.encrypt(password);

    return this.http.get(`http://127.0.0.1:8080/user/login?username=${username}&password=${password}`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map((result: any) => {
        if (result.status === 200) {
          const user = result.data.user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('userName', `${user.lastName.charAt(0)}.${user.firstName}`);
          localStorage.setItem('userId', user.id);

          this.currentUserSubject.next(user);

          const roles = result.data.roles;
          const isTenant = roles.some((role: any) => role.roleId === 2);
          const isOwner = roles.some((role: any) => role.roleId === 1);

          localStorage.setItem('tenant', isTenant.toString());
          localStorage.setItem('owner', isOwner.toString());
          this.changeRole(isOwner ? 'owner' : 'tenant');

          return user;
        } else {
          this.messageService.add({
            severity: "info",
            summary: "Login Failed",
            detail: result.message
          });
          return null;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('tenant');
    localStorage.removeItem('owner');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  changeRole(role: string) {
    this.setRole(role);
    if (role == 'owner') {
      if (localStorage.getItem('owner') == "true") {
        this.router.navigate(['/owner/dashboard']);
      } else {
        console.log("Түрээслүүлэгчийн эрхгүй байна та бүртгэлээ хийлгэнэ үү.")
      }
    }
    if (role == 'tenant') {
      if (localStorage.getItem('tenant') == "true") {
        this.router.navigate(['/tenant/dashboard']);
      } else {
        console.log("Түрээслэгчийн эрхгүй байна та бүртгэлээ хийлгэнэ үү.")
      }
    }
  }
}
