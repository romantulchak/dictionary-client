import { Injectable } from "@angular/core";
import { JwtDTO } from "../dto/jwt.dto";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn:'root'
})
export class TokenStorageService{

    public isUserLoggedIn(): boolean{
        let token = localStorage.getItem(TOKEN_KEY);
        return token !== null && token.length > 0;
    }

    public signOut(): void{
        localStorage.clear();
    }

    public saveToken(token: string): void{
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null{
        return localStorage.getItem(TOKEN_KEY);
    }

    public saveUser(jwt: JwtDTO): void{
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(jwt));
    }

    public getUser(): JwtDTO | null{
        const jwt = localStorage.getItem(USER_KEY);
        if(jwt){
            return JSON.parse(jwt);
        }
        return null;
    }

}