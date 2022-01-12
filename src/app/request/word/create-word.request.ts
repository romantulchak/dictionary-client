import { LanguageDTO } from "../../dto/language.dto";
import { WordDescription } from "./word-description.request";

export class CreateWordRequest{
    public name: string;
    public code: string;
    public words: WordDescription[];
    public languagesTo: CreateWordRequest[];

    constructor(name: string, code: string, words: WordDescription[]){
        this.name = name;
        this.code = code;
        this.words = words;
    }
}