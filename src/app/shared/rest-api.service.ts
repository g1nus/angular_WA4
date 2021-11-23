import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Member } from './member';
import { Parties } from './parties';
import { MemberParties } from './member-parties';
import { Websites } from './websites';
import { MemberDetails } from './member-details';

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

  getParties(): Observable<Parties[]> {
    return this.http.get<Parties[]>(this.apiUrl + '/parties').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getMemberParties(): Observable<MemberParties[]> {
    return this.http.get<MemberParties[]>(this.apiUrl + '/memberparties').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getWebsites(): Observable<Websites[]> {
    return this.http.get<Websites[]>(this.apiUrl + '/websites').pipe(
      retry(1),
      catchError(this.handleError)
    );
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
