import { Component } from '@angular/core';
import { DevAPIService } from '../dev.service';
import { NewTaskComponent } from "./new-task/new-task.component";
import { DatePipe } from '@angular/common';
import { TaskComponent } from "./task/task.component";
import { StatusPipe } from "./status.pipe";
import { PriorityPipe } from "./priority.pipe";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NewTaskComponent, DatePipe, TaskComponent, StatusPipe, PriorityPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: any;
  selectedTask: any;

  constructor(private devAPIService: DevAPIService){}
    ngOnInit(){
      this.devAPIService.getTaskList().subscribe(
        (resData: any) => {
          console.log(resData)
          this.tasks = resData
        }
      )
    }

  selectTask(task: any) {
    this.selectedTask = task;
  }

  completeTask(task: any) {
    let task_id = task.id
    this.devAPIService.updateTask({
      "title": task.title,
      "status": "completed"
    }, task_id).subscribe(
      (resData) =>{
        console.log(resData)
        console.log("Task Completed")
        window.location.reload()
      },
      (error) => {
        console.error('Error updating task', error);
      }
    )
  }
}
