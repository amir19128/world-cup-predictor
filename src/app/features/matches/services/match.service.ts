import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Match } from '../models/match.model';

@Injectable({
    providedIn: 'root',
})
export class MatchService {
    private http = inject(HttpClient);
    getMatches(): Observable<Match[]> {
        return this.http
            .get<any>(
                'https://api.football-data.org/v4/competitions/WC/matches'
            )
            .pipe(
                map((response): Match[] =>
                    response.matches.map((match: any): Match => ({
                        id: match.id,

                        homeTeam: match.homeTeam.name,
                        awayTeam: match.awayTeam.name,

                        homeTeamCrest:
                            match.homeTeam.crest,

                        awayTeamCrest:
                            match.awayTeam.crest,

                        date: match.utcDate,

                        stage: match.stage,
                        status: match.status,
                    }))
                )
            );
    }
}