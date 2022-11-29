import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Project';
import { Phase } from 'src/app/Phase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubProject } from 'src/app/SubProject';
import { User } from 'src/app/User';

@Component({
  selector: 'mm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  NOUSER = new User(-1,"NoUSER","NoUser");
  testProject = new Project(-1,"Static Project","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin blandit tincidunt. Donec mollis ligula a orci pellentesque, ac pellentesque erat congue","2022-12-31",1); //,[new SubProject(0,-1,"Test Task 1",[this.NOUSER],"Test Description","2022-12-31 10:15",true)]
  public projects: Project[] = [this.testProject];
  phases: string[] = [Phase[0], Phase[1], Phase[2], Phase[3], Phase[4], Phase[5], Phase[6], Phase[7]];
  projUrl = "https://localhost:7278/api/projects"
  subProjUrl = "https://localhost:7278/api/subprojects"
  subProjects: SubProject[] = [];
  constructor(private http: HttpClient) {
  }   
  ngOnInit(): void {
    this.getAllProjects().subscribe(result => {
      console.log(result);
      this.projects = result;
    }, error => console.error(error));
  }
  ngOnDestroy(){
  }
  
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projUrl);
  }
  getAllSubProjects(): Observable<SubProject[]> {
    return this.http.get<SubProject[]>(this.subProjUrl);
  }
  getSubProjects4Project(projectId: number): SubProject[]{
    let subs: SubProject[] = [];
    let _subs: SubProject[] = [];
    this.getAllSubProjects().subscribe(result => {
      console.log(result);
      _subs = result;
    }, error => console.error(error)).unsubscribe();

    _subs.forEach(sub => {
      if (projectId == -1){
        subs.push(sub);
      }
      else if (sub.projectId == projectId){
        subs.push(sub);
      }
    })
    return subs;
  }
  getColorByPhase(phase: number) : string{
    switch (phase){
     default:
       return "pDefault"
       break;
     case 1:
       return "p1"
       break;
     case 2:
       return "p2"
       break;
     case 3:
       return "p3"
       break;
     case 4:
       return "p4"
       break;
     case 5:
       return "p5"
       break;
     case 6:
       return "p6"
       break;
     case 7:
       return "p7"
       break;
    }
   }
}
