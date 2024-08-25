import { APP_ID, Component, OnInit } from '@angular/core';
import { DevAPIService } from '../dev.service';
import { DatePipe } from '@angular/common';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, LoadingSpinnerComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private devAPIService: DevAPIService){}

  currentUserData : any;

  ngOnInit(): void {
    this.getCurrentUserData();
  }

  getCurrentUserData(){
    this.devAPIService.getCurrentUser().subscribe(
      (apiData) =>{
        this.currentUserData = apiData;
      }
    )
  }
}
