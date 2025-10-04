import { Routes } from '@angular/router';
import { GeneralRankingComponent } from './general-ranking/general-ranking.component';

export const routes: Routes = [
  { path: '', component: GeneralRankingComponent },     
  { path: 'general-ranking', component: GeneralRankingComponent },
  { path: '**', redirectTo: '' }               
];