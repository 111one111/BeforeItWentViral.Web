import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '../interfaces/response.interface';
import { catchError, retry } from 'rxjs/operators';
import { AuthCallsService } from './auth-calls.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private authCallsService: AuthCallsService) { }

  /**
   * Used for all post requests
   * @param url url required for http post to hit
   * @param payload object to send
   */
  postRequest(url: string, payload: any): Observable<Response> {
    return this.http.post<Response>(url, payload)
    .pipe();
  }

  /**
   * Authorized version of post request
   * @param url url required for http post to hit
   * @param payload object to send
   */
  authPostRequest(url: string, payload: any): Observable<Response>  {
    return this.http.post<Response>(url, payload, {headers: this.authCallsService.authHeader()})
    .pipe();
  }

  /**
   * Used in special circumstances where data is required before processing.
   * @param url Url
   * @param payload data
   */
  async promiseAuthPostRequest(url: string, payload: any): Promise<Response>  {
    return this.http.post<Response>(url, payload, {headers: this.authCallsService.authHeader()})
      .toPromise()
      .catch(this.promiseHandleError);
  }

  /**
   * Used for all Get Requests
   * @param url url required for http post to hit
   */
  getRequest(url: string): Observable<Response> {
    return this.http.get<Response>(url)
    .pipe();
  }

  /**
   * Authorized version of Get Requests
   * @param url url required for http post to hit
   */
  authGetRequest(url: string): Observable<Response> {
    return this.http.get<Response>(url, {headers: this.authCallsService.authHeader()})
    .pipe();
  }

  /**
   * For updating data
   * @param url url required for http post to hit
   * @param payload object to send
   */
  putRequest(url: string, payload: any): Observable<Response> {
    return this.http.put<Response>(url, payload)
    .pipe();
  }

  /**
   * Authorized version of Get Requests
   * @param url url required for http post to hit
   */
  authPutRequest(url: string, payload: any): Observable<Response> {
    return this.http.put<Response>(url, payload, {headers: this.authCallsService.authHeader()})
    .pipe();
  }

  /**
   * Used in special circumstances where data is required before processing.
   * @param url Url
   * @param payload data
   */
  async promiseAuthPutRequest(url: string, payload: any): Promise<Response>  {
    return this.http.put<Response>(url, payload, {headers: this.authCallsService.authHeader()})
      .toPromise()
      .catch(this.promiseHandleError);
  }

  /**
   * Observable Error handler.
   * @param error error.
   */
  private handleError(error: HttpErrorResponse) {
    console.error('The web app is having issues ${error.error}');
  }

  /**
   * Promise error handler
   * @param error Promise error.
   */
  private promiseHandleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
