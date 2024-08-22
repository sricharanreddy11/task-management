import { Component, inject, OnInit } from '@angular/core';
import { AuthenticatorService } from '../authenticator/authenticator.service';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dev',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, NgClass],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css'
})
export class DevComponent implements OnInit {

  constructor(
    private authService: AuthenticatorService,
    private router: Router
  ){}

  isSidebarToggled: boolean = false;

  ngOnInit(): void {
  }

  onToggleView() {
    this.isSidebarToggled = !this.isSidebarToggled;
  }

  onLogout(){
    this.authService.logout();
    location.reload();
  }

}
