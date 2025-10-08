import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HiddenCatService {
    
  getRandomAppearance() {
    return Math.random() > 0.75;
  }  

  getRandomAltitude() {
    return Math.floor(Math.random() * 200);
  }
}
