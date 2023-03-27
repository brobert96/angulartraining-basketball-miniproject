import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Team } from '../shared/models';
import { GamesService } from '../shared/services';
import { TeamsService } from '../shared/services/teams/teams.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  teamList: Team[] = [];
  trackedTeams: Team[] = [];
  subscriptions: Subscription = new Subscription();
  constructor(
    private teamService: TeamsService,
    private gameService: GamesService
  ) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      this.teamList = data;
    });

    this.subscriptions.add(
      this.teamService.trackedTeams$.subscribe((data: Team[]) => {
        this.trackedTeams = data;
      })
    );
  }
    
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  trackTeam(id: string) {
    let teamId = parseInt(id);
    const team = this.teamList.find((t: Team) => t.id === teamId);
    if (team) {
      this.gameService
        .getSimpleGamesFromPast12Days(teamId)
        .subscribe((data: any) => {
          team.simpleGameResults = data;
          this.teamService.trackTeam(team);
        });
    }
  }
}
