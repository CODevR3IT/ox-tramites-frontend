import { Routes } from '@angular/router';
import { MainComponent } from './shared/scafold/main/main.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthComponent } from './shared/auth/auth.component';
import { ValidacionComponent } from './pages/validacion/validacion.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      { 
        path: '', component: LandingComponent, data: {breadcrumb: 'Inicio'},
      },
      { 
        path: 'validacion', component: ValidacionComponent, data: {breadcrumb: ''},
      },
      { 
        path: 'login', component: LoginComponent, data: {breadcrumb: ''},
      }
    ],
  },
];
