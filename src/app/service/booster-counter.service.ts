import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoosterCounterService {
  private boosterCountSubject = new BehaviorSubject<number>(0);
  boosterCount = this.boosterCountSubject.asObservable();

  incrementBoosterCount() {
    const currentCount = this.boosterCountSubject.value;
    this.boosterCountSubject.next(currentCount + 1);
  }

  decrementBoosterCount() {
    const currentCount = this.boosterCountSubject.value;
    if (currentCount > 0) this.boosterCountSubject.next(currentCount - 1);
    else console.warn('Tried to decrement with zero count');
  }

  get currentCount(): number {
    return this.boosterCountSubject.value;
  }
}
