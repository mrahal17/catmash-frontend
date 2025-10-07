import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VotingBattleComponent } from './voting-battle.component';
import { CatService } from '../service/cat.service';
import { Router } from '@angular/router';
import { Cat } from '../model/cat.model';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { BattleCounterService } from '../service/battle-counter.service';

describe('VotingBattleComponent', () => {
  let component: VotingBattleComponent;
  let fixture: ComponentFixture<VotingBattleComponent>;
  let catServiceSpy: jasmine.SpyObj<CatService>;
  let battleCounterServiceSpy: jasmine.SpyObj<BattleCounterService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockCats: Cat[] = [
    { id: '1', url: 'url1', numberOfVotes: 10 },
    { id: '2', url: 'url2', numberOfVotes: 5 },
    { id: '3', url: 'url3', numberOfVotes: 18 }
  ];

  beforeEach(async () => {
    catServiceSpy = jasmine.createSpyObj('CatService', ['getAll', 'incrementNumberOfVotes']);
    battleCounterServiceSpy = jasmine.createSpyObj('BattleCounterService', ['incrementBattleCount']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [VotingBattleComponent, HttpClientModule],
      providers: [
        { provide: CatService, useValue: catServiceSpy },
        { provide: BattleCounterService, useValue: battleCounterServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VotingBattleComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service when calling setUpBattleSession', () => {
    catServiceSpy.getAll.and.returnValue(of(mockCats));

    component.setUpBattleSession();
    expect(catServiceSpy.getAll).toHaveBeenCalled();
  });

  it('should call handleNextBattle when calling setUpBattleSession in finite mode', () => {
    catServiceSpy.getAll.and.returnValue(of(mockCats));
    const spyHandleNextBattle = spyOn(component, 'handleNextBattle');

    component.setUpBattleSession();

    expect(spyHandleNextBattle).toHaveBeenCalled();
  });

  it('should call handleNextBattleFiniteMode when calling handleNextBattle in finite mode', () => {
    const spyHandleNextBattleFiniteMode = spyOn(component, 'handleNextBattleFiniteMode');

    component.infiniteMode = false;
    component.handleNextBattle();

    expect(spyHandleNextBattleFiniteMode).toHaveBeenCalled();
  });

  it('should call handleNextBattleInfiniteMode when calling setUpBattleSession in infinite mode', () => {
    const spyHandleNextBattleInfiniteMode = spyOn(component, 'handleNextBattleInfiniteMode');

    component.infiniteMode = true;
    component.handleNextBattle();

    expect(spyHandleNextBattleInfiniteMode).toHaveBeenCalled();
  });

  it('should set current contenders when calling handleNextBattleFiniteMode', () => {
    component.contenders = [...mockCats];

    component.handleNextBattleFiniteMode();
    expect(component.firstContender).not.toBeNull();
    expect(component.secondContender).not.toBeNull();
  });

  it('should set current contenders when calling handleNextBattleInfiniteMode', () => {
    component.contenders = mockCats;

    component.handleNextBattleInfiniteMode();
    expect(component.firstContender).not.toBeNull();
    expect(component.secondContender).not.toBeNull();
  });

  it('should dequeue the list of contenders when calling handleNexBattleFiniteMode', () => {
    component.contenders = [...mockCats];
    spyOn(component, 'shuffleContenders').and.callFake(() => {});

    component.handleNextBattleFiniteMode();
    expect(component.contenders.length).toEqual(mockCats.length - 2);
  });

  it('should call registerVote with first contender id when clicking the left button', () => {
    catServiceSpy.getAll.and.returnValue(of(mockCats));
    const spyRegister = spyOn(component, 'registerVote');

    fixture.detectChanges();

    const componentTemplate = fixture.nativeElement as HTMLElement;
    const leftBattleCard = componentTemplate.querySelector('.battle-card.left');
    expect(leftBattleCard).not.toBeNull();

    const voteButtonDiv = leftBattleCard?.querySelector('.vote-button');
    expect(voteButtonDiv).not.toBeNull();

    voteButtonDiv!.dispatchEvent(new Event('click'));

    expect(spyRegister).toHaveBeenCalledWith(component.firstContender?.id);
  });

  it('should call registerVote with second contender id when clicking the right button', () => {
    catServiceSpy.getAll.and.returnValue(of(mockCats));
    const spyRegister = spyOn(component, 'registerVote');

    fixture.detectChanges();

    const componentTemplate = fixture.nativeElement as HTMLElement;
    const rightBattleCard = componentTemplate.querySelector('.battle-card.right');
    expect(rightBattleCard).not.toBeNull();

    const voteButtonDiv = rightBattleCard?.querySelector('.vote-button');
    expect(voteButtonDiv).not.toBeNull();

    voteButtonDiv!.dispatchEvent(new Event('click'));

    expect(spyRegister).toHaveBeenCalledWith(component.secondContender?.id);
  });

  it('should call incrementNumberOfVotes when calling registerVote', () => {
    const mockId = '123';
    catServiceSpy.incrementNumberOfVotes.and.returnValue(of(''));

    component.registerVote(mockId);

    expect(catServiceSpy.incrementNumberOfVotes).toHaveBeenCalledWith(mockId);
  });

  it('should call incrementBattleCount when calling registerVote', () => {
    const mockId = '123';
    catServiceSpy.incrementNumberOfVotes.and.returnValue(of(''));

    component.registerVote(mockId);

    expect(battleCounterServiceSpy.incrementBattleCount).toHaveBeenCalled();
  });

  it('should display message window when showEndOfBattleSessionMessage is true', () => {
    catServiceSpy.getAll.and.returnValue(of(mockCats));
    fixture.detectChanges();

    component.showEndOfBattleSessionMessage = true;
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(By.css('.overlay'));
    expect(overlay).toBeTruthy();
  });

  it('should navigate to general ranking when goToRanking is called', () => {
    component.goToRanking();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/general-ranking']);
  });

  it('should resume the session in infinite mode when resumeInfiniteMode is called', () => {
    catServiceSpy.getAll.and.returnValue(of(mockCats));

    component.resumeInfiniteMode();

    expect(catServiceSpy.getAll).toHaveBeenCalled();
    expect(component.infiniteMode).toBeTrue();
  });
});
