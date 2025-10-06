import { Component, Input } from '@angular/core';
import { BattleCounterService } from '../service/battle-counter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-tab',
  standalone: true,
  templateUrl: './bottom-tab.component.html',
  styleUrls: ['./bottom-tab.component.css']
})

export class BottomTabComponent {
  @Input() message: string = '';
  @Input() redirectionPath: string = '';

  constructor(private router: Router, private battleCounterService: BattleCounterService) {}
  
  get battleCount() {
    return this.battleCounterService.currentCount;
  }

  redirect() {
    this.router.navigate([this.redirectionPath]);
  }
}
