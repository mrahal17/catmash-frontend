import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HiddenCatService {
    
  getRandomAppearance() {
    return Math.random() > 0.75;
  }  

  getRandomPositionStyle() {
    const altitude = this.getRandomAltitude();
    const isOnTheLeft = this.getRandomSide();
    const isOnTheRight = !isOnTheLeft;
    return `top: ${altitude}rem; left: ${isOnTheLeft ? '-22px' : 'auto'}; right: ${isOnTheRight ? '-22px' : 'auto'};`;
  }

  getRandomAltitude() {
    return Math.floor(Math.random() * 200);
  }

  getRandomSide() {
    return Math.random() > 0.5;
  }
}
