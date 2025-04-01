import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticatorComponent } from "./authenticator/authenticator.component";
import { ThemeService } from './dev/settings/theme.service';
import { CommandSearchComponent } from "./dev/command-search/command-search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommandSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'devlog_frontend';
  themeService = inject(ThemeService)
}
