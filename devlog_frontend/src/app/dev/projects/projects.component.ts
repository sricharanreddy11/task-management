import { Component } from '@angular/core';
import { NewProjectComponent } from "./new-project/new-project.component";
import { ProjectComponent } from "./project/project.component";
import { DevAPIService } from '../dev.service';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoadingListComponent } from "../../shared/loading-list/loading-list.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NewProjectComponent, DatePipe, RouterModule, LoadingListComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects: any;
  isLoading: boolean = false;

  constructor(private devAPIService: DevAPIService, private router: Router){}
    ngOnInit(){
      this.isLoading = true;
      this.devAPIService.getProjectList().subscribe(
        (resData: any) => {
          console.log(resData)
          this.projects = resData
          this.isLoading = false;
        },
        (error) =>{
          this.isLoading = false;
        }
      )
    }

    viewProject(project: any){
      this.router.navigate(['dev/projects/', project.id]);
    }
}
