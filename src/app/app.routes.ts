import { Routes } from '@angular/router';
import { MainComponent } from './shared/scafold/main/main.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthComponent } from './shared/auth/auth.component';
import { ValidacionComponent } from './pages/validacion/validacion.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      { 
        path: 'registro', component: LandingComponent, data: {breadcrumb: 'Registro'},
      },
      { 
        path: 'validacion', component: ValidacionComponent, data: {breadcrumb: ''},
      },
      { 
        path: '', component: LoginComponent, data: {breadcrumb: 'login'},
      },
      { 
        path: 'login', component: LoginComponent, data: {breadcrumb: 'login'},
      },
      { 
        path: 'inicio', component: InicioComponent, data: {breadcrumb: 'Inicio'},
      },
      { 
        path: 'olvide-password', component: ForgotPasswordComponent, data: {breadcrumb: 'Olvide'},
      },
      { 
        path: 'cambio-pass', component: RestorePasswordComponent, data: {breadcrumb: 'Cambio'},
      }
    ],
  },
];
