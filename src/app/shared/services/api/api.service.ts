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

  get(path: string) {
    return this.http.get<any>(`${this.apiUrl}/${path}`);
  }
}
