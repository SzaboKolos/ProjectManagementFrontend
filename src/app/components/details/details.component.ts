import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Phase } from 'src/app/Phase';
import { Project } from 'src/app/Project';
import { SubProject } from 'src/app/SubProject';
import { User } from 'src/app/User';

@Component({
  selector: 'pm-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  
  users: User[] = [];
  subProjects: SubProject[] = [];
  project: Project = new Project(-1,"No project loaded","Please reload the page","null",0);
  phases: string[] = [Phase[0], Phase[1], Phase[2], Phase[3], Phase[4], Phase[5], Phase[6], Phase[7]];

  baseUrl = "https://localhost:7278/api/"

  id = -1;
  public sub: any;

  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.id++; 
      this.findProject();
    });

    this.subProjects = this.getSubProjects4Project(this.id);
    console.log(this.subProjects);
    
  }
  getProject(): Observable<any> {
    return this.http.get(`${this.baseUrl + 'projects'}/${this.id}`);
  }
  getAllUsers(): Observable<any> {
    console.log(this.http.get(this.baseUrl+'users/'))
    return this.http.get(this.baseUrl+'users/');
  }
  findProject(){
    this.getProject()
  }
  getAllSubProjects(): Observable<SubProject[]> {
    return this.http.get<SubProject[]>(this.baseUrl + 'subprojects');
  }
  getSubProjects4Project(projectId: number): SubProject[]{
    let subs: SubProject[] = [];
    let _subs: SubProject[] = [];
    this.getAllSubProjects().subscribe(result => {
      console.log('log',result);
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
  getUserById(id: number) : User{
    let user: User = new User(-1,"NoUSER","NoUser");
    this.http.get(`${this.baseUrl + 'users/'}/${id}`).subscribe(result=> user = result as User);
    return user;
  }
  parseParticipantIds(partIds: string): User[] {
    let _ids = partIds.split(';');
    let ids : number[] = [];
    let users: User[] = [];
    _ids.forEach(id=> ids.push(parseInt(id)));
    ids.forEach(id => users.push(this.getUserById(id)));
    return users;
  }
getColorByPhase(phase: number) : string{
  console.log(phase);
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

