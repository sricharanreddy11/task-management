import { Component, inject, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { DatePipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { PriorityPipe } from '../priority.pipe';
import { LoadingSpinnerComponent } from "../../../shared/loading-spinner/loading-spinner.component";
import { FormsModule, NgModel } from '@angular/forms';
import { StatusPipe } from "../status.pipe";
import { DevAPIService } from '../../dev.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ModalComponent, FormsModule, NgClass, DatePipe, TitleCasePipe, PriorityPipe, LoadingSpinnerComponent, NgIf, StatusPipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  
  @ViewChild('modal') modalComponent!: ModalComponent;
  @Input() task: any;

  private devAPIService = inject(DevAPIService)
  
  // Track edit mode for each field using an index signature
  editMode: { [key: string]: boolean } = {
    title: false,
    description: false,
    due_date: false,
    priority: false,
    status: false
  };

  openForm() {
    this.modalComponent.openModal();
  }

  // Toggle edit mode for a specific field using bracket notation
  toggleEdit(field: string) {
    this.editMode[field] = !this.editMode[field];
  }

  // Check if any field is in edit mode
  isAnyEditMode(): boolean {
    return Object.values(this.editMode).some(isEdit => isEdit);
  }

  // Save the task after editing
  saveTask() {
    // Here you can call your service to save the task data
    this.updateTask();
    this.resetEditMode();
  }

  // Reset edit mode for all fields
  resetEditMode() {
    for (const field in this.editMode) {
      if (this.editMode.hasOwnProperty(field)) {
        this.editMode[field] = false;
      }
    }
  }

  updateTask() {
    let task_id = this.task.id
    this.devAPIService.updateTask({
      "title": this.task.title,
      "description": this.task.description,
      "due_date": this.task.due_date,
      "priority": this.task.priority,
      "status": this.task.status,
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
