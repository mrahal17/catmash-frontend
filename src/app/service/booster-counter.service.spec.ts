import { TestBed } from '@angular/core/testing';
import { BoosterCounterService } from './booster-counter.service';

describe('BoosterCounterService', () => {
  let service: BoosterCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoosterCounterService);
  });

  it('should increment the battle count correctly', () => {
    let result: number | undefined;

    service.boosterCount.subscribe(value => result = value);

    service.incrementBoosterCount();
    expect(result).toBe(1);

    service.incrementBoosterCount();
    expect(result).toBe(2);
    });
});
