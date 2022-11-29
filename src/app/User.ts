export class User{
    public id: number;
    public userName: string;
    public displayName: string;
    public password: string;

    constructor(id: number,userName: string, password :string ){
        this.id = id;
        this.userName = userName;
        this.displayName = userName;
        this.password = password;
    }
}