import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatchService } from '../../services/match.service';
import { Match } from '../../models/match.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-matches-page',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './matches-page.html',
  styleUrl: './matches-page.css',
})
export class MatchesPage {
  private matchService = inject(MatchService);

  matches = toSignal(
    this.matchService.getMatches(),
    {
      initialValue: [] as Match[],
    }
  );
}