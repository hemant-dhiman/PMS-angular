import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

@Injectable()
export class BackEnd implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let users: any[] = JSON.parse(localStorage.getItem('users'))||[];
        return of(null).pipe(mergeMap(()=>{
            console.log(request.body);
            
            //authentication for existing users
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST'){
                
                let filteredUsers = users.filter(user => {
                    return user.userName === request.body.userName && user.password === request.body.password;
                });
                
                if (filteredUsers.length){
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        userName: user.userName,
                        token: 'jwt-token'
                    };
                    return of(new HttpResponse({status: 200, body: body}));
                }else{
                    return throwError({
                        error:{message: 'userName or password is incorrect'}
                    });
                }
            }
            
            //get all users
            if(request.url.endsWith('/users') && request.method === 'GET'){
                if (request.headers.get('Authorization') === 'Bearer jwt-token'){
                    return of(new HttpResponse({status: 200, body: users}));
                }else{
                    return throwError({status: 401, error: {message:'Unauthorized'}});
                }
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET'){
                if(request.headers.get('Authorization') === 'Bearer jwt-token'){

                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => {
                        return user.id === id;
                    });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({status:200, body:user}));
                }else{
                    return throwError({status:401, error:{message:'Unauthorized'}});
                }
            }


            //register user
            if(request.url.endsWith('/users/register') && request.method === 'POST'){
                let newUser = request.body;
                //validation
                let duplicateUser = users.filter(user => {
                    return user.userName === newUser.userName;
                }).length;
                
                if(duplicateUser){
                    return throwError({
                        error:{ message: 'userName "' + newUser.userName + '" is already taken' }
                    });
                }
                
                //else save new user
                
                newUser.id = users.length+1;
                console.log(newUser)
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                return of(new HttpResponse({status: 200}));
            }

            //delete a user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE'){
                if (request.headers.get('Authorization') === 'jwt-token'){
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for(let i = 0; i< users.length; i++){
                        let user = users[i];
                        if (user.id === id){
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }
                    return of(new HttpResponse({status:200}));
                }else{
                    return throwError({status: 401, error: {message: 'Unauthorized'}});
                }
            }
            return next.handle(request);
        })).pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}


































    
//   constructor(private usersService: UsersService) {}
//     allUsers: users[];
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//       console.log("Interceptor");
//     let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
//     console.log("local storage interceptor")
//     console.log(users);

//     const idToken = localStorage.getItem('id_token');



//     if (idToken) {
//       const cloned_req = request.clone({
//         headers: request.headers.set('Authorization', 'Bearer ' + idToken),
//       });
//       return next.handle(cloned_req);
//     } else {
//       return next.handle(request);
//     }
//   }
//}
