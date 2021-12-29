import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const API_URL = environment.API_URL;

@Injectable({
    providedIn:'root'
})
export class RoleService{

    constructor(private http: HttpClient){}

    public getRolesForUser(id: string): Observable<string[]>{
        return this.http.get<string[]>(`${API_URL}role/user-roles/${id}`);
    }
}
