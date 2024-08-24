import { Component, OnInit } from '@angular/core';
import { DevAPIService } from '../dev.service';
import { TaskCountData, TaskGraphData } from './dashboard.model';
import Chart from 'chart.js/auto'
import { KeyValuePipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, KeyValuePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor (private devAPIService: DevAPIService) {}

  taskCountData !: TaskCountData;
  taskGraphData !: TaskGraphData;

  ngOnInit() {
    this.loadTaskData();
    const ctx = document.getElementById('myChart');

    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
  }

  loadTaskData() {

    this.devAPIService.getTaskCount().subscribe(
      (apiData: TaskCountData)=>{
        console.log(apiData)
        this.taskCountData = apiData
      }
    )

    this.devAPIService.getTaskGraphData().subscribe(
      (apiData: TaskGraphData)=>{
        console.log(apiData)
        this.taskGraphData = apiData
      }
    )
  }
}
