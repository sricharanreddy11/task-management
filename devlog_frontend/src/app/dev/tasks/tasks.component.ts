import { Component, ViewChild } from '@angular/core';
import { DevAPIService } from '../dev.service';
import { NewTaskComponent } from "./new-task/new-task.component";
import { DatePipe } from '@angular/common';
import { TaskComponent } from "./task/task.component";
import { StatusPipe } from "./status.pipe";
import { PriorityPipe } from "./priority.pipe";
import { TaskService } from './tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NewTaskComponent, DatePipe, TaskComponent, StatusPipe, PriorityPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  creationIntent: string = '';
  createdObjId: string = '';

  @ViewChild('taskDetail', { static: false }) 
  public taskDetail!: TaskComponent;

  @ViewChild('newTask', { static: false }) 
  public newTask!: NewTaskComponent;

  constructor(private devAPIService: DevAPIService,
     public tasksService: TaskService,
     private route: ActivatedRoute,
  ){}
    ngOnInit(){
      this.tasksService.getTaskList().subscribe(
        (resData: any) => {
          console.log(resData)
          this.tasksService.tasks = resData
        }
      )
    }

    ngAfterViewInit() {
      // Pass the component references to the service
      this.tasksService.setTaskDetailComponent(this.taskDetail);
      this.tasksService.setNewTaskComponent(this.newTask);
    }

  selectTask(task: any) {
    this.tasksService.selectedTask = task;
  }

  completeTask(task: any) {
    let task_id = task.id
    this.tasksService.updateTask({
      "title": task.title,
      "status": "completed"
    }, task_id).subscribe(
      (resData) =>{
        console.log(resData)
        console.log("Task Completed")
        this.ngOnInit()
      },
      (error) => {
        console.error('Error updating task', error);
      }
    )
  }
}
