import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BottomTabComponent } from './bottom-tab.component';
import { BattleCounterService } from '../service/battle-counter.service';

describe('BottomTabComponent', () => {
  let component: BottomTabComponent;
  let fixture: ComponentFixture<BottomTabComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let battleCounterServiceSpy: jasmine.SpyObj<BattleCounterService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    battleCounterServiceSpy = jasmine.createSpyObj('BattleCounterService', ['currentCount']);

    await TestBed.configureTestingModule({
      imports: [BottomTabComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: BattleCounterService, useValue: battleCounterServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call navigate with the right path when calling redirect', () => {
    component.redirectionPath = 'path';

    component.redirect();

    expect(routerSpy.navigate).toHaveBeenCalledWith([component.redirectionPath]);
  });
});
