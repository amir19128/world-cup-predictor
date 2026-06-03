import { Component, input } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-card',
  imports: [],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css',
})
export class TeamCard {
  team = input.required<Team>();
}