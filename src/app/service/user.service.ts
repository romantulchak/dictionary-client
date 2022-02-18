import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserDTO } from "../dto/user.dto";

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class UserService{

    constructor(private http: HttpClient){
    }

    public getUserInfo(): Observable<UserDTO>{
        return this.http.get<UserDTO>(`${API_URL}user/info`);
    }
}