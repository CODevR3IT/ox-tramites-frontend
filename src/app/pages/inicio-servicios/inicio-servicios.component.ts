import { Component } from '@angular/core';
import { TramitesService } from '../../shared/services/tramites.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-servicios',
  imports: [FormsModule, CommonModule,NgbAccordionModule, RouterLink],
  templateUrl: './inicio-servicios.component.html',
  styles: ``
})
export class InicioServiciosComponent {
 payload: any = {};
  catServicios: any;
  filterText: string = '';
  servicios: any[] = [];
  constructor(
    private tramitesservice: TramitesService,
  
  ) {

  }

  ngOnInit() {
    this.getTramitesSubtramites();
  }

  get serviciosFiltrados(): any[] {
    const quitarAcentos = (texto: string) =>
      texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    if (!this.filterText.trim()) {
      return this.servicios;
    }
    const filtro = quitarAcentos(this.filterText);

    return this.servicios
      .map(cat => ({
        ...cat,
        subtramites: cat.subtramites?cat.subtramites.filter((subtramite: any) =>
          quitarAcentos(subtramite.descripcion).includes(filtro)
        ):[]
      }))
      .filter(cat => cat.subtramites.length > 0);
  }

  getTramitesSubtramites() {
    this.tramitesservice.getTramitesSubtramites().subscribe(
      {
        next: (res: any) => {
          console.log("TRAMITES!!!!!!!");
          this.servicios = res;
          console.log(this.servicios);
        },
      }
    );
  }
}
