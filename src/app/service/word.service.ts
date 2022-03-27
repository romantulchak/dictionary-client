import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { WordDTO } from "../dto/word.dto";
import { CreateWordRequest } from "../request/word/create-word.request";

const API_URL = `${environment.API_URL}word`;

@Injectable({
    providedIn:'root'
})
export class WordService{

    constructor(private http: HttpClient){}

    public create(request: CreateWordRequest): Observable<void>{
       return this.http.post<void>(`${API_URL}/create`, request);
    }

    public translate(word: string, languageFrom: string, languageTo: string): Observable<WordDTO[]>{
        let params = new HttpParams();
        params = params.append('word', word)
                       .append('languageFrom', languageFrom)
                       .append('languageTo', languageTo);
        return this.http.get<WordDTO[]>(`${API_URL}/translate`, {params: params});
    }

    public getUserWords(): Observable<WordDTO[]>{
        return this.http.get<WordDTO[]>(`${API_URL}/for-user`)
    }

    public getWordExamples(id: number): Observable<string[]>{
        return this.http.get<string[]>(`${API_URL}/${id}/examples`)
    }

}