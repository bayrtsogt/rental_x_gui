import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrl: './tenant-dashboard.component.css'
})
export class TenantDashboardComponent implements OnInit{
  addVehicleVisible: any = false;
  vehicles: any;
  rangeDates: any;
  lowPrice: any;
  gearBox: any;
  highPrice: any;
  isChoiced: any = false;
  choicedVehicle: any;
  constructor(
              private http: HttpClient
              ) {
  }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get("http://127.0.0.1:8080/vehicle/getAllVehicles").subscribe(
      (result: any) => {
        this.vehicles = result;
      });

  }

  formatPrice(amount: number) {
    return amount.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }


  clear() {
    this.rangeDates = null;
    this.lowPrice = null;
    this.gearBox = null;
    this.highPrice = null;

  }

  more(id: any) {
    console.log("CAR ID ===== "+ id)
    this.http.get("http://127.0.0.1:8080/vehicle/getInfoByVehicleId?vehicleId=" + id).subscribe(
      (result: any) => {
        this.choicedVehicle = result;
        console.log(this.choicedVehicle);
        this.vehicles.filter( (it: any) => it.vehicle.id != id);

        this.isChoiced = true;
      });

  }
}
