import {
  Component,
  computed,
  inject,
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { toSignal }
from '@angular/core/rxjs-interop';

import { DatePipe }
from '@angular/common';

import { MatchService }
from '../../services/match.service';

import { Match }
from '../../models/match.model';

import { MatchCard }
from '../../components/match-card/match-card';

import { PredictionService }
from '../../../predictions/services/prediction.service';

import { Prediction }
from '../../../predictions/models/prediction.model';

@Component({
  selector: 'app-matches-page',

  imports: [
    RouterLink,
    DatePipe,
    MatchCard,
  ],

  templateUrl:
    './matches-page.html',

  styleUrl:
    './matches-page.css',
})
export class MatchesPage {

  private matchService =
    inject(MatchService);

  private predictionService =
    inject(PredictionService);

  matches = toSignal(
    this.matchService
      .getMatches(),
    {
      initialValue:
        [] as Match[],
    }
  );

  predictions = toSignal(
    this.predictionService
      .getMyPredictions(),
    {
      initialValue:
        [] as Prediction[],
    }
  );

  groupedMatches =
    computed(() => {

      const groups:
        Record<string, Match[]>
        = {};

      for (
        const match
        of this.matches()
      ) {

        if (
          !groups[
          match.group
          ]
        ) {

          groups[
            match.group
          ] = [];

        }

        groups[
          match.group
        ].push(match);

      }

      return groups;

    });

  groupNames =
    computed(() =>
      Object.keys(
        this.groupedMatches()
      )
    );

}