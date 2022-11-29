import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/User';
import { formatDate } from '@angular/common';
import { SubProject } from 'src/app/SubProject';
import { __values } from 'tslib';
import { Project } from 'src/app/Project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'pm-sub-project-form',
  templateUrl: './sub-project-form.component.html',
  styleUrls: ['./sub-project-form.component.scss']
})
export class SubProjectFormComponent implements OnInit {
  baseUrl = "http://localhost:4200/subprojects/"
  
  subType = new FormControl("task");
  subName = new FormControl('');
  subParticipants = new FormControl([]);
  subDate = new FormControl('');
  subDescription = new FormControl('');
  @Input() projectId = -1;

  participants= [];
  isSubprojectValid = true;
  userList : User[] = [new User(0,"TestUser-0","password"),new User(1,"TestUser-1","password"), new User(2,"TestUser-2","password")];
  NOUSER = new User(-1,"NoUSER","NoUser");
  subProjects: SubProject[] = [];
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.subDate.setValue(formatDate(Date.now(),'yyyy-MM-dd hh:mm','en'));
    /*for(let i=0;i<10;i++){
      this.subProjects.push(new SubProject(i,"Valami menő",[this.userList[0]],"No description",Date.now(), true))
    }*/
    this.subProjects = this.getSubProjects4Project(this.projectId);
    console.log(this.subProjects);
  }

  addSub(){
    this.subProjects.push(new SubProject(this.subProjects.length,
      this.projectId,
      this.subName.value != null && this.subName.value != '' ? this.subName.value : "No Name",
      this.subParticipants.value !== null ? this.subParticipants.value as User[] : [this.NOUSER],
      this.subDescription.value !== null && this.subDescription.value !== '' ? this.subDescription.value : "No Description",
      this.subDate.value != null ? this.subDate.value : Date.now().toString(),
      this.subType.value == 'task' ? true : false));
    this.subName.setValue('');
    this.participants = [];
    this.subDescription.setValue('');
    console.log(this.subProjects);
  }
  removeSub(subCardElement: HTMLDivElement, subProject: SubProject){
    subCardElement.remove(); 
    this.subProjects.splice(subProject.id,1);
  }
  editSub(subProject: SubProject) {
    if (subProject.isTask) {
      this.subType.setValue('task');
    //  this.subAssignee.setValue(subProject.participants[0]);
    } else {
      this.subType.setValue('meeting');
     // this.subParticipants.setValue(subProject.participants);
    }
    this.subName.setValue(subProject.name);
    this.subDescription.setValue(subProject.description);
    //this.subDate.setValue(subProject.)
  }
  getSubProjects4Project(projectId: number):SubProject[]{
    let _subs = this.getAllSubProjects();
    let subs: any[] = [];
    _subs.forEach(subProj => {
      subProj = subProj as SubProject
      if (subProj.projectId == projectId){
        subs.push(subProj);
      }
    });
    return subs;
  }
  getUsers(users: User[]) : User[]{
    if (users !== null){
      if (users.length === 1){
        return users;
      }
    } else {
     
    }
    return [this.NOUSER];
  }
  getAllSubProjects(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
