import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GeneralRankingComponent } from './general-ranking.component';
import { CatService } from '../service/cat.service';
import { Cat } from '../model/cat.model';
import { HttpClientModule } from '@angular/common/http';
import { HiddenCatService } from '../service/hidden-cat.service';
import { HiddenCatCounterService } from '../service/hidden-cat-counter.service';
import { By } from '@angular/platform-browser';

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
  let hiddenCatServiceSpy: jasmine.SpyObj<HiddenCatService>;
  let hiddenCatCounterServiceSpy: jasmine.SpyObj<HiddenCatCounterService>;

  beforeEach(async () => {
    const spy1 = jasmine.createSpyObj('CatService', ['getAllRanked']);
    const spy2 = jasmine.createSpyObj('HiddenCatService', ['getRandomAppearance', 'getRandomAltitude']);
    const spy3 = jasmine.createSpyObj('HiddenCatCounterService', ['incrementHiddenCatCount']);

    await TestBed.configureTestingModule({
      imports: [GeneralRankingComponent, HttpClientModule],
      providers: [
        { provide: CatService, useValue: spy1 },
        { provide: HiddenCatService, useValue: spy2 },
        { provide: HiddenCatCounterService, useValue: spy3 }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralRankingComponent);
    component = fixture.componentInstance;
    catServiceSpy = TestBed.inject(CatService) as jasmine.SpyObj<CatService>;
    hiddenCatServiceSpy = TestBed.inject(HiddenCatService) as jasmine.SpyObj<HiddenCatService>;
    hiddenCatCounterServiceSpy = TestBed.inject(HiddenCatCounterService) as jasmine.SpyObj<HiddenCatCounterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadCats on init', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    const spyLoadCats = spyOn(component, 'loadCats');

    fixture.detectChanges();
    expect(spyLoadCats).toHaveBeenCalled();
  });

  it('should call getAllRanked method of service when calling loadCats', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    
    component.loadCats();
    expect(catServiceSpy.getAllRanked).toHaveBeenCalled();
  });

  it('should call computeHiddenCatAppearance on init', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    const spyComputeAppearance = spyOn(component, 'computeHiddenCatAppearance');

    fixture.detectChanges();
    expect(spyComputeAppearance).toHaveBeenCalled();
  });

  it('should not show Easter egg hidden cat if showHiddenCat is false', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    hiddenCatServiceSpy.getRandomAppearance.and.returnValue(false);

    fixture.detectChanges();
    const component = fixture.nativeElement as HTMLElement;

    const hiddenCatIcon = component.querySelector('.hidden-cat');
    expect(hiddenCatIcon).toBeNull(); 
  });

  it('should show Easter egg hidden cat if showHiddenCat is true', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    hiddenCatServiceSpy.getRandomAppearance.and.returnValue(true);

    fixture.detectChanges();
    const component = fixture.nativeElement as HTMLElement;

    const hiddenCatIcon = component.querySelector('.hidden-cat');
    expect(hiddenCatIcon).not.toBeNull(); 
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

  it('should set showHiddenCatMessage to true when calling findHiddenCat', () => {
    component.showHiddenCat = false;
    component.findHiddenCat();

    expect(component.showHiddenCat).toBeTrue();
  });

  it('should call incrementHiddenCatCount when calling findHiddenCat', () => {
    component.findHiddenCat();

    expect(hiddenCatCounterServiceSpy.incrementHiddenCatCount).toHaveBeenCalled();
  });

    it('should display message window when showHiddenCatMessage is true', () => {
    catServiceSpy.getAllRanked.and.returnValue(of(mockCats));
    fixture.detectChanges();

    component.showHiddenCatMessage = true;
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(By.css('.overlay'));
    expect(overlay).toBeTruthy();
  });
});
