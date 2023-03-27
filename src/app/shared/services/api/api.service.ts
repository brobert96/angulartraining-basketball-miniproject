import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  apiUrl = 'https://free-nba.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  get(path: string): any {
    return this.http.get(`${this.apiUrl}/${path}`);
  }
}
