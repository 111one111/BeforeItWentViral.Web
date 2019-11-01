import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Login } from '../interfaces/login-user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Response } from '../interfaces/response.interface';
import { NgRedux, select } from '@angular-redux/store';
import {LOGIN, LOGOUT} from '../redux/app.actions';
import { IAppState } from '../redux/store';

import { urlActions } from '../helpers/url-helper';

@Injectable()
export class AuthCallsService {
  @select(['loggedInUser']) storedUser;
  authToken: AuthResponse;
  tokenName = 'create_a_crowd_jwt_token';
  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  /**
   * Sends request to login the user.
   */
  loginUser(user: Login): Observable<Response> {
      return this.http.post<Response>(urlActions.userLogin, user);
  }

  /**
   * Saves AuthToken to local storage.
   */
  saveAuthToken(token: AuthResponse) {
    const expire = new Date();
    const tokenWithTime = { id: token.id,
                            expires_in: expire.setSeconds(expire.getSeconds() + token.expires_in),
                            auth_token: token.auth_token
                          };
    localStorage.setItem(this.tokenName, JSON.stringify(tokenWithTime));
  }

  /**
   * Gets the auth token from storage, local or redux.
   */
  getAuthToken() {
      this.storedUser.subscribe(auth => {
        if (auth !== undefined) {
          if (auth.id !== 0) {
            this.authToken = auth;
            if (auth.expires_In < new Date().getTime()) {
              this.LogOutUser();
            }
            return;
          }
        }

        const authJson = localStorage.getItem(this.tokenName);
        if (authJson) {
          const token: AuthResponse = JSON.parse(authJson);
          if (token != null) {
            this.authToken = token;
            const currentTime = new Date().getTime();
            if (token.expires_in > currentTime) {
              this.ngRedux.dispatch({type: LOGIN, data: token});
            }
          }
        }
    });
  }

  /**
   * This is for logging out, it nullifies the token
   */
  LogOutUser() {
    localStorage.setItem('before_it_went_viral_jwt_token', '{"id": "0"}');
    this.ngRedux.dispatch({type: LOGOUT, data: {id: 0}});
  }

  /**
   * Returns the auth header.
   */
  authHeader(): HttpHeaders  {
    this.getAuthToken();
    if (this.authToken !== null) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken.auth_token);
    } else {
      return new HttpHeaders().set('Authorization', 'Bearer ');
    }
  }

  /**
   * Handles errors by writing to the console.
   */
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(err);
  }
}
