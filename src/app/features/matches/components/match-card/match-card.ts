import {
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';

import {
  DatePipe,
} from '@angular/common';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  RouterLink,
} from '@angular/router';

import { Match }
from '../../models/match.model';

import { Prediction }
from '../../../predictions/models/prediction.model';

import { PredictionService }
from '../../../predictions/services/prediction.service';

import { AuthService }
from '../../../auth/services/auth';

@Component({
  selector: 'app-match-card',

  imports: [
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
  ],

  templateUrl:
    './match-card.html',

  styleUrl:
    './match-card.css',
})
export class MatchCard {

  private predictionService =
    inject(PredictionService);

  authService =
    inject(AuthService);

  match =
    input.required<Match>();

  predictions =
    input<Prediction[]>([]);

  prediction =
    computed(() =>
      this.predictions()
        .find(
          p =>
            p.matchId ===
            this.match().id
        )
    );

  predictionClosed =
    computed(() => {

      return (
        new Date(
          this.match().date
        ).getTime()
        <= Date.now()
      );

    });

  form =
    new FormGroup({

      homeScore:
        new FormControl(0),

      awayScore:
        new FormControl(0),

    });

  constructor() {

    effect(() => {

      const prediction =
        this.prediction();

      if (
        !prediction
      ) {
        return;
      }

      this.form.patchValue({
        homeScore:
          prediction.homeScore,

        awayScore:
          prediction.awayScore,
      });

    });

  }

  savePrediction() {

    if (
      this.predictionClosed()
    ) {

      alert(
        'Prediction Closed'
      );

      return;

    }

    if (
      !this.authService
        .isLoggedIn()
    ) {
      return;
    }

    this.predictionService
      .save({

        matchId:
          this.match().id,

        homeScore:
          this.form.value
            .homeScore ?? 0,

        awayScore:
          this.form.value
            .awayScore ?? 0,

      })
      .subscribe({

        next: () => {

          alert(
            'Prediction Saved'
          );

        },

        error: (err) => {

          console.error(
            err
          );

        },

      });

  }

}