import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Project } from 'src/app/Project';
import { ActivatedRoute, Router } from '@angular/router';
import { SubProject } from 'src/app/SubProject';
import { Phase } from 'src/app/Phase';


@Component({
  selector: 'pm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit,OnDestroy {
  projectName = new FormControl('');
  projectDescription = new FormControl('');
  projectDueDate = new FormControl('');
  subProjects = new FormControl(['']);
  id = "";
  subList: SubProject[] = [];
  public sub: any;
  constructor(private route: ActivatedRoute) { }
  
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      let pr = this.findProject();

      this.projectName.setValue(pr.name);
      this.projectDescription.setValue(pr.description);
      this.projectDueDate.setValue(pr.dueDate);
     // this.subProjects.setValue(pr.subProjects);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  edit(){
    let editedProject = new Project(Number.parseInt(this.id),
      this.projectName.value != null ? this.projectName.value : " ",
      this.projectDescription.value != null ? this.projectDescription.value : "No description",
      this.projectDueDate.value != null ? this.projectDueDate.value : Date.now.toString(),
     // this.subList != null ? this.subList : [],
      Phase.NONE
      )

    localStorage.setItem(this.id,JSON.stringify(editedProject)) //Nem localstorage lesz
  }
  delete(){
    const statuses = new Array<Project>();
    for (let index = 0; index < localStorage.length; index++) {
      statuses.push(JSON.parse(localStorage[index]));
    }
    localStorage.clear();
    statuses.splice(Number.parseInt(this.id),1);
    statuses.forEach(status => localStorage.setItem(statuses.indexOf(status).toString(),JSON.stringify(status)));
  }

  findProject(): Project{
   let thisProject = JSON.parse(localStorage.getItem(this.id) || '{}');
   return thisProject;
  }
}
