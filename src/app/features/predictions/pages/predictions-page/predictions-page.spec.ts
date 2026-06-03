import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsPage } from './predictions-page';

describe('PredictionsPage', () => {
  let component: PredictionsPage;
  let fixture: ComponentFixture<PredictionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
