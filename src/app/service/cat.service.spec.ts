import { CatService } from './cat.service';
import { Cat } from '../model/cat.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';

describe('CatService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let catService: CatService;
  
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    catService = new CatService(httpClientSpy);
  });

  it('should return all cats', (done: DoneFn) => {
    const expectedCats: Cat[] = [
      {id: '1', imageUrl: 'url1', numberOfVotes: 3},
      {id: '2', imageUrl: 'url2', numberOfVotes: 6},
    ];

    httpClientSpy.get.and.returnValue(of(expectedCats));
    catService.getAll().subscribe({
      next: (cats) => {
        expect(cats).toEqual(expectedCats);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
