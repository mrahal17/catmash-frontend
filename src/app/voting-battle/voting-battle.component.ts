import { Component } from '@angular/core';
import { Cat } from '../model/cat.model';
import { CommonModule } from '@angular/common';
import { CatService } from '../service/cat.service';

@Component({
  selector: 'app-voting-battle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voting-battle.component.html',
  styleUrl: './voting-battle.component.css'
})

export class VotingBattleComponent {
  firstContender: Cat | null = null;
  secondContender: Cat | null = null;
  contenders: Cat[] = [];

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.catService.getAll().subscribe(data => {
      this.contenders = data;
      this.firstContender = data[0];
      this.secondContender = data[1];
    });
  }

  registerVote(id: string | undefined) {
    if (!id) { return; }
    this.catService.incrementNumberOfVotes(id).subscribe()
  }
}