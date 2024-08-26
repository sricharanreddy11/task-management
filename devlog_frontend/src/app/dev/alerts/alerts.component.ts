import { Component, OnInit } from '@angular/core';
import { DevAPIService } from '../dev.service';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent implements OnInit {
  tasks: any[] = [];

  constructor(private devAPIService: DevAPIService) {}

  ngOnInit(): void {
    this.devAPIService.getTaskAlerts().subscribe(data => {
      this.tasks = data.tasks;
    });
  }
}
