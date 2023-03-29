import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawTeams } from '../models/api-results';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://free-nba.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  get<T>(path: string) {
    return this.http.get<T>(`${this.apiUrl}/${path}`);
  }
}
