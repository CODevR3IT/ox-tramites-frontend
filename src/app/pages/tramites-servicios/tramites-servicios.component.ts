import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioTramiteComponent } from '../inicio-tramite/inicio-tramite.component';
import { InicioServiciosComponent } from "../inicio-servicios/inicio-servicios.component";

@Component({
  selector: 'app-tramites-servicios',
  imports: [NgbNavModule, InicioTramiteComponent, InicioServiciosComponent],
  templateUrl: './tramites-servicios.component.html',
  styles: ``
})
export class TramitesServiciosComponent {
  active = 1;
}
