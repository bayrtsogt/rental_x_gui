import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import {EncryptionService} from "../../auth/EncryptionService";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstName: any;
  phoneNumber: any;
  password: any;
  addVehicleVisible: any = false;
  vehicles: any;
  orders: any;
  viewCalendar: any = false;

  constructor(
      private http: HttpClient,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private encryptionService: EncryptionService // Inject EncryptionService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // const encryptedUserId = this.encryptionService.encrypt(userId); // Encrypt user ID
      const encryptedUserId = userId; // Encrypt user ID
      this.http.get(`http://127.0.0.1:8080/vehicle/getAllByUserId?userId=${encryptedUserId}`).subscribe(
          (result: any) => {
            this.vehicles = result;
            this.vehicles.sort((a: any, b: any) => b.vehicle.activeFlag - a.vehicle.activeFlag);
          }
      );
    }
  }

  formatPrice(amount: number) {
    return amount.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  deleteCar(id: any) {
    this.confirmationService.confirm({
      message: 'Тус тээврийн хэрэгслийг хасахдаа итгэлтэй байна уу?',
      header: 'Машин хасах',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Хасах",
      rejectLabel: "Цуцлах",

      accept: () => {
        // const encryptedId = this.encryptionService.encrypt(id); // Encrypt vehicle ID
        const encryptedId = id; // Encrypt vehicle ID
        this.http.get(`http://127.0.0.1:8080/vehicle/removeCar?vehicleId=${encryptedId}`).subscribe(
            (result: any) => {
              this.messageService.add({ severity: 'info', summary: 'Хасагдлаа', detail: 'Тээврийн хэрэгслийн амжилттай хаслаа' });
              this.getData();
            }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Цуцаллаа.', detail: 'Тээврийн хэрэгслийг хасах үйлдлийг цуцаллаа' });
      }
    });
  }

  done($event: any) {
    this.addVehicleVisible = false;
    this.getData();
  }

  addActive(id: any) {
    this.confirmationService.confirm({
      message: 'Тус тээврийн хэрэгслийг үйлчилгээнд нэмэхдээ итгэлтэй байна уу?',
      header: 'Машин үйлчилгээнд нэмэх',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Нэмэх",
      rejectLabel: "Цуцлах",

      accept: () => {
        // const encryptedId = this.encryptionService.encrypt(id); // Encrypt vehicle ID
        const encryptedId = id; // Encrypt vehicle ID
        this.http.get(`http://127.0.0.1:8080/vehicle/addVehicle?vehicleId=${encryptedId}`).subscribe(
            (result: any) => {
              this.messageService.add({ severity: 'info', summary: 'Үйлчилгээнд нэмлээ', detail: 'Тээврийн хэрэгслийн амжилттай үйлчилгээнд нэмлээ.' });
              this.getData();
            }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Цуцаллаа.', detail: 'Тээврийн хэрэгслийг нэмэх үйлдлийг цуцаллаа' });
      }
    });
  }

  seeCalendar(id: any) {
    this.http.get(`http://127.0.0.1:8080/order/getOrderByVehicle?vehicleId=${id}`).subscribe(
        (result: any) => {
          result.forEach((item: any) => {
            const order = {
              startDate: item.startDate,
              endDate: item.endDate,
            };

            if (!this.orders) {
              this.orders = new Set();
            }

            this.orders.add(order);
          });

          console.log(result);
          console.log(Array.from(this.orders));

        }
    );
    this.viewCalendar = true;
  }

}
