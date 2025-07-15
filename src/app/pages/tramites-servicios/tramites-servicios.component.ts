import { Component, Input } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from '../mis-tramites/interfaces/tramites.interface';
import { MisTramitesService } from '../mis-tramites/mis-tramites.service';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tramites-servicios',
  imports: [NgbAccordionModule,RouterLink, FormsModule],
  templateUrl: './tramites-servicios.component.html',
  styles: ``
})
export class TramitesServiciosComponent {
  @Input() categorias: Categoria[] = [];
  fileEndpoint = environment.fileEndpoint + '/files/';
  filterText = '';
  constructor(
    private readonly misTramitesService: MisTramitesService,
  ) { }

  ngOnInit(): void {
  }
    get categoriasFiltradas(): Categoria[] {
     const quitarAcentos = (texto: string) =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  if (!this.filterText.trim()) {
    return this.categorias;
  }
  const filtro = quitarAcentos(this.filterText);

  return this.categorias
    .map(cat => ({
      ...cat,
      tramites: cat.tramites.filter(tramite =>
        quitarAcentos(tramite.tramite).includes(filtro)
      )
    }))
    .filter(cat => cat.tramites.length > 0);
  }
}