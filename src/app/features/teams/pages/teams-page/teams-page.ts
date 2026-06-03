import { Component, inject, OnInit, signal } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team.model';
import { TeamCard } from '../../components/team-card/team-card';

@Component({
  selector: 'app-teams-page',
  imports: [TeamCard],
  templateUrl: './teams-page.html',
  styleUrl: './teams-page.css',
})
export class TeamsPage implements OnInit {
  private teamService = inject(TeamService);

  teams = signal<Team[]>([]);

  ngOnInit() {
    this.teamService.getTeams().subscribe((teams) => {
      this.teams.set(teams);
    });
  }
}