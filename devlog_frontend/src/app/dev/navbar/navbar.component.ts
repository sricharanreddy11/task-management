import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isCollapsed: boolean = false;
  @Output() toggle = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor(private router: Router) {}
  

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed)
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  onLogout(){
    this.logout.emit()
  }
}
