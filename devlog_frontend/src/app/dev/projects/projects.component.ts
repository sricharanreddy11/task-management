import { Component } from '@angular/core';
import { NewProjectComponent } from "./new-project/new-project.component";
import { ProjectComponent } from "./project/project.component";
import { DevAPIService } from '../dev.service';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NewProjectComponent, ProjectComponent, DatePipe, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects: any;
  

  constructor(private devAPIService: DevAPIService, private router: Router){}
    ngOnInit(){
      this.devAPIService.getProjectList().subscribe(
        (resData: any) => {
          console.log(resData)
          this.projects = resData
        }
      )
    }

    viewProject(project: any){
      this.router.navigate(['dev/projects/', project.id]);
    }
}
