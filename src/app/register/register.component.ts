import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeTemplate} from "primeng/api";
import {CardModule} from "primeng/card";
import {ChipsModule} from "primeng/chips";
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  isTenant: any = false;
  lastName: any;
  firstName: any;
  pin: any;
  email: any;
  phoneNumber: any;
  accountNumber: any;
  password: any;
  passwordDuplicate: any;
  tenants: any;
  isOwner: any = false;
  driverLicense: any;
  passwordVisible: any = false;
  constructor(
              private http: HttpClient,
              private router: Router,
              private messageService: MessageService
              ) {
  }
  ngOnInit() {
    this.isTenant = false;
    this.isOwner = false;
  }

  register() {
    let tenant = {
      "isOwner": this.isOwner,
      "isTenant": this.isTenant,
      "firstName":this.firstName,
      "lastName":this.lastName,
      "pin":this.pin,
      "phoneNumber": this.phoneNumber,
      "email":this.email,
      "password":this.password,
      "bankAccountNumber": this.accountNumber,
      "driverLicense": this.driverLicense
    };
    this.http.post("http://127.0.0.1:8080/user/createTenant", JSON.stringify(tenant), {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(result => {
      console.log("result", result);
      this.router.navigate(['/login']);
    });
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
