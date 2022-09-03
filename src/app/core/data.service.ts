import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public http: HttpClient
  ) { 

  }

  public getCubeResults() {
    return this.http.get('../assets/data/cube-results.json');
  }
}
