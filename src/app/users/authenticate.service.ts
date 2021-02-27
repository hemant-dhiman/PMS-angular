import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class AuthenticateService{
    constructor(private http:HttpClient){}

    login(userName: string, password: string){
        return this.http.post<any>(`/users/authenticate`,{username: userName, password:password})
        .pipe(map(user => {
            if(user && user.token){
                
            }
        }));
    }
}