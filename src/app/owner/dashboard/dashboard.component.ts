import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService, PrimeTemplate} from "primeng/api";
import {CardModule} from "primeng/card";
import {ChipsModule} from "primeng/chips";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TopbarComponent} from "../../layout/topbar/topbar.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  firstName: any;
  phoneNumber: any;
  password: any;
  addVehicleVisible: any = false;
  vehicles: any;
  constructor(
              private http: HttpClient,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
              ) {
  }
  ngOnInit() {
    this.http.get("http://127.0.0.1:8080/vehicle/getAllByUserId?userId=" + localStorage.getItem('userId')).subscribe(
      (result: any) => {
        this.vehicles = result;
    });
  }

  formatPrice(amount: number) {
    return amount.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  }

  seeCalendar() {
    this.messageService.add({ severity: 'success', summary: 'Амжилттай', detail: 'Message Content' });
  }

  deleteCar(event: any) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Тус тээврийн хэрэгслийг хасахдаа итгэлтэй байна уу?',
      header: 'Машин хасах',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Хасах",
      rejectLabel:"Цуцлах",

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Хасагдлаа', detail: 'Тээврийн хэрэгслийн амжилттай хаслаа' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Цуцаллаа.', detail: 'Тээврийн хэрэгслийг хасах үйлдлийг цуцаллаа' });
      }
    });
  }
}
