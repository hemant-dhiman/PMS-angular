import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsersService } from "./users.service";

@Injectable()
export class BackEnd implements HttpInterceptor{
    constructor(private usersService: UsersService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let allUsers: any[] = JSON.parse(
            this.usersService.getUsers()) || [];
    }
}