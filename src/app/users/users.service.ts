import { Injectable } from '@angular/core';
import { users } from './users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) {}
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  
  getUsers(): Observable<users[]> {
    return this.http
      .get<users[]>(this.usersUrl)
      .pipe(catchError(this.handleError<users[]>('getUsers', [])));
  }

  addUser(user: users): Observable<users>{
    return this.http.post<users>(this.usersUrl, user, this.httpOptions)
    .pipe(
      catchError(this.handleError<users>('addUser'))
    );
  }

}
