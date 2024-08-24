import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { DevAPIService } from '../../dev.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from "../../../shared/loading-spinner/loading-spinner.component";
import { StatusPipe } from "../../tasks/status.pipe";
import { PriorityPipe } from "../../tasks/priority.pipe";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ModalComponent, DatePipe, NgFor, NgIf, NgClass, LoadingSpinnerComponent, RouterLink, StatusPipe, PriorityPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  
  @ViewChild('modal') modalComponent!: ModalComponent;

  projectId = "";
  project: any;
  private devAPIService = inject(DevAPIService)
  private activatedRoute= inject(ActivatedRoute)
  route: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params['id'];
      console.log(params['id']);
      if (this.projectId) {
        this.devAPIService.getProjectDetail(this.projectId).subscribe(
          (apiData) =>{
            this.project = apiData
            console.log(apiData)
          },
          (error) =>{
            console.log("Something Went Wrong")
          }
        )
      }
    });
  }

  openForm() {
    this.modalComponent.openModal();
  }
}
