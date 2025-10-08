import { Component } from '@angular/core';
import { HiddenCatCounterService } from '../service/hidden-cat-counter.service';

@Component({
  selector: 'app-hidden-cat-counter',
  standalone: true,
  template: `
  <div class="top-hidden-cat-counter">
    <img src="assets/icons/hidden-cat-icon.png"/><strong>x{{ hiddenCatCount }}</strong> booster(s)
  </div>`,
  styleUrls: ['./hidden-cat-counter.component.css']
})

export class HiddenCatCounter {
  constructor(private hiddenCatCounterService: HiddenCatCounterService) {}

  get hiddenCatCount() {
    return this.hiddenCatCounterService.currentCount;
  }
}
