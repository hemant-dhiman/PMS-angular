import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { users } from "./users";

@Injectable()
export class AuthenticateService{
    constructor(private http:HttpClient){}

    login(userName: string, password: string){
        return this.http.post<users>(`/users/authenticate`,{username: userName, password:password})

    }
}