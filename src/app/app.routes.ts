import { Routes } from '@angular/router';
import { MainComponent } from './shared/scafold/main/main.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{ path: '', component: LandingComponent }],
  },
];
