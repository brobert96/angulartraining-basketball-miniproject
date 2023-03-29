import { Injectable } from '@angular/core';
import { Team } from '../../models';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RawTeams } from '../models/api-results';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private trackedTeams: Team[] = [];
  private trackedTeamsSubject = new BehaviorSubject<Team[]>([]);

  constructor(private apiService: ApiService) { }

  getTeams(): Observable<Team[]> {
    return this.apiService.get('teams').pipe(map((t: RawTeams) => t.data));
  }

  trackTeam(team: Team) {
    if(!this.trackedTeams.find(t => t.id === team.id)){
    this.pushTeam(team);
    }
  }

  get trackedTeams$(): Observable<Team[]> {
    return this.trackedTeamsSubject.asObservable();
  }

  pushTeam(value: Team) {
    this.trackedTeams.push(value);
    this.trackedTeamsSubject.next(this.trackedTeams);
  }

  removeTeam(id: number) {
    this.trackedTeams = this.trackedTeams.filter((t: Team) => t.id !== id);
    this.trackedTeamsSubject.next(this.trackedTeams);
  }

  getTeamByCode(code: string): Team | undefined {
    return this.trackedTeams.find((t: Team) => t.abbreviation === code);
  }
}
