import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cat } from '../model/cat.model';
import { CatService } from '../service/cat.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-general-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-ranking.component.html',
  styleUrls: ['./general-ranking.component.css']
})

export class GeneralRankingComponent {
  firstSpotCat: Cat | null = null;
  secondSpotCat: Cat | null = null;
  thirdSpotCat: Cat | null = null;
  bottomRankingCats: Cat[] = [];

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.catService.getAll().subscribe(data => {
      this.firstSpotCat = data[0];
      this.secondSpotCat = data[1];
      this.thirdSpotCat = data[2];
      this.bottomRankingCats = data.slice(3);
    });
  }

  
}
