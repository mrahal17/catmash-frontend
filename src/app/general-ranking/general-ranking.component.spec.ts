import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRankingComponent } from './general-ranking.component';

describe('GeneralRankingComponent', () => {
  let component: GeneralRankingComponent;
  let fixture: ComponentFixture<GeneralRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeneralRankingComponent]
    });
    fixture = TestBed.createComponent(GeneralRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
