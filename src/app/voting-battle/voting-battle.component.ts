import { Component } from '@angular/core';
import { Cat } from '../model/cat.model';
import { CommonModule } from '@angular/common';
import { BattleCounterService } from '../service/battle-counter.service';
import { CatService } from '../service/cat.service';
import { Router } from '@angular/router';
import { BottomTabComponent } from '../bottom-tab/bottom-tab.component';
import { HeaderComponent } from '../header/header.component';
import { HiddenCatCounterService } from '../service/hidden-cat-counter.service';
import { FormsModule } from '@angular/forms';
import { HiddenCatCounter } from "../hidden-cat-counter/hidden-cat-counter.component";

@Component({
  selector: 'app-voting-battle',
  standalone: true,
  imports: [CommonModule, BottomTabComponent, HeaderComponent, FormsModule, HiddenCatCounter],
  templateUrl: './voting-battle.component.html',
  styleUrl: './voting-battle.component.css'
})

export class VotingBattleComponent {
  firstContender: Cat | null = null;
  secondContender: Cat | null = null;
  contenders: Cat[] = [];
  showEndOfBattleSessionMessage: boolean = false;
  infiniteMode: boolean = false;

  useBooster: boolean = false;

  bottomTabMessage: string = "Voir le classement des chats";
  bottomTabRedirectionPath: string = "/general-ranking";

  constructor(private catService: CatService, private router: Router,
    private battleCounterService: BattleCounterService,
    private hiddenCatCounterService: HiddenCatCounterService
  ) {}

  ngOnInit() {
    this.setUpBattleSession();
  }

  setUpBattleSession() {
    this.catService.getAll().subscribe(data => {
      if (data.length >= 2) {
        this.contenders = data;
        this.shuffleContenders();
        this.handleNextBattle();
      }
    });
  }

  handleNextBattle() {
    if (this.infiniteMode) this.handleNextBattleInfiniteMode();
    else this.handleNextBattleFiniteMode();
  }

  handleNextBattleInfiniteMode() {
    this.shuffleContenders();
    this.firstContender = this.contenders[0];
    this.secondContender = this.contenders[1];
  }

  handleNextBattleFiniteMode() {
    if (this.contenders.length >= 2) {
      this.firstContender = this.contenders.pop()!;
      this.secondContender = this.contenders.pop()!;
    } else {
      this.showEndOfBattleSessionMessage = true;
    }
  }
  
  shuffleContenders() {
    this.contenders = [...this.contenders].sort(() => Math.random() - 0.5);
  }

  registerVote(id: string | undefined) {
    if (id) {
      if (this.useBooster) this.registerBoosterVote(id);
      else this.registerSimpleVote(id);
    } else {
      console.warn('No id provided when voting.')
    }
  }

  registerSimpleVote(id: string) {
    this.catService.incrementNumberOfVotes(id).subscribe(() => {
        this.battleCounterService.incrementBattleCount();
        this.handleNextBattle();
    });
  }

  registerBoosterVote(id: string) {
    this.catService.incrementNumberOfVotes(id, 5).subscribe(() => {
      this.battleCounterService.incrementBattleCount();
      this.hiddenCatCounterService.decrementHiddenCatCount();
      this.useBooster = false;
      this.handleNextBattle();
    });
  }

  goToRanking() {
    this.router.navigate(['/general-ranking']);
  }

  resumeInfiniteMode() {
    this.showEndOfBattleSessionMessage = false;
    this.infiniteMode = true;
    this.setUpBattleSession();
  }

  get hiddenCatCount() {
    return this.hiddenCatCounterService.currentCount;
  }

  hasBoosters() {
    return this.hiddenCatCount > 0;
  }
}