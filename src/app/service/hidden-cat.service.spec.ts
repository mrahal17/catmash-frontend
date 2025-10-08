import { TestBed } from '@angular/core/testing';
import { HiddenCatService } from './hidden-cat.service';

describe('HiddenCatService', () => {
  let service: HiddenCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiddenCatService);
  });

  it('should compute a random position style correctly', () => {
    spyOn(service, 'getRandomAltitude').and.returnValue(12);
    spyOn(service, 'getRandomSide').and.returnValue(true);

    const result = service.getRandomPositionStyle();

    expect(result).toContain('top: 12rem;');
    expect(result).toContain('left: -22px;');
    expect(result).toContain('right: auto;');
  });
});
