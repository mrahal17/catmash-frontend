import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GeneralRankingComponent } from './general-ranking.component';
import { CatService } from '../service/cat.service';
import { Cat } from '../model/cat.model';
import { HttpClientModule } from '@angular/common/http';

const mockCats: Cat[] = [
  { id: '2', url: 'url2', numberOfVotes: 1 },
  { id: '4', url: 'url4', numberOfVotes: 3 },
  { id: '1', url: 'url1', numberOfVotes: 5 },
  { id: '3', url: 'url3', numberOfVotes: 10 },
];

describe('GeneralRankingComponent', () => {
  let component: GeneralRankingComponent;
  let fixture: ComponentFixture<GeneralRankingComponent>;
  let catServiceSpy: jasmine.SpyObj<CatService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CatService', ['getAllRanked']);

    await TestBed.configureTestingModule({
      imports: [GeneralRankingComponent, HttpClientModule],
      providers: [
        { provide: CatService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralRankingComponent);
    component = fixture.componentInstance;
    catServiceSpy = TestBed.inject(CatService) as jasmine.SpyObj<CatService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllRanked method of service on init', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    fixture.detectChanges();
    expect(catServiceSpy.getAllRanked).toHaveBeenCalledTimes(1);
  });

  it('should display top 3 cats in podium section', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    fixture.detectChanges();

    const component = fixture.nativeElement as HTMLElement;
    const podiumSpots = component.querySelectorAll('.podium-spot');
    expect(podiumSpots.length).toBe(3);
  });

  it('should display all ranks', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    fixture.detectChanges();

    const component = fixture.nativeElement as HTMLElement;
    const rankElements = component.querySelectorAll('.rank');
    expect(rankElements.length).toBe(mockCats.length);
  });

  it('should display the first cat on the first spot', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    fixture.detectChanges();

    const component = fixture.nativeElement as HTMLElement;
    const firstSpotPodium = component.querySelector('.podium-spot.first-spot');
    expect(firstSpotPodium).not.toBeNull();

    const idDiv = firstSpotPodium?.querySelector('.id');
    expect(idDiv).not.toBeNull();

    const firstSpotCatId = idDiv?.textContent?.trim();
    expect(firstSpotCatId).toBe('Chat ' + mockCats[0]['id']);
  });

  it('should display the second cat on the second spot', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    fixture.detectChanges();

    const component = fixture.nativeElement as HTMLElement;
    const secondSpotPodium = component.querySelector('.podium-spot.second-spot');
    expect(secondSpotPodium).not.toBeNull();

    const idDiv = secondSpotPodium?.querySelector('.id');
    expect(idDiv).not.toBeNull();

    const secondSpotCatId = idDiv?.textContent?.trim();
    expect(secondSpotCatId).toBe('Chat ' + mockCats[1]['id']);
  });

  it('should display the third cat on the third spot', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    fixture.detectChanges();

    const component = fixture.nativeElement as HTMLElement;
    const thirdSpotPodium = component.querySelector('.podium-spot.third-spot');
    expect(thirdSpotPodium).not.toBeNull();

    const idDiv = thirdSpotPodium?.querySelector('.id');
    expect(idDiv).not.toBeNull();

    const thirdSpotCatId = idDiv?.textContent?.trim();
    expect(thirdSpotCatId).toBe('Chat ' + mockCats[2]['id']);
  });
});
