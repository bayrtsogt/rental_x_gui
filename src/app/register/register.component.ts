import {Component, OnInit} from '@angular/core';
import {PrimeTemplate} from "primeng/api";
import {CardModule} from "primeng/card";
import {ChipsModule} from "primeng/chips";
import {ActivatedRoute} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    PrimeTemplate,
    CardModule,
    ChipsModule,
    ButtonDirective,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  isTenant: any;
  lastName: any;
  firstName: any;
  pin: any;
  email: any;
  phoneNumber: any;
  accountNumber: any;
  password: any;
  passwordDuplicate: any;
  tenants: any;
  constructor(
              private http: HttpClient,
              ) {
  }
  ngOnInit() {
    this.isTenant = true;
  }

  register() {
    let tenant = {
      "firstName":this.firstName,
      "lastName":this.lastName,
      "pin":this.pin,
      "phoneNumber": this.phoneNumber,
      "email":this.email,
      "password":this.password,
      "bankAccountNumber": this.accountNumber
    };
    this.http.post("http://127.0.0.1:8080/tenant/createTenant", JSON.stringify(tenant), {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(result => {
      console.log("result", result);
    });
  }
}
