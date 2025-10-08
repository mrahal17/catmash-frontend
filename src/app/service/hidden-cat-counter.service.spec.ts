import { TestBed } from '@angular/core/testing';
import { HiddenCatCounterService } from './hidden-cat-counter.service';

describe('HiddenCatCounterService', () => {
  let service: HiddenCatCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiddenCatCounterService);
  });

  it('should increment the battle count correctly', () => {
    let result: number | undefined;

    service.hiddenCatCount.subscribe(value => result = value);

    service.incrementHiddenCatCount();
    expect(result).toBe(1);

    service.incrementHiddenCatCount();
    expect(result).toBe(2);
    });
});
