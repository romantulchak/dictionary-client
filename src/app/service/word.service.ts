import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { WordDTO } from "../dto/word.dto";
import { CreateWordRequest } from "../request/word/create-word.request";

const API_URL = environment.API_URL;

@Injectable({
    providedIn:'root'
})
export class WordService{

    constructor(private http: HttpClient){}

    public create(request: CreateWordRequest): Observable<void>{
       return this.http.post<void>(`${API_URL}word/create`, request);
    }

    public translate(word: string, languageFrom: string, languageTo: string): Observable<WordDTO[]>{
        let params = new HttpParams();
        params = params.append('word', word)
                       .append('languageFrom', languageFrom)
                       .append('languageTo', languageTo);
        return this.http.get<WordDTO[]>(`${API_URL}word/translate`, {params: params});
    }

}