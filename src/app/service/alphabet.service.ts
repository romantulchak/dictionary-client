import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LetterDTO } from "../dto/letter.dto";

const API_URL = `${environment.ALPHABET_URL}alphabet`;

@Injectable({
    providedIn: 'root'
})
export class AlpahbetService{

    constructor(private http: HttpClient){}

    public getAlphabetForLanguage(languageCode: string): Observable<LetterDTO[]>{
        let params = new HttpParams();
        params = params.append('languageCode', languageCode);
        return this.http.get<LetterDTO[]>(`${API_URL}`, {params: params});
    }
}