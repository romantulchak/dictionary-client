import { LanguageDTO } from "../dto/language.dto";

export class CreateWordRequest{
    public name: string;
    public code: string;
    public word: string;
    public languagesTo: CreateWordRequest[];

    constructor(name: string, code: string, word: string){
        this.name = name;
        this.code = code;
        this.word = word;
    }
}