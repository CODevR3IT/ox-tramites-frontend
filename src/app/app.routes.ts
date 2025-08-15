import { Routes } from '@angular/router';
import { MainComponent } from './shared/scafold/main/main.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthComponent } from './shared/auth/auth.component';
import { ValidacionComponent } from './pages/validacion/validacion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisTramitesComponent } from './pages/mis-tramites/mis-tramites.component';
import { TramitesMarkdownComponent } from './pages/tramites-markdown/tramites-markdown.component';
import { authGuard } from './shared/auth/auth.guard';
import { ExpedienteViewComponent } from './pages/mis-expedientes/expediente-view/expediente-view.component';
import { ExpedienteGeneralComponent } from './pages/mis-expedientes/expediente-general/expediente-general.component';
import { ExpedienteOficiosComponent } from './pages/mis-expedientes/expediente-oficios/expediente-oficios.component';
import { ExpedienteTrazabilidadComponent } from './pages/mis-expedientes/expediente-trazabilidad/expediente-trazabilidad.component';
import { CompleteTaskComponent } from './pages/complete-task/complete-task.component';
import { TramitesComponent } from './pages/tramites/tramites.component';
import { SubtramitesComponent } from './pages/subtramites/subtramites.component';
import { ContribuyenteTramiteComponent } from './pages/contribuyente-tramite/contribuyente-tramite.component';
import { InicioTramiteComponent } from './pages/inicio-tramite/inicio-tramite.component';
import { InicioSubtramiteComponent } from './pages/inicio-subtramite/inicio-subtramite.component';
import { adminGuard } from './shared/auth/admin.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    canActivate: [authGuard],
    component: MainComponent,
    children: [
      /*{
        path: 'registro', component: LandingComponent,
      },
      {
        path: 'validacion', component: ValidacionComponent,
      },*/

      {
        path: 'tramites', component: TramitesComponent,canActivate: [adminGuard],
      },
      {
        path: 'subtramites', component: SubtramitesComponent,canActivate: [adminGuard],
      },
      /*{
        path: 'contribuyente-tramite', component: ContribuyenteTramiteComponent,
      },*/
      
      /*{
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
      },*/
      {
        path: 'inicio-tramite', component: InicioTramiteComponent,
      },
      {
        path: 'inicio-subtramite/:id', component: InicioSubtramiteComponent,
      }
    ],
  },
];
