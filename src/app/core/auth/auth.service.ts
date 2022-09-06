import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthCredentials } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_PATH = 'https://www.tealgreenholidays.co.uk/OrbitAPI';

  constructor(
    private http: HttpClient
  ) { }

  public login(username: string, password: string) : Observable<AuthCredentials> {
    const url = `${this.BASE_PATH}/CloudDemo/Sessions/SimpleLogin`;
    const body = `UserLogin=${encodeURIComponent(username)}&Password=${encodeURIComponent(password)}`

    const headers = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<AuthCredentials>(url, body, headers).pipe(
        map((response: AuthCredentials) => {
          this.setCredentials(response);
          return response;
        })
      );
  }

  public logout() {
    localStorage.removeItem('credentials');
  }

  setCredentials(credentials: AuthCredentials) {
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }

  get credentials() {
    const credentials = localStorage.getItem('credentials');
    return credentials || null;
  }

  get accessToken() {
    const credentials = this.credentials;
    if (credentials) {
      const data = JSON.parse(credentials);
      return data.accessToken;
    }
    return null;
  }

  get isLoggedIn() {
    return this.accessToken || null;
  }
}
