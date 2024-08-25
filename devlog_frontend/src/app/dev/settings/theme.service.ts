import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;

  constructor(private cookieService: CookieService) {
    const savedMode = this.cookieService.get('darkMode');
    this.darkMode = savedMode ? JSON.parse(savedMode) : false;
    this.updateBodyClass();
  }

  get isDarkMode(): boolean {
    return this.darkMode;
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
