import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input() type: any;

  protected readonly localStorage = localStorage;
  items: any;
  currentRoutePath: string | undefined;
  isTenant: any = false;
  lastName: any;
  firstName: any;
  pin: any;
  email: any;
  phoneNumber: any;
  accountNumber: any;
  password: any;
  isOwner: any = false;
  driverLicense: any;
  passwordVisible: any = false;
  bank: any;
  banks: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.currentRoutePath  = window.location.pathname;

    if (this.currentRoutePath == '/about'){
      this.scrollToMain();
    }this.banks = [
          {
              id: 1,
              name: 'Хаан банк',
              iconSrc: 'assets/bnks/khanbank.png'
          },
          {
              id: 2,
              name: 'Голомт банк',
              iconSrc: 'assets/bnks/golomtbank.png'
          },
          {
              id: 3,
              name: 'Хас банк',
              iconSrc: 'assets/bnks/khasbank.png'
          },
          {
              id: 4,
              name: 'М банк',
              iconSrc: 'assets/bnks/mbank.png'
          },
          {
              id: 5,
              name: 'Төрийн банк',
              iconSrc: 'assets/bnks/statebank.png'
          },
          {
              id: 6,
              name: 'Богд банк',
              iconSrc: 'assets/bnks/bogd.png'
          },
      ]

  }

  // Scroll event listener
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.currentRoutePath  = window.location.pathname;
    const topbar = document.getElementById('topbar');
    if (topbar && this.currentRoutePath == '/about') {
      if ( !this.authService.isAuthenticated() && window.scrollY > 0) {
        topbar.style.background = "white";
        topbar.style.color = "var(--main-blue)";
        topbar.style.boxShadow = "0 0 10px -3px";
      } else {
        topbar.style.background = "transparent";
        topbar.style.color = "white";
        topbar.style.boxShadow = "none";
      }
    }

    const logo = document.getElementById('logo');
    if (logo) {
      logo.style.background = "transparent";
      logo.style.boxShadow = "none";
      logo.style.webkitBoxShadow = "none";
    }
  }

  scrollToAbout() {
    const element = document.getElementById('about');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2 - element.clientHeight / 2;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    this.topbarChange();
  }

  scrollToRent() {
    const element = document.getElementById('rent');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2 - element.clientHeight / 2;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    this.topbarChange();
  }

  scrollToRental() {
    const element = document.getElementById('rental');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2 - element.clientHeight / 2;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    this.topbarChange();
  }

  scrollToMain() {
    !this.authService.isAuthenticated() ? this.router.navigate(["/about"]) : '';

    const topbar = document.getElementById('topbar');
    if (topbar) {
      topbar.style.background = "transparent";
      topbar.style.color = "white";
      topbar.style.boxShadow = "none";
    }

    const element = document.getElementById('main');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2 - element.clientHeight / 2;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }

  visibleRegister: any = false;
  topbarChange() {
    const topbar: any = document.getElementById('topbar');
    topbar.style.background = "white";
    topbar.style.color = "var(--main-blue)";
    topbar.style.boxShadow = "0 0 10px -3px";

    const logo = document.getElementById('logo');
    if (logo) {
      logo.style.background = "transparent";
      logo.style.boxShadow = "none";
      logo.style.webkitBoxShadow = "none";
    }
  }

  logout(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Та системээс гарахдаа итгэлтэй байна уу?',
      header: 'Системээас гарах',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Тийм",
      rejectLabel:"Үгүй",
      accept: () => {

        this.authService.logout();
        this.messageService.add({ severity: 'info', summary: '', detail: 'Системээс гарлаа.' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Системээс гарах үйлдлийг цуцаллаа' });
      }
    });
  }

  refresh() {
    window.location.reload();
  }

  changeRole(role: string) {
    this.topbarChange();

    this.authService.setRole(role);
    if (role == 'owner') {
      if (localStorage.getItem('owner') == "true") {
        this.router.navigate(['/owner/dashboard']);
      }
      else {
        this.messageService.add({
          severity: 'info',
          summary: 'Түрээслүүлэгчийн эрхгүй байна',
          detail: "Түрээслүүлэгчийн эрхгүй байна та бүртгэлээ хийлгэнэ үү."
        });
        this.router.navigate(['/tenant/dashboard']);
      }
    }
    if (role == 'tenant') {
      if (localStorage.getItem('tenant') == "true") {
        this.router.navigate(['/tenant/dashboard']);
      }
      else{
        this.messageService.add({
          severity: 'info',
          summary: 'Түрээслэгчийн эрхгүй байна',
          detail: "Түрээслэгчийн эрхгүй байна та бүртгэлээ хийлгэнэ үү."
        });
        this.router.navigate(['/owner/dashboard']);
      }
    }
  }

  user() {
    let userId = localStorage.getItem('userId');

      this.http.get("http://127.0.0.1:8080/user/getByUserId?userId=" + userId).subscribe((result: any) => {
        let user = result.user;
        let roles = result.roles;
        roles.forEach((it: any) => {
          if(it.roleId == 1) this.isOwner = true;
          if(it.roleId == 2) this.isTenant = true;
        })
          this.lastName = user.lastName;
          this.firstName = user.firstName;
          this.pin = user.registerNumber;
          this.email = user.mailAddress;
          this.phoneNumber = user.phoneNumber;
          this.accountNumber = user.bankAccountNumber;
          this.password = user.password;
          this.driverLicense = user.driverLicenseNumber;
          this.bank = this.banks.find((it:any) => it.id == user.bankId);
          this.visibleRegister = true;

      });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onKeydown(event: KeyboardEvent, input: string): void {
    let inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    // Convert value to sentence case
    if(input == 'lastName') this.lastName = this.toSentenceCase(value);
    if(input == 'firstName') this.firstName = this.toSentenceCase(value);
    if(input == 'pin') this.pin = this.pin.toUpperCase();
  }

  private toSentenceCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  }
  registerSyntax(){
    const pattern = /^[А-Я]{2}\d{8}$/;

    if (!pattern.test(this.pin)) {
      return this.messageService.add({
        severity: "info",
        summary: "Регистер буруу байна",
        detail: "Регистрийн дугаараа шалгана уу."
      })
    }
    return true;
  }
  mailSyntax(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(this.email)) {
      return this.messageService.add({
        severity: "info",
        summary: "Цахим шуудан буруу байна",
        detail: "Цахим шуудан хаягаа буруу оруулсан эсэхээ шалгана уу."
      })
    }
    return true;
  }

  phoneSyntax() {
    if(this.phoneNumber.length != 8){
      return this.messageService.add({
        severity: "info",
        summary: "Утасны дугаар буруу байна",
        detail: "Холбоо барих утасны дугаар 8 оронтой байх ёстой."
      })
    }
    return true;
  }

    save() {
        if(this.isOwner == false && this.isTenant == false){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Түрээслүүлэгч эсвэл түрээслэгч талбараа сонгоно уу.'});
        }
        if(!this.lastName){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Хэрэглэгчийн овог талбараа бөглөнө үү.'});
        }
        if(!this.firstName){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Хэрэглэгчийн нэр талбараа бөглөнө үү.'});
        }
        if(!this.pin){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Регистерийн дугаар талбараа бөглөнө үү.'});
        }
        this.registerSyntax();
        if(!this.email){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Цахим шуудан хаяг талбараа бөглөнө үү.'});
        }
        this.mailSyntax();
        if(!this.phoneNumber){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Холбоо барих утасны дугаар талбараа бөглөнө үү.'});
        }
        if(!this.password){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Нууц үг талбараа бөглөнө үү.'});
        }
        if(this.isOwner && !this.bank){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Банкаа сонгоно уу.'});
        }
        if(this.isOwner && !this.accountNumber){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Дансны дугаар талбараа бөглөнө үү.'});
        }
        if(this.isOwner && !this.bank){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Банкаа сонгоно уу.'});
        }
        if(this.isTenant && !this.driverLicense){
            return this.messageService.add({
                severity: 'info',
                summary: 'Бүртгэл дутуу',
                detail: 'Жолооны үнэмлэхний дугаар талбараа бөглөнө үү.'});
        }
        let tenant = {
            "isOwner": this.isOwner,
            "isTenant": this.isTenant,
            "firstName":this.firstName,
            "lastName":this.lastName,
            "pin":this.pin,
            "phoneNumber": this.phoneNumber,
            "email":this.email,
            "password":this.password,
            "bankId": this.isOwner ? this.bank.id : '',
            "bankAccountNumber": this.isOwner ? this.accountNumber : '',
            "driverLicense": this.isTenant ? this.driverLicense : '',
            "userId": localStorage.getItem("userId")
        };
        this.http.post("http://127.0.0.1:8080/user/save", JSON.stringify(tenant), {
            headers: { 'Content-Type': 'application/json' }
        }).subscribe((result: any) => {
            this.messageService.add({severity:"info", summary: result.message, detail: ""})
            this.visibleRegister = false;
            if(this.isOwner) localStorage.setItem("owner", 'true');
            else {
                localStorage.setItem("owner", 'false');
                this.router.navigate(['/tenant/dashboard']);
            }
            if(this.isTenant) localStorage.setItem("tenant", 'true');
            else localStorage.setItem("tenant", 'false');
            this.router.navigate(['/owner/dashboard']);
        });
    }
}

