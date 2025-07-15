import { Component, Input } from '@angular/core';
import { Categoria } from './interfaces/tramites.interface';
import { MisTramitesService } from './mis-tramites.service';
import { RouterLink } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-tramites',
  standalone: true,
  imports: [RouterLink, NgbAccordionModule, CommonModule, FormsModule],
  templateUrl: './mis-tramites.component.html',
  styles: ``
})
export class MisTramitesComponent {
  @Input() categorias: Categoria[] = [];
  fileEndpoint = environment.fileEndpoint + '/files/';
    filterText = '';
  constructor(
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
