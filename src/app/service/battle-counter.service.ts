import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BattleCounterService {
  private battleCountSubject = new BehaviorSubject<number>(0);
  battleCount = this.battleCountSubject.asObservable();

  incrementBattleCount() {
    const currentCount = this.battleCountSubject.value;
    this.battleCountSubject.next(currentCount + 1);
  }

  get currentCount(): number {
    return this.battleCountSubject.value;
  }
}
