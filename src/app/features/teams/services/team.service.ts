import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

import { Team } from '../models/team.model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private http = inject(HttpClient);

  getTeams() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/teams`
      )
      .pipe(
        map(response =>
          response.teams.map(
            (team: any): Team => ({
              id: team.id,
              name: team.name,
              code: team.tla,
              flag: team.crest,
              group: '',
            })
          )
        )
      );
  }
}