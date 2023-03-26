import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../models';
import { GamesService, TeamsService } from '../../services';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() teamDetails?: Team;

  constructor(
    private teamService: TeamsService
  ) {}

  getLogoUrl() {
    return `https://interstate21.com/nba-logos/${this.teamDetails?.abbreviation}.png`;
  }

  removeTeam(id: number) {
    this.teamService.removeTeam(id);
  }
}
