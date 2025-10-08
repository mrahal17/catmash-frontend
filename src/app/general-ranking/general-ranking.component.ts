import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cat } from '../model/cat.model';
import { CatService } from '../service/cat.service';
import { BottomTabComponent } from '../bottom-tab/bottom-tab.component';
import { HeaderComponent } from '../header/header.component';
import { HiddenCatCounterService } from '../service/hidden-cat-counter.service';
import { HiddenCatService } from '../service/hidden-cat.service';

@Component({
  selector: 'app-general-ranking',
  standalone: true,
  imports: [CommonModule, BottomTabComponent, HeaderComponent],
  templateUrl: './general-ranking.component.html',
  styleUrls: ['./general-ranking.component.css']
})

export class GeneralRankingComponent {
  firstSpot: Cat | null = null;
  secondSpot: Cat | null = null;
  thirdSpot: Cat | null = null;
  bottomSpots: Cat[] = [];

  bottomTabMessage: string = "Revenir au vote";
  bottomTabRedirectionPath: string = "/voting-battle";

  showHiddenCat: boolean = false;
  altitudeHiddenCat: number = 0;
  showHiddenCatMessage: boolean = false;

  constructor(private catService: CatService,
    private hiddenCatCounterService: HiddenCatCounterService,
    private hiddenCatService: HiddenCatService) {}

  ngOnInit() {
    this.loadCats();
    this.computeHiddenCatAppearance();
  }

  loadCats() {
    this.catService.getAllRanked().subscribe(data => {
      this.firstSpot = data[0];
      this.secondSpot = data[1];
      this.thirdSpot = data[2];
      this.bottomSpots = data.slice(3);
    });
  }

  computeHiddenCatAppearance() {
    this.showHiddenCat = this.hiddenCatService.getRandomAppearance();
    if (this.showHiddenCat) this.altitudeHiddenCat = this.hiddenCatService.getRandomAltitude();
  }

  get hiddenCatCount() {
    return this.hiddenCatCounterService.currentCount;
  }

  findHiddenCat() {
    this.showHiddenCatMessage = true;
    this.hiddenCatCounterService.incrementHiddenCatCount();
  }

  closePopUpWindow() {
    this.showHiddenCatMessage = false;
    this.showHiddenCat = false;
  }
}
