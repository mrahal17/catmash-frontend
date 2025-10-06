import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cat } from '../model/cat.model';
import { CatService } from '../service/cat.service';

@Component({
  selector: 'app-general-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-ranking.component.html',
  styleUrls: ['./general-ranking.component.css']
})

export class GeneralRankingComponent {
  firstSpot: Cat | null = null;
  secondSpot: Cat | null = null;
  thirdSpot: Cat | null = null;
  bottomSpots: Cat[] = [];

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.catService.getAllRanked().subscribe(data => {
      this.firstSpot = data[0];
      this.secondSpot = data[1];
      this.thirdSpot = data[2];
      this.bottomSpots = data.slice(3);
    });
  }
}
