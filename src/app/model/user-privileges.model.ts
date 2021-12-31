export class UserPrivileges{
    public isAdmin: boolean;
    public isModerator: boolean;
    public isUser: boolean;

    constructor(isAdmin: boolean, isModerator: boolean, isUser: boolean){
        this.isAdmin = isAdmin;
        this.isModerator = isModerator;
        this.isUser = isUser;
    }

    public allowAllRoles(): boolean{
        return this.isAdmin || this.isModerator || this.isUser;
    }
}
