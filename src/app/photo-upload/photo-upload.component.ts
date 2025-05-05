import {Component, EventEmitter, Input, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css'],
})
export class PhotoUploadComponent {
  @Input() side: any;
  @Input() vehicleId: any;
    @Output() sideFormData: EventEmitter<Object> = new EventEmitter<Object>();
    photo: File | null = null;
  responseMessage: string = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  onFileSelected(event: any) {
    this.photo = event.target.files ? event.target.files[0] : null;
  }
  onSubmit() {
    if (!this.photo) {
      this.messageService.add({
        severity: "info",
          summary: "Зураг оруулахад алдаа гарлаа",
          detail: "Зураг сонгоно уу."
      })
      return;
    }

    let formData = {
      "file": this.photo,
        "side": this.side,
        "vehicleId": this.vehicleId,
        "createdBy": localStorage.getItem('userId') || ''
    };
    this.sendData(formData);
  }

  sendData(data: any) {
    this.sideFormData.emit(data);
  }
}
