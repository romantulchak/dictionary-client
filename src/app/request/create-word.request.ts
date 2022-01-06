import { LanguageDTO } from "../dto/language.dto";

export class CreateWordRequest{
    public name: string;
    public code: string;
    public words: string[];
    public languagesTo: CreateWordRequest[];

    constructor(name: string, code: string, words: string[]){
        this.name = name;
        this.code = code;
        this.words = words;
    }
}