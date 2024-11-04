import {Component, OnInit} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {NgIf, ViewportScroller} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    Button,
    ButtonDirective,
    Ripple,
    NgIf,
    RouterLink
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit{
    constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    let route = this.route.snapshot.url.join('/');
    if(route == 'about'){
      this.scrollToMain();
      let hasScrolledDown = false;
      window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;


        // Check if scrolled down past 800 pixels
        if (scrollY > 800 && !hasScrolledDown) {
          hasScrolledDown = true;
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

        // Check if scrolled back up above 800 pixels
        if (scrollY <= 800 && hasScrolledDown) {
          hasScrolledDown = false;
          const topbar = document.getElementById('topbar');
          if(topbar){
            topbar.style.background = "transparent";
            topbar.style.color = "white";
            topbar.style.boxShadow = "none";
          }
          const logo = document.getElementById( 'logo');
          if(logo){
            // logo.style.background = "rgba(45,255,196,0.6)";
            // logo.style.boxShadow = "0px 0px 105px 45px rgba(45,255,196,0.9)";
            // logo.style.webkitBoxShadow = "0px 0px 105px 45px rgba(45,255,196,0.9)";
          }

        }
      });
    }

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
    if(topbar){
      topbar.style.background = "transparent";
      topbar.style.color = "white";
      topbar.style.boxShadow = "none";
    }
    const logo = document.getElementById( 'logo');
    if(logo){
      // logo.style.background = "rgba(45,255,196,0.6)";
      // logo.style.boxShadow = "0px 0px 105px 45px rgba(45,255,196,0.9)";
      // logo.style.webkitBoxShadow = "0px 0px 105px 45px rgba(45,255,196,0.9)";
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
}
