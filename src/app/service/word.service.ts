import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { WordDTO } from "../dto/word.dto";
import { CreateWordRequest } from "../request/word/create-word.request";

const API_URL = `${environment.API_URL}word`;

@Injectable({
    providedIn:'root'
})
export class WordService{

    public words: BehaviorSubject<WordDTO[]> = new BehaviorSubject<WordDTO[]>([]);
    public letterSelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient){}

    public create(request: CreateWordRequest): Observable<void>{
       return this.http.post<void>(`${API_URL}/create`, request).pipe(
           take(1)
       );
    }

    public translate(word: string, languageFrom: string, languageTo: string): Observable<WordDTO[]>{
        let params = new HttpParams();
        params = params.append('word', word)
                       .append('languageFrom', languageFrom)
                       .append('languageTo', languageTo);
        return this.http.get<WordDTO[]>(`${API_URL}/translate`, {params: params}).pipe(
            take(1)
        );
    }

    public getUserWords(): Observable<WordDTO[]>{
        return this.http.get<WordDTO[]>(`${API_URL}/for-user`).pipe(
            take(1)
        );
    }

    public getWordExamples(id: number): Observable<string[]>{
        return this.http.get<string[]>(`${API_URL}/${id}/examples`).pipe(
            take(1)
        );
    }

    public getWordsByLetter(letter: string | undefined, page: number = 0, size: number = 10): Observable<WordDTO[]>{
        return this.http.get<WordDTO[]>(`${API_URL}/by-letter/${letter}`, {params: this.getPageable(page, size)}).pipe(
            take(1)
        );
    }

    public getTopWordsByLanguage(languageCode: string, page: number = 0, size: number = 0): Observable<WordDTO[]>{
        return this.http.get<WordDTO[]>(`${API_URL}/top-words-by-language/${languageCode}`, {params: this.getPageable(page, size)}).pipe(
            take(1)
        );
    }

    private getPageable(page: number, size: number): HttpParams{
        let params = new HttpParams();
        params = params.append('page', page)
                        .append('size', size);
        return params;
    }

}