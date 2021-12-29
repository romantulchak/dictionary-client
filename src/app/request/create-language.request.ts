export class CreateLanguageRequest{
    public name: string;
    public code: string;

    constructor(name: string, code: string){
        this.name = name;
        this.code = code;
    }
}