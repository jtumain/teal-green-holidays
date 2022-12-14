import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, public authService: AuthService) {}

  public get(url: string) {
    return this.http.get(url, this.headers);
  }

  public post(url: string, body: any) {
    return this.http.post(url, body, this.headers);
  }

  private get headers() {
    return {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.accessToken}`
      ),
    };
  }
}
