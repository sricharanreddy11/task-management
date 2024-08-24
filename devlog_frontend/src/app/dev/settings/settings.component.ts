import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  darkMode = false;

  constructor (private cookieService: CookieService){}

  ngOnInit(): void {
    const savedMode = this.cookieService.get('darkMode');
    if (savedMode) {
      this.darkMode = JSON.parse(savedMode);
      this.updateBodyClass();
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.cookieService.set('darkMode', JSON.stringify(this.darkMode));
    this.updateBodyClass();
  }

  private updateBodyClass(): void {
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
