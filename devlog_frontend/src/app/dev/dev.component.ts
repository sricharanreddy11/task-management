import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dev',
  standalone: true,
  imports: [],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css'
})
export class DevComponent implements OnInit {

  apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.httpClient.get(this.apiUrl + 'auth/users').subscribe(
      resData =>{
        console.log(resData)
      }
    );
  }

}
