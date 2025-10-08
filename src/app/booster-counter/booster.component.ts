import { Component } from '@angular/core';
import { BoosterCounterService } from '../service/booster-counter.service';

@Component({
  selector: 'app-booster-counter',
  standalone: true,
  template: `
  <div class="top-booster-counter">
    <img src="assets/icons/hidden-cat-icon.png"/><strong>x{{ boosterCount }}</strong> booster(s)
  </div>`,
  styleUrls: ['./booster-counter.component.css']
})

export class BoosterCounter {
  constructor(private boosterCounterService: BoosterCounterService) {}

  get boosterCount() {
    return this.boosterCounterService.currentCount;
  }
}
