import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtDTO } from "../dto/jwt.dto";
import { LoginRequest } from "../request/login.request";
import { RegistrationRequest } from "../request/registration.request";

const API_URL = environment.API_URL;

@Injectable({
    providedIn:'root'
})
export class AuthService{

    constructor(private http: HttpClient){}

    public login(loginRequest: LoginRequest): Observable<JwtDTO>{
        return this.http.post<JwtDTO>(`${API_URL}auth/sign-in`, loginRequest);
    }

    public registration(registrationRequest: RegistrationRequest): Observable<JwtDTO>{
        return this.http.post<JwtDTO>(`${API_URL}auth/sign-up`, registrationRequest);
    }

}