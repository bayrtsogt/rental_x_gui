import {Component, Input, OnInit} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {NgIf, ViewportScroller} from "@angular/common";
import {ActivatedRoute, Route, Router, RouterLink, Routes} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit{
  @Input() type: any;

  protected readonly localStorage = localStorage;
  items: any;
  isTenant: any= false;
  userMenu: any;
  showMenu: boolean = false;
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(){
  }
  scrollToAbout() {
    const element = document.getElementById('about'); // Ensure 'about' matches your section ID
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get the position of the element
      const offset = window.innerHeight / 2 - element.clientHeight / 2; // Calculate offset to center

      window.scrollTo({
        top: elementPosition - offset, // Scroll to the calculated position
        behavior: 'smooth' // Smooth scrolling
      });
    }
    this.topbarChange();
  }
  scrollToRent() {
    const element = document.getElementById('rent'); // Ensure 'about' matches your section ID
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get the position of the element
      const offset = window.innerHeight / 2 - element.clientHeight / 2; // Calculate offset to center

      window.scrollTo({
        top: elementPosition - offset, // Scroll to the calculated position
        behavior: 'smooth' // Smooth scrolling
      });
    }
    this.topbarChange();
  }
  scrollToRental() {
    const element = document.getElementById('rental'); // Ensure 'about' matches your section ID
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get the position of the element
      const offset = window.innerHeight / 2 - element.clientHeight / 2; // Calculate offset to center

      window.scrollTo({
        top: elementPosition - offset, // Scroll to the calculated position
        behavior: 'smooth' // Smooth scrolling
      });
    }
    this.topbarChange();
  }

  scrollToMain() {
    const topbar = document.getElementById('topbar');
    if(topbar) {
      topbar.style.background = "transparent";
      topbar.style.color = "white";
      topbar.style.boxShadow = "none";
    }

    const element = document.getElementById('main'); // Ensure 'about' matches your section ID
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get the position of the element
      const offset = window.innerHeight / 2 - element.clientHeight / 2; // Calculate offset to center
      window.scrollTo({
        top: elementPosition - offset, // Scroll to the calculated position
        behavior: 'smooth' // Smooth scrolling
      });
    }
  }

  topbarChange() {
    const topbar = document.getElementById('topbar');
    if (topbar) {
      topbar.style.background = "white";
      topbar.style.color = "var(--main-blue)";
      topbar.style.boxShadow = "0 0 10px -3px"
    }
    const logo = document.getElementById('logo');
    if (logo) {
      logo.style.background = "transparent";
      logo.style.boxShadow = "none";
      logo.style.webkitBoxShadow = "none";
    }
  }

  logout() {
    this.authService.logout();

  }

  refresh() {
    //reload
  }

  changeRole(role: string) {
    this.authService.setRole(role);
    if (role == 'owner') {
      if(localStorage.getItem('owner') == "true"){
        this.router.navigate(['/owner/dashboard']);
      }
      else console.log("Түрээслүүлэгчийн эрхгүй байна та бүртгэлээ хийлгэнэ үү.")
    }
    if (role == 'tenant') {
      if(localStorage.getItem('tenant') == "true"){
        this.router.navigate(['/owner/dashboard']);
      }
      else console.log("Түрээслэгчийн эрхгүй байна та бүртгэлээ хийлгэнэ үү.")
    }
  }

}
