import { Routes } from '@angular/router';
import { MainComponent } from './shared/scafold/main/main.component';
import { AuthComponent } from './shared/auth/auth.component';
import { authGuard } from './shared/auth/auth.guard';
import { TramitesComponent } from './pages/tramites/tramites.component';
import { SubtramitesComponent } from './pages/subtramites/subtramites.component';
import { InicioSubtramiteComponent } from './pages/inicio-subtramite/inicio-subtramite.component';
import { adminGuard } from './shared/auth/admin.guard';
import { TramitesServiciosComponent } from './pages/tramites-servicios/tramites-servicios.component';

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
        path: 'tramites-servicios', component: TramitesServiciosComponent,
      },
      {
        path: 'inicio-subtramite/:id', component: InicioSubtramiteComponent,
      }
    ],
  },
];
