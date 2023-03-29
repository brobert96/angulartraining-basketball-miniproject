import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameResults, SimpleGameResults } from '../../models';
import { ApiService } from '../api/api.service';
import { RawGames } from '../models/api-results';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private past12DaysQueryParam = '';
  constructor(private apiService: ApiService) {
    this.past12DaysQueryParam = this.createQueryParamForPast12Days();
  }

  getGamesFromPast12Days(teamId: number): Observable<GameResults[]> {
    const queryParams = `?${this.past12DaysQueryParam}team_ids[]=${teamId}`;
    return this.apiService
      .get<RawGames>(`games${queryParams}`)
      .pipe(map((t) => {
        let gameList = t.data;
        gameList = gameList.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return gameList;
      }));
  }

  getSimpleGamesFromPast12Days(teamId: number): Observable<SimpleGameResults> {
    return this.getGamesFromPast12Days(teamId).pipe(
      map((t: GameResults[]) => {
        return {
          teamId: teamId,
          listWinsOrLoses: t.map((g: GameResults) => {
            if (g.home_team.id === teamId) {
              return g.home_team_score > g.visitor_team_score;
            } else {
              return g.visitor_team_score > g.home_team_score;
            }
          }),
          avgPoints: Math.round(
            t
              .map((g: GameResults) => {
                if (g.home_team.id === teamId) {
                  return g.home_team_score;
                } else {
                  return g.visitor_team_score;
                }
              })
              .reduce((a, b) => a + b, 0) / t.length
          ),
          avgPointsConceded: Math.round(
            t
              .map((g: GameResults) => {
                if (g.home_team.id === teamId) {
                  return g.visitor_team_score;
                } else {
                  return g.home_team_score;
                }
              })
              .reduce((a, b) => a + b, 0) / t.length
          ),
        } as SimpleGameResults;
      })
    );
  }

  private createQueryParamForPast12Days(): string {
    let date = new Date();
    let queryParam = '';
    date.setDate(date.getDate() - 12);
    for (let i = 0; i <= 12; i++) {
      queryParam += `dates[]=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}&`;
      date.setDate(date.getDate() + 1);
    }
    return queryParam;
  }
}
