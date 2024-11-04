import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CardModule,
    HttpClientModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{

  protected readonly window = window;
  ngOnInit() {
  }

}
