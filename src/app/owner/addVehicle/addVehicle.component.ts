import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-addVehicle',
  templateUrl: './addVehicle.component.html',
  styleUrls: ['./addVehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  isTenant: boolean = true;
  phoneNumber: string = '';
  password: string = '';
  platenumber: string = '';

  cabinNumber: string = '';
  driveLicenseType: string = '';
  region: string = '';
  fuelType: string = '';
  manCount: string = '';
  importDate: string = '';
  manufactorDate: string = '';
  color: string = '';
  steeringwheel: string = '';
  motor: string = '';
  markName: string = '';
  manufactor: string = '';
  importYear: string = '';
  displayDialogue: boolean = false;
   photo: any;
  side: any;
  section1done: any = false;
  vehicleId: any;
  price: any;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private messageService: MessageService) {}

  ngOnInit() {}


  check() {
    if (this.platenumber.length === 7) {
      this.http.get(`http://127.0.0.1:8080/rest/getVehicleInfoByPlateNumber?plateNo=${this.platenumber}`, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe((result: any) => {
        console.log('Check RESULT ============== ', result);
        this.cabinNumber = result['cabinNumber'];
        this.driveLicenseType = result['className'];
        this.region = result['countryName'];
        this.fuelType = result['fuelType'];
        this.manCount = result['manCount'];
        this.importDate = result['importDate'];
        this.manufactorDate = result['buildYear'];
        this.color = result['colorName'];
        this.steeringwheel = result['wheelPosition'];
        this.motor = result['capacity'];
        this.markName = result['modelName'];
        this.manufactor = result['markName'];
        this.importYear = this.importDate ? this.importDate.substring(0, 4) : '';
      });
    } else {
      return this.messageService.add({ severity: 'warning', summary: 'Амжилтгүй', detail: 'Машины улсын дугаар буруу байна.' });
    }
  }

  async imgUpload(event: MouseEvent) {
    event.preventDefault();
    const fileInput = document.getElementById('file') as HTMLInputElement;
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', fileInput.files[0]);

    try {
      const response = await fetch('/photos/upload', {
        method: 'POST',
        body: formData
      });
      const message = await response.text();
      alert(message);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  openDialog(side: string) {
    this.side = side;
    this.displayDialogue = true;
  }

  closeDialog() {
    this.displayDialogue = false;
  }
  onFileSelected(event: any) {
    this.photo = event.target.files[0];
    if (this.photo) {
      // this.uploadForm.get('file')?.setValue(this.photo); // Set the file in the form
    }
  }

  createCar() {
    const vehicleData = {
      price: this.price,
      ownerId: localStorage.getItem('userId'),
      region: this.region,
      cabinNumber: this.cabinNumber,
      manufactor: this.manufactor,
      markName: this.markName,
      motor: this.motor,
      fuelType: this.fuelType,
      steeringwheel: this.steeringwheel,
      driveLicenseType: this.driveLicenseType,
      color: this.color,
      manCount: this.manCount,
      plateNumber: this.platenumber,
      buildYear: this.manufactorDate,
      importDate: this.importDate,
      wheelPosition: this.steeringwheel,
      createdDate: new Date(),
      createdBy: localStorage.getItem('userId'),
      activeFlag: 1,
      status: 'active'
    };


    this.http.post('http://localhost:8080/vehicle/createVehicle', vehicleData)
      .subscribe((response: any) => {
        if(response.status == 200){
          this.vehicleId = response.data.id;
          this.section1done = true;
          return this.messageService.add({ severity: 'success', summary: 'Амжилттай', detail: 'Тээврийн хэрэгслийн мэдээлэл амжилттай бүртгэгдлээ.'});

        }
        else {
          return this.messageService.add({ severity: 'warning', summary: 'Амжилтгүй', detail: 'Бүртгэл амжилтгүй боллоо.' });
        }
      }, error => {
      });
  }

  done() {

  }
}
