import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.css']
})
export class TenantDashboardComponent implements OnInit {
  protected readonly Math = Math;
  addVehicleVisible: any = false;
  vehicles: any;
  rangeDates: any;
  lowPrice: any;
  gearBox: any;
  highPrice: any;
  isChoiced: any = false;
  choicedVehicle: any;
  visibleList: any = false;
  lists: any;
  manCount: any;
  gearboxes: any;
  dayCount: any;
  startDate: any;
  endDate: any;
  today: any;
  days: any = 0;
  hours: any = 0;
  checked: any;
  description: string | "" | undefined;
  amount: number | undefined;
  checkoutUrl: any | undefined;
  createdInvoice: any = false;
  visiblePay: any = false;
  orderId: any;

  constructor(
      private messageService: MessageService,
      private http: HttpClient,
      private sanitizer: DomSanitizer,
      private router: Router
  ) { }

  ngOnInit() {
    this.today = new Date();
    this.lowPrice = null;
    this.highPrice = null;
    this.gearBox = { id: null, name: 'Сонгох' };
    this.manCount = null;
    this.gearboxes = [
      { id: null, name: 'Сонгох' },
      { id: 1, name: 'Автомат' },
      { id: 2, name: 'Механик' },
      { id: 3, name: 'АТ/МТ хосолсон' },
    ];

    this.http.get("http://localhost:8080/order/getLastOrder?userId=" + localStorage.getItem('userId')).subscribe((result: any) => {
      if (result.status == 200) {
        this.isChoiced = true;
        this.choicedVehicle = result.data.vehicle;
        this.startDate = new Date(result.data.order.startDate);
        this.endDate = new Date(result.data.order.endDate);
        this.checkoutUrl = result.data.payment.checkoutUrl;
        this.createdInvoice = true;
        this.orderId = result.data.order.id;
      } else {
        this.getData();
      }
    }, error => {
      this.getData();}, () => {
      this.getData();
    });
  }

  getData() {
    this.http.get("http://127.0.0.1:8080/vehicle/getAllVehicles" +
        "?lowPrice=" + this.lowPrice +
        "&highPrice=" + this.highPrice +
        "&gearBoxId=" + (this.gearBox == null ? null : this.gearBox.id) +
        "&manCount=" + this.manCount +
        "&startedDate=" + (this.rangeDates == null ? null : this.rangeDates[0]) +
        "&endDate=" + (this.rangeDates == null ? null : this.rangeDates[1] == null ? null : this.rangeDates[1])
    ).subscribe((result: any) => {
      this.vehicles = result;
    });
  }

  formatPrice(amount: number): string {
    return Math.round(amount)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '');
  }


  clear() {
    this.rangeDates = null;
    this.lowPrice = null;
    this.gearBox = null;
    this.highPrice = null;
  }

  more(id: any) {
    this.http.get("http://127.0.0.1:8080/vehicle/getInfoByVehicleId?vehicleId=" + id).subscribe(
        (result: any) => {
          this.choicedVehicle = result;
          this.isChoiced = true;
        });
  }

  toModel(id: any) {
    this.http.get("http://127.0.0.1:8080/vehicle/getInfoByVehicleId?vehicleId=" + id).subscribe(
        (result: any) => {
          console.log(result);
          this.lists = result.photos;
          this.visibleList = true;
        });
  }

  datePicked() {
    if (!this.startDate || !this.endDate) {
      this.days = 0;
      this.hours = 0;
      return;
    }

    if (this.endDate <= this.startDate) {
      return this.messageService.add({ severity: 'info', summary: '', detail: 'Дуусах огноо эхлэх огнооноос өмнө байх боломжгүй.' });
    }

    const differenceInMillis = this.endDate.getTime() - this.startDate.getTime();
    this.days = differenceInMillis / (1000 * 60 * 60 * 24);
    this.hours = differenceInMillis / (1000 * 60 * 60);
    this.dayCount = Math.floor(this.days);
  }

  pay() {
    this.amount = this.choicedVehicle.vehicle.price * (
        this.startDate && this.endDate
            ? (Math.floor((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)) +
                (Math.floor(((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60)) % 24) / 24) + 1)
            : 1) * 101 / 100;

    this.http.get("http://localhost:8080/rest/createInvoice" +
        "?amount=" + this.formatPrice(this.amount) +
        "&userId=" + localStorage.getItem('userId') +
        "&vehicleId=" + this.choicedVehicle.vehicle.id +
        "&startDate=" + this.formattedDate(this.startDate) +
        "&endDate=" + this.formattedDate(this.endDate)
    ).subscribe((result: any) => {
      window.open(result.data, "_blank");
      this.createdInvoice = true;
    });
  }

  formattedDate = (date: Date): string => {
    const yyyy = date.getFullYear();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${dd}-${mm} ${hh}:${min}:${ss}`;
  };

  checkPay() {
    this.http.get("http://localhost:8080/rest/getInvoiceById?vehicleId=" + this.choicedVehicle.vehicle.id).subscribe(
        (result: any) => {
          if (result.status == 200) {
            this.messageService.add({
              severity: "success",
              summary: "Төлбөр амжилттай төлөгдлөө.",
              detail: "Амжилттай түрээсэллээ. Та мейл хаягаа шалгана уу."
            })
            this.router.navigate(['/tenant/dashboard']);
          } else {
            this.messageService.add({
              severity: "info",
              summary: "Төлбөр төлөгдөөгүй байна.",
              detail: result.message
            })
          }
        });
  }

  toPay() {
    window.open(this.checkoutUrl, "_blank");
  }

    cancelOrder() {
      this.http.get("http://localhost:8080/order/cancelOrder?orderId=" + this.orderId).subscribe(
          (result: any) => {
            this.messageService.add({
              severity: "success",
              summary: "Захиалга цуцлагдлаа.",
            })
          });

    }
}
