import { User } from "./User";

export class SubProject{
    public id: number;
    public projectId: number;
    public name: string;
    public participantIds: string;
    public description: string;
    public date: string;
    public isTask: boolean;

    constructor(id: number,projectId: number, name: string,participants: User[], description: string, date: string, isTask: boolean){
        let _str = '';
        participants.forEach(x=>_str.concat(x.id+';'));
        _str = _str.substring(0, _str.length-1);
        
        this.id = id;
        this.projectId = projectId;
        this.name = name;
        this.participantIds = _str;
        this.description = description;
        this.date = date;
        this.isTask = isTask;
    }
}
