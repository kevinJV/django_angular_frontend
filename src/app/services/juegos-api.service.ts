import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Juegos } from '../models/juegos';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JuegosApiService {
  URL = '/api/v1/';

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getJuegos(): Observable<Juegos> {
    return this.http.get<Juegos>(this.URL + 'juegos/').pipe(
      retry(1)
      //retry(1),
      //catchError(this.handleError)
    )
  }

  createJuegos(juegos): Observable<Juegos> {
    return this.http.post<Juegos>(this.URL + 'juegos/', JSON.stringify(juegos), this.httpOptions)
      .pipe(
        retry(1)
      )
  }
  

  updateJuegos(id, juegos): Observable<Juegos> {
    return this.http.put<Juegos>(this.URL + 'juegos/' + id + '/', JSON.stringify(juegos), this.httpOptions)
      .pipe(
        retry(1),        
      )
  }
  
  
  deleteJuegos(id) {
    return this.http.delete<Juegos>(this.URL + 'juegos/' + id + '/', this.httpOptions)
      .pipe(
        retry(1),        
      ) 
  }


}
