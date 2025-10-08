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

  get currentCount(): number {
    return this.hiddenCatCountSubject.value;
  }
}
