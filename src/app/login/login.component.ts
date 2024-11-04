import {Component, OnInit} from '@angular/core';
import {PrimeTemplate} from "primeng/api";
import {CardModule} from "primeng/card";
import {ChipsModule} from "primeng/chips";
import {ActivatedRoute} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PrimeTemplate,
    CardModule,
    ChipsModule,
    ButtonDirective,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
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

  login(){
    this.http.get("http://127.0.0.1:8080/user/login?username=" + this.phoneNumber + "&password=" + this.password, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(result => {
      console.log("Login RESULT ============== ", result);
    });

  }
}
