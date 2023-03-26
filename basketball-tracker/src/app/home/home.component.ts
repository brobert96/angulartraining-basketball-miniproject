import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/models';
import { GamesService } from '../shared/services';
import { TeamsService } from '../shared/services/teams/teams.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit {
  teamList: Team[] = [];
  trackedTeams: Team[] = [];
  constructor(private teamService: TeamsService, private gameService: GamesService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      this.teamList = data;
    });

    this.teamService.trackedTeams$.subscribe((data: Team[]) => {
      this.trackedTeams = data;
    });
  }

  trackTeam(id: string) {
    let teamId = parseInt(id);
    const team = this.teamList.find((t: Team) => t.id === teamId);
    if(team){
      this.gameService.getSimpleGamesFromPast12Days(teamId).subscribe((data: any) => {
        team.simpleGameResults = data;
        this.teamService.trackTeam(team);
      });
    }
  }
}
