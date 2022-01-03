import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateWordRequest } from "../request/create-word.request";

const API_URL = environment.API_URL;

@Injectable({
    providedIn:'root'
})
export class WordService{

    constructor(private http: HttpClient){}

    public create(request: CreateWordRequest): Observable<void>{
       return this.http.post<void>(`${API_URL}word/create`, request);
    }

    public translate(word: string, languageFrom: string, languageTo: string): Observable<string[]>{
        let params = new HttpParams();
        params = params.append('word', word)
                       .append('languageFrom', languageFrom)
                       .append('languageTo', languageTo);
        return this.http.get<string[]>(`${API_URL}word/translate`, {params: params});
    }

}