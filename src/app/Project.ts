import { SubProject } from "./SubProject";

export class Project{
    public id: number;
    public name: string;
    public description: string;
    public dueDate: string;
    public phase: number;

    constructor(id: number,name: string,description: string,dueDate:string, phase: number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.phase = phase;
    }
}
