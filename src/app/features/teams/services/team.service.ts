import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private http = inject(HttpClient);

  getTeams() {
    return this.http.get<Team[]>('/data/teams.json');
  }
}