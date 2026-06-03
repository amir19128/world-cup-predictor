import { Injectable } from '@angular/core';

import { Prediction } from '../models/prediction.model';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {

  save(prediction: Prediction) {

    const predictions =
      this.getPredictions();

    predictions.push(prediction);

    localStorage.setItem(
      'predictions',
      JSON.stringify(predictions)
    );
  }

  getPredictions(): Prediction[] {

    const data =
      localStorage.getItem(
        'predictions'
      );

    return data
      ? JSON.parse(data)
      : [];
  }
}