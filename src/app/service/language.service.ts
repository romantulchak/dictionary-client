import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LanguageDTO } from "../dto/language.dto";
import { CountryFlag } from "../model/country-flag.model";
import { CreateLanguageRequest } from "../request/create-language.request";

const API_URL = environment.API_URL;

@Injectable({
    providedIn:'root'
})
export class LanguageService{
    constructor(private http: HttpClient){}

    public getCountryFlags(): Observable<CountryFlag[]>
    {
       return this.http.get<CountryFlag[]>('../assets/country-flags.json');
    }

    public create(request: CreateLanguageRequest): Observable<void>{
        return this.http.post<void>(`${API_URL}language/create`, request);
    }

    public getAllLanguages(): Observable<LanguageDTO[]>{
        return this.http.get<LanguageDTO[]>(`${API_URL}language/all`);
    }
}
