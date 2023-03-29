import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameResults, Team } from '../shared/models';
import { GamesService, TeamsService } from '../shared/services';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit  {
  teamDetails: Team | undefined;
  pastGames: GameResults[] = [];

  constructor(private route: ActivatedRoute, private teamService: TeamsService, private gameService: GamesService) { }

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const teamCodeFromRoute = routeParams.get('teamCode');

    if(!teamCodeFromRoute){
      return;
    }
  
    // Find the product that correspond with the id provided in route.
    let team = this.teamService.getTeamByCode(teamCodeFromRoute);
    if(team){
      this.gameService.getGamesFromPast12Days(team.id).subscribe((data: GameResults[]) => {
        this.teamDetails = team;
        this.pastGames = data;
      });
    }
  }

  getLogoUrl() {
    return `https://interstate21.com/nba-logos/${this.teamDetails?.abbreviation}.png`;
  }
}
