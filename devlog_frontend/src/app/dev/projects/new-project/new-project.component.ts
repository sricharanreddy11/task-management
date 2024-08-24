import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevAPIService } from '../../dev.service';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {
  
  @ViewChild('modal') modalComponent!: ModalComponent;

  projectForm!: FormGroup;
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private devAPIService: DevAPIService
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      description: ['']
    });

  }

  openForm() {
    this.modalComponent.openModal();
  }

  onSubmit() {
    if (this.projectForm.valid) {

      const formData = this.projectForm.value;
      console.log('Form Data:', formData);

      // Call the service to post data
      this.devAPIService.createProject(formData).subscribe(response => {
        console.log('Project Created:', response);
      });

      this.modalComponent.closeModal(); // Close modal after submission

      window.location.reload()
    }
  }
}
