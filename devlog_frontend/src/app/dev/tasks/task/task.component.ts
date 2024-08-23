import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { PriorityPipe } from '../priority.pipe';
import { LoadingSpinnerComponent } from "../../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ModalComponent, NgClass, DatePipe, TitleCasePipe, PriorityPipe, LoadingSpinnerComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  
  @ViewChild('modal') modalComponent!: ModalComponent;
  @Input() task: any;

  openForm() {
    this.modalComponent.openModal();
  }

  updateTask(){
    
  }

}
