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
import { TramitesMarkdownComponent } from './pages/tramites-markdown/tramites-markdown.component';
import { authGuard } from './shared/auth/auth.guard';
import { ExpedienteViewComponent } from './pages/mis-expedientes/expediente-view/expediente-view.component';
import { ExpedienteGeneralComponent } from './pages/mis-expedientes/expediente-general/expediente-general.component';
import { ExpedienteOficiosComponent } from './pages/mis-expedientes/expediente-oficios/expediente-oficios.component';
import { ExpedienteTrazabilidadComponent } from './pages/mis-expedientes/expediente-trazabilidad/expediente-trazabilidad.component';
import { CompleteTaskComponent } from './pages/complete-task/complete-task.component';

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
        path: 'inicio', component: InicioComponent, canActivate: [authGuard],
      },
      {
        path: 'expediente/:id',
        component: ExpedienteViewComponent,
        children: [
          {
            path: 'general',
            data: { breadcrumb: 'General' },
            component: ExpedienteGeneralComponent,
          },
          {
            path: 'oficios',
            data: { breadcrumb: 'Oficios' },
            component: ExpedienteOficiosComponent,
          },
          {
            path: 'trazabilidad',
            data: { breadcrumb: 'Trazabilidad' },
            component: ExpedienteTrazabilidadComponent,
          },
          { path: '', redirectTo: 'general', pathMatch: 'full' },
        ],
      },
       {
        path: 'tarea/:id',
        component: CompleteTaskComponent,
        data: { breadcrumb: 'Tarea' },
        canActivate: [authGuard],
      },
      {
        path: 'olvide-password', component: ForgotPasswordComponent,
      },
      {
        path: 'cambio-pass', component: RestorePasswordComponent,
      },
      {
        path: 'inicio-tramite/:id', component: InicioTramiteComponent, data: { breadcrumb: 'Inicio trámite' },
      },
      {
        path: 'tramite/info/:id', component: TramitesMarkdownComponent,
      }
    ],
  },
];
