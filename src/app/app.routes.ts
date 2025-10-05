import { Routes } from '@angular/router';
import { GeneralRankingComponent } from './general-ranking/general-ranking.component';
import { VotingBattleComponent } from './voting-battle/voting-battle.component';

export const routes: Routes = [
  { path: '', component: GeneralRankingComponent, pathMatch: 'full' },
  { path: 'general-ranking', component: GeneralRankingComponent },
  { path: 'voting-battle', component: VotingBattleComponent },
  { path: '**', redirectTo: '' }
];