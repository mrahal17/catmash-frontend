import { CatService } from './cat.service';
import { Cat } from '../model/cat.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';

describe('CatService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let catService: CatService;
  
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'patch']);
    catService = new CatService(httpClientSpy);
  });

  it('should return all cats', (done: DoneFn) => {
    const expectedCats: Cat[] = [
      {id: '1', url: 'url1', numberOfVotes: 3},
      {id: '2', url: 'url2', numberOfVotes: 6},
    ];

    httpClientSpy.get.and.returnValue(of(expectedCats));
    catService.getAll().subscribe({
      next: (cats) => {
        expect(cats).toEqual(expectedCats);
        expect(httpClientSpy.get.calls.count()).toBe(1);
        done();
      },
      error: done.fail,
    });

  });

  it('should return all cats ranked', (done: DoneFn) => {
    const expectedCatsRanked: Cat[] = [
      {id: '2', url: 'url2', numberOfVotes: 6},
      {id: '1', url: 'url1', numberOfVotes: 2},
    ];

    httpClientSpy.get.and.returnValue(of(expectedCatsRanked));
    catService.getAllRanked().subscribe({
      next: (cats) => {
        expect(cats).toEqual(expectedCatsRanked);
        expect(httpClientSpy.get.calls.count()).toBe(1);
        done();
      },
      error: done.fail,
    });
  });

  it('should increment number of votes for a cat', (done: DoneFn) => {
    const catId = '123';
    const increment = 5;
    const expectedMessage = 'Number of votes updated by 5.';

    httpClientSpy.patch.and.returnValue(of(expectedMessage));

    catService.incrementNumberOfVotes(catId, increment).subscribe({
      next: (message) => {
        expect(message).toEqual(expectedMessage);

        expect(httpClientSpy.patch.calls.count()).toBe(1);
        expect(httpClientSpy.patch.calls.argsFor(0)[1]).toEqual({ increment: increment });
        done();
      },
      error: done.fail,
    });
  });
});
