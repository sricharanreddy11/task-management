import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevAPIService } from '../../dev.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @ViewChild('modal') modalComponent!: ModalComponent;

  taskForm!: FormGroup;
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private devAPIService: DevAPIService
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
      due_date: ['', Validators.required],
      priority: ['', Validators.required],
      project: ['', Validators.required],
      description: ['']
    });

    // Fetch projects
    this.devAPIService.getProjectList().subscribe((data: any[]) => {
      console.log(data)
      this.projects = data;
    });
  }

  openForm() {
    this.modalComponent.openModal();
  }

  onSubmit() {
    if (this.taskForm.valid) {

      const formData = this.taskForm.value;
      console.log('Form Data:', formData);

      // Call the service to post data
      this.devAPIService.createTask(formData).subscribe(response => {
        console.log('Task Created:', response);
      });

      this.modalComponent.closeModal(); // Close modal after submission
    }
  }
}
