import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingBattleComponent } from './voting-battle.component';

describe('VotingBattleComponent', () => {
  let component: VotingBattleComponent;
  let fixture: ComponentFixture<VotingBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingBattleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
