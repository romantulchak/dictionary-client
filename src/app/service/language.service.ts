import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LanguageDTO } from "../dto/language.dto";
import { CountryFlag } from "../model/country-flag.model";
import { CreateLanguageRequest } from "../request/create-language.request";

const API_URL = environment.API_URL + "language";

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
        return this.http.post<void>(`${API_URL}/create`, request);
    }

    public getAllLanguages(): Observable<LanguageDTO[]>{
        return this.http.get<LanguageDTO[]>(`${API_URL}/all`);
    }

    public getLanguagesWithPrivileges(page: number = 0, size: number = 10): Observable<LanguageDTO[]>{
        let params = new HttpParams();
        params = params.append('page', page.toString())
                        .append('size', size);
        return this.http.get<LanguageDTO[]>(`${API_URL}/languages-for-panel`, {params: params});
    }

    public getTotalPagesCount(pageSize: number): Observable<number>{
        let params = new HttpParams();
        params = params.append('size', pageSize.toString());
        return this.http.get<number>(`${API_URL}/total-pages`, {params: params})
    }

    public delete(id: number): Observable<void>{
        return this.http.delete<void>(`${API_URL}/${id}`);
    }
}
