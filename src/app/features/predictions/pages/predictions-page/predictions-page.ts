import {
  Component,
  computed,
  inject,
} from '@angular/core';
import { Match } from '../../../matches/models/match.model';
import {
  ActivatedRoute,
} from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { toSignal } from '@angular/core/rxjs-interop';

import { MatchService } from '../../../matches/services/match.service';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-predictions-page',
  imports: [ReactiveFormsModule],
  templateUrl: './predictions-page.html',
  styleUrl: './predictions-page.css',
})
export class PredictionsPage {
  private route = inject(ActivatedRoute);

  private matchService =
    inject(MatchService);

  private predictionService =
    inject(PredictionService);

  matchId = Number(
    this.route.snapshot.paramMap.get(
      'id'
    )
  );
  matches = toSignal(
    this.matchService.getMatches(),
    {
      initialValue: [] as Match[],
    }
  );
  match = computed<Match | undefined>(() =>
    this.matches().find(
      (m) => m.id === this.matchId
    )
  );

  form = new FormGroup({
    homeScore: new FormControl(
      0,
      [
        Validators.required,
        Validators.min(0),
      ]
    ),

    awayScore: new FormControl(
      0,
      [
        Validators.required,
        Validators.min(0),
      ]
    ),
  });

  savePrediction() {
    alert('salam');
    if (this.form.invalid) {
      return;
    }

    this.predictionService.save({
      matchId: this.matchId,

      homeScore:
        this.form.value.homeScore ?? 0,

      awayScore:
        this.form.value.awayScore ?? 0,
    });

    alert('Prediction Saved');
  }
}