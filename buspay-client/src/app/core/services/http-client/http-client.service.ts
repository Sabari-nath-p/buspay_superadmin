import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  baseUrl = environment.config.baseUrl;
  constructor(private http: HttpClient) {}

  /**
   * GET method API call
   *
   * @param route API route.
   * @param params? Parameters if any.
   * @returns Return API response.
   */
  get(route: string, id?: number, params?: any): Observable<any> {
    const url = id
      ? this.baseUrl + `${route}/${id}`
      : this.baseUrl + `${route}`;
    return this.http
      .get(url, params)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * POST method API call
   *
   * @param route API route.
   * @param params? Parameters if any.
   * @returns Return API response.
   */
  post(route: string, params?: any): Observable<any> {
    const url = this.baseUrl + `${route}`;
    return this.http
      .post(url, params)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * PUT method API call
   *
   * @param route API route.
   * @param id? id if any.
   * @param params? Parameters if any.
   * @returns Return API response.
   */
  update(route: string, id?: number, params?: any): Observable<any> {
    const url = id
      ? this.baseUrl + `${route}/${id}`
      : this.baseUrl + `${route}`;
    return this.http
      .put(url, params)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * DELETE method API call
   *
   * @param route API route.
   * @param id? id if any.
   * @returns Return API response.
   */
  delete(route: string, id?: number): Observable<any> {
    const url = id
      ? this.baseUrl + `${route}/${id}`
      : this.baseUrl + `${route}`;
    return this.http
      .delete(route)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Handle error
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.status === 0) {
        errorMessage =
          'Unable to connect to the server. Please check your internet connection.';
      } else {
        errorMessage = 'An unexpected error occurred. Please try again later.';
      }
    }
    console.error('Processed error message:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
