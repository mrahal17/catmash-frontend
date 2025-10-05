import { bootstrapApplication } from '@angular/platform-browser';
import { GeneralRankingComponent } from './app/general-ranking/general-ranking.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(GeneralRankingComponent, {
  providers: [
    provideHttpClient()
  ]
});