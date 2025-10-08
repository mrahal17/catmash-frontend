import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HiddenCatCounterService {
  private hiddenCatCountSubject = new BehaviorSubject<number>(0);
  hiddenCatCount = this.hiddenCatCountSubject.asObservable();

  incrementHiddenCatCount() {
    const currentCount = this.hiddenCatCountSubject.value;
    this.hiddenCatCountSubject.next(currentCount + 1);
  }

  decrementHiddenCatCount() {
    const currentCount = this.hiddenCatCountSubject.value;
    if (currentCount > 0) this.hiddenCatCountSubject.next(currentCount - 1);
    else console.warn('Tried to decrement with zero count');
  }

  get currentCount(): number {
    return this.hiddenCatCountSubject.value;
  }
}
