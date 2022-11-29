import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Project } from 'src/app/Project';
import { formatDate } from '@angular/common';
import { SubProjectFormComponent } from '../sub-project-form/sub-project-form.component';
import { SubProject } from 'src/app/SubProject';
import { ConfigService } from 'src/app/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Phase } from 'src/app/Phase';
import { catchError, Observable } from 'rxjs';

@Component({
  selector: 'mm-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit,AfterViewInit {
  projectName = new FormControl('');
  projectDescription = new FormControl('');
  projectDueDate = new FormControl('');
  projectPhase = new FormControl(Phase[0]);
  subProjects = new FormControl(['']);

  @ViewChild(SubProjectFormComponent) subProjComp!: SubProjectFormComponent; 
  projUrl = "https://localhost:7278/api/projects/";
  subProjUrl = "https://localhost:7278/api/subprojects/";

  
  subList: SubProject[] = [];
  phases: string[] = [Phase[1],Phase[2],Phase[3],Phase[4],Phase[5],Phase[6],Phase[7]];
  id = -1;
  constructor(private http: HttpClient) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.projectDueDate.setValue(formatDate(Date.now(),'yyyy-MM-dd','en'));
    this.id = localStorage.length;
  }
  add(){
    this.subList = this.subProjComp.subProjects;
    let p = this.projectPhase.value != null ? this.projectPhase.value : Phase.NONE;
    
    let project = new Project(this.id,
      this.projectName.value != null ? this.projectName.value : " ",
      this.projectDescription.value != null || this.projectDescription.value == ' ' ? this.projectDescription.value : "No description given",
      this.projectDueDate.value != null ? this.projectDueDate.value : Date.now.toString(),
      //this.subList ? this.subList : [],
      Phase[p as keyof typeof Phase] 
      );

    
    this.addProject(project);
  }
  addProject(project: Project): Observable<Project> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    return this.http.post<Project>(this.projUrl + this.id, project, httpOptions);
  }
  addSub(subProject: SubProject): Observable<SubProject> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    return this.http.post<SubProject>(this.subProjUrl, subProject, httpOptions);
  }
}
