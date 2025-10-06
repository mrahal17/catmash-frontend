import { TestBed } from '@angular/core/testing';
import { BattleCounterService } from './battle-counter.service';

describe('BattleCounterService', () => {
  let service: BattleCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleCounterService);
  });

  it('should increment the battle count correctly', () => {
    let result: number | undefined;

    service.battleCount.subscribe(value => result = value);

    service.incrementBattleCount();
    expect(result).toBe(1);

    service.incrementBattleCount();
    expect(result).toBe(2);
    });
});
