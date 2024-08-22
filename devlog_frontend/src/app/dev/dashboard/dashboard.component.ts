import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;

  ngOnInit() {
    // Load task data from the backend
    this.loadTaskData();
  }

  loadTaskData() {
    // Placeholder: Implement service call to get task statistics
    this.totalTasks = 10;
    this.completedTasks = 4;
    this.pendingTasks = 6;
  }
}
