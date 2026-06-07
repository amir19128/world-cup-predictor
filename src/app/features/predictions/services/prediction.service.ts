import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environments';

import { Prediction } from '../models/prediction.model';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {

  private http =
    inject(HttpClient);

  save(
    prediction: Prediction
  ): Observable<any> {

    return this.http.post(
      `${environment.apiUrl}/predictions`,
      prediction
    );

  }

  getMyPredictions():
    Observable<Prediction[]> {

    return this.http.get<
      Prediction[]
    >(
      `${environment.apiUrl}/predictions/me`
    );

  }

}