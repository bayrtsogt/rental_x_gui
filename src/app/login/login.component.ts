import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phoneNumber: any;
  password: any;
  displayRoles: any = false;
  passwordVisible: boolean = false;  // To control password visibility
  tenant: any = true;
  owner: any = true;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.displayRoles = this.authService.isAuthenticated();
  }

  login() {
    if(!this.phoneNumber || !this.password){
      return this.messageService.add({ severity: 'warning', summary: 'Амжилтгүй', detail: 'Нэвтрэх нэр, нууц үгээ зөв оруулна уу.' });
    }
    this.authService.login(this.phoneNumber, this.password).subscribe({
      next: (user) => {
        this.displayRoles = true;
        this.http.get('http://localhost:8080/userRoleRelation/getRolesByUserId?userId=' + localStorage.getItem('userId'))
          .subscribe((response: any) => {
            if (response.length == 2){
              localStorage.setItem('tenant', "true");
              localStorage.setItem('owner', "true");
              this.changeRole('owner');
            }
            else {
              if(response[0].roleId == 2){
                localStorage.setItem('tenant', "true");
                localStorage.setItem('owner', "false");
                this.changeRole('tenant');
              }
              else {
                localStorage.setItem('tenant', "false");
                localStorage.setItem('owner', "true");
                this.changeRole('owner');
              }
            }
          });
      },
      error: (error) => {
        console.log('Invalid username or password');

      }
    });
  }

  changeRole(role: string) {
    this.authService.setRole(role);
    if (role == 'owner') {
      if(localStorage.getItem('owner') == "true"){
        this.router.navigate(['/owner/dashboard']);
      }
      else console.log("Түрээслүүлэгчийн эрхгүй байна та бүртгэлээ хийлгэнэ үү.")
    }
    if (role == 'tenant') {
      if(localStorage.getItem('tenant') == "true"){
        this.router.navigate(['/owner/dashboard']);
      }
      else console.log("Түрээслэгчийн эрхгүй байна та бүртгэлээ хийлгэнэ үү.")
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
