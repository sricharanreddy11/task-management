import { Component, OnInit } from '@angular/core';
import { DevAPIService } from '../dev.service';
import { TaskCountData, TaskGraphData } from './dashboard.model';
import Chart from 'chart.js/auto'
import { KeyValuePipe, NgFor } from '@angular/common';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { TaskService } from '../tasks/tasks.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, KeyValuePipe, LoadingSpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor (private taskService: TaskService,
    private devAPIService: DevAPIService
  ) {}

  taskCountData !: TaskCountData;
  taskGraphData !: TaskGraphData;
  currentUserName: string = '';

  ngOnInit() {
    this.loadCurrentUser();
    this.loadTaskData();
  }

  loadCurrentUser(){
    this.devAPIService.getCurrentUser().subscribe(
      apiData =>{
        console.log(apiData)
        this.currentUserName = apiData.username
      }
    )
  }

  loadTaskData() {

    this.taskService.getTaskCount().subscribe(
      (apiData: TaskCountData) => {
        this.taskCountData = apiData;
        console.log(this.taskCountData);
      }
    );

    this.taskService.getTaskGraphData().subscribe(
      (apiData: TaskGraphData) => {
        this.taskGraphData = apiData;
        console.log(this.taskGraphData);
        this.loadCharts(); // Load charts after data is fetched
      }
    );
  }

  loadCharts() {
    this.createChart('myChart1',
       this.taskGraphData.tasks_added_per_day,
        '# of Tasks Added',
        'rgba(54, 162, 235, 0.5)',
        'rgba(54, 162, 235, 1)'

    );
    this.createChart('myChart2',
       this.taskGraphData.completions_per_day,
        '# of Tasks Completed',
        'rgba(0, 255, 0, 0.5)',
         'rgba(0, 255, 0, 1)'
    );
    this.createChart('myChart3',
       this.taskGraphData.tasks_due_next_7_days,
        '# of Tasks Due',
        'rgba(255, 0, 0, 0.5)',
        'rgba(255, 0, 0, 1)'

    );
  }

  createChart(chartId: string, data: Record<string, number>, label: string, backgroundColor: string, borderColor: string) {
    let chartElement = document.getElementById(chartId) as HTMLCanvasElement;
    if (chartElement) {

      const labels = Object.keys(data).map(date => {
        const [year, month, day] = date.split('-');
        return `${month}/${day}`; // Formats the date as MM/DD
      });
      const values = Object.values(data);

      new Chart(chartElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: values,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 0.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
  }
}
