import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralRankingComponent } from './general-ranking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CatService } from '../service/cat.service';

describe('GeneralRankingComponent', () => {
  let component: GeneralRankingComponent;
  let fixture: ComponentFixture<GeneralRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeneralRankingComponent, HttpClientTestingModule],
      providers: [CatService]
    });
    fixture = TestBed.createComponent(GeneralRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
