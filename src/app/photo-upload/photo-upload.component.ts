import { Component, Input } from '@angular/core';
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
  photo: File | null = null;
  responseMessage: string = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // Handle file selection
  onFileSelected(event: any) {
    this.photo = event.target.files ? event.target.files[0] : null;
    this.responseMessage = '';  // Reset the response message when a new file is selected
  }

  // Handle form submission
  onSubmit() {
    if (!this.photo) {
      this.responseMessage = 'Зураг оруулна уу';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.photo);
    formData.append('side', this.side);
    formData.append('vehicleId', this.vehicleId);
    formData.append('createdBy', localStorage.getItem('userId') || '');

    // Make the HTTP request to upload the photo
    this.http.post<{ id: number }>('http://localhost:8080/vehicle/upload', formData)
      .subscribe(
        (response) => {
          this.responseMessage = `Photo uploaded successfully with ID: ${response.id}`;
          console.log(response);
        },
        (error) => {
          this.responseMessage = 'Could not upload photo';
          console.error(error);
        }
      );
  }
}
