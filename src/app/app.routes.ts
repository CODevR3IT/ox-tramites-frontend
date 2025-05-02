import { Routes } from '@angular/router';
import { MainComponent } from './shared/scafold/main/main.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthComponent } from './shared/auth/auth.component';
import { ValidacionComponent } from './pages/validacion/validacion.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';
import { MisTramitesComponent } from './pages/mis-tramites/mis-tramites.component';
import { InicioTramiteComponent } from './pages/mis-tramites/components/inicio-tramite/inicio-tramite.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      { 
        path: 'registro', component: LandingComponent,
      },
      { 
        path: 'validacion', component: ValidacionComponent,
      },
      { 
        path: '', component: LoginComponent,
      },
      { 
        path: 'login', component: LoginComponent,
      },
      { 
        path: 'inicio', component: InicioComponent, data: {breadcrumb: 'Inicio'},
      },
      { 
        path: 'olvide-password', component: ForgotPasswordComponent,
      },
      { 
        path: 'cambio-pass', component: RestorePasswordComponent,
      },
      { 
        path: 'mis-tramites', component: MisTramitesComponent, data: {breadcrumb: 'Mis trámites'},
      },
      { 
        path: 'inicio-tramite/:id', component: InicioTramiteComponent, data: {breadcrumb: 'Inicio trámite'},
      }
    ],
  },
];
