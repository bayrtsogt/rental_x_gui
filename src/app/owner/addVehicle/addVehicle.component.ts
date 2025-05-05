// addVehicle.component.ts
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { concatMap } from 'rxjs/operators';
import {EncryptionService} from "../../auth/EncryptionService";
import {forkJoin} from "rxjs";

@Component({
    selector: 'app-addVehicle',
    templateUrl: './addVehicle.component.html',
    styleUrls: ['./addVehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
    @Output() donenew: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    platenumber: string = '';
    price: string = '';
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
    gearbox: any;
    gearboxes: any;
    formData: any;
    formDatas: any[] = [];
    frontImage: any;
    isDoneFront: any;
    isDoneRight: any;
    rightImage: any;
    leftImage: any;
    isDoneLeft: any;
    isDoneBack: any;
    backImage: any;

    constructor(
        private http: HttpClient,
        private encryptionService: EncryptionService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.gearboxes = [
            { id: 1, name: 'Автомат' },
            { id: 2, name: 'Механик' },
            { id: 3, name: 'Автомат-Механик хосолсон' }
        ];
    }

    // Function to check vehicle info
    check() {
        if (this.platenumber.length === 7) {
            const vehicleInfoRequest: any = {
                plateNo: this.platenumber
            };

            // Encrypt the request before sending it
            // const encryptedRequest = this.encryptionService.encrypt(vehicleInfoRequest);
            // const encryptedRequest = vehicleInfoRequest;

            this.http.get<any>('http://localhost:8080/rest/getVehicleInfoByPlateNumber', {
                headers: { 'Content-Type': 'application/json' },
                params: { plateNo: this.platenumber }
            }).subscribe((response: any) => {
                this.cabinNumber = response.cabinNumber;
                this.driveLicenseType = response.className;
                this.region = response.countryName;
                this.fuelType = response.fuelType;
                this.manCount = response.manCount;
                this.importDate = response.importDate;
                this.manufactorDate = response.buildYear;
                this.color = response.colorName;
                this.steeringwheel = response.wheelPosition;
                this.motor = response.capacity;
                this.markName = response.modelName;
                this.manufactor = response.markName;
                this.importYear = this.importDate ? this.importDate.substring(0, 4) : '';
            });
        } else {
            return this.messageService.add({ severity: 'warning', summary: 'Амжилтгүй', detail: 'Машины улсын дугаар буруу байна.' });
        }
    }

    // Function to create car and send encrypted data to backend
    createCar() {
        const vehicleData: any = {
            price: this.price.replace(/[^0-9]/g, ''),
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
            gearBox: this.gearbox.id,
            createdBy: localStorage.getItem('userId'),
            activeFlag: 1,
            status: 'active'
        };

        // Encrypt the vehicle data before sending it to the backend
        // const encryptedData = this.encryptionService.encrypt(vehicleData);
        const encryptedData = vehicleData;

        this.http.post<any>('http://localhost:8080/vehicle/createVehicle', vehicleData)
            .pipe(
                concatMap((response: any) => {
                    if (response.status === 200) {
                        // Decrypt the response
                        // const decryptedResponse: any = this.encryptionService.decrypt(response.encryptedData);
                        this.vehicleId = response.data.id;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Амжилттай',
                            detail: 'Тээврийн хэрэгслийн мэдээлэл амжилттай бүртгэгдлээ.'
                        });
                        return this.uploadPhotos();
                    } else {
                        this.messageService.add({
                            severity: 'warning',
                            summary: 'Амжилтгүй',
                            detail: 'Бүртгэл амжилтгүй боллоо.'
                        });
                        throw new Error('Vehicle creation failed');
                    }
                })
            )
            .subscribe(
                (uploadResponse) => {

                    console.log('All photos uploaded successfully');
                },
                (error) => {
                    console.error('Error occurred during vehicle creation or photo upload:', error);
                }
            );
    }

    // Function to upload photos
    uploadPhotos() {
        let photoRequests: any[] = [];
        for (let i = 0; i < this.formDatas.length; i++) {
            let indexData = this.formDatas[i];
            const formData = new FormData();
            formData.append('file', indexData.file);
            formData.append('side', indexData.side);
            formData.append('vehicleId', this.vehicleId.toString());
            formData.append('createdBy', localStorage.getItem('userId') || '');

            // Add each upload request to the array
            photoRequests.push(
                this.http.post<{ id: number }>('http://localhost:8080/vehicle/upload', formData)
            );
        }

        // Run all photo upload requests in parallel
        return forkJoin(photoRequests);
    }

    // Function to handle image upload completion
    uploadDone() {
        this.displayDialogue = false;
        this.formDatas.push(this.formData);
        if (this.formData.side === 'front') {
            this.isDoneFront = true;
            this.frontImage = URL.createObjectURL(this.formData.file);
        }

        if (this.formData.side === 'back') {
            this.isDoneBack = true;
            this.backImage = URL.createObjectURL(this.formData.file);
        }

        if (this.formData.side === 'left') {
            this.isDoneLeft = true;
            this.leftImage = URL.createObjectURL(this.formData.file);
        }

        if (this.formData.side === 'right') {
            this.isDoneRight = true;
            this.rightImage = URL.createObjectURL(this.formData.file);
        }
    }

    // Function to validate section 1
    section1Done() {
        if (!this.region) {
            return this.messageService.add({
                severity: "info",
                summary: "Машины мэдээлэл татагдаагүй байна.",
                detail: "Та улсын дугаараа оруулан ШАЛГАХ товчийн дарна уу."
            });
        }
        if (this.gearbox == null) {
            return this.messageService.add({
                severity: "info",
                summary: "Хурдны хайрцаг сонгогдоогүй байна.",
                detail: "Хурдны хайрцаг сонгоно уу."
            });
        }
        if (!this.price || parseFloat(this.price) == 0) {
            return this.messageService.add({
                severity: "info",
                summary: "Түрээслэх үнэ бүртгээгүй байна.",
                detail: "Түрээслэх үнийн дүн оруулна уу."
            });
        }
        this.section1done = true;
    }

    // Function to receive image data
    receiveData(data: any) {
        this.formData = data;
        this.uploadDone();
    }

  numberFormatter() {
    let cleanedNumber = this.price.replace(/[^0-9]/g, '');
    this.price = cleanedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  openDialog(side: string) {
    this.side = side;
    this.displayDialogue = true;
  }

  closeDialog() {
    this.displayDialogue = false;
  }


  done() {
    if (this.isDoneRight && this.isDoneFront && this.isDoneLeft && this.isDoneBack) {
      this.createCar();
      this.donenew.emit(true);
    } else {
      return this.messageService.add({
        severity: "info",
        summary: "Бүртгэл дутуу байна.",
        detail: "Та зургаа бүрэн оруулна уу."
      });
    }
  }
}
