import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiUrl = 'https://data.parliament.scot/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl + '/members').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getMember(id: number): Observable<Member> {
    
  }

  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
