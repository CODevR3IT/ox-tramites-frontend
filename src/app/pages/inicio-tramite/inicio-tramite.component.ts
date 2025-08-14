import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TramitesService } from '../../shared/services/tramites.service';
import Swal from 'sweetalert2';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-tramite',
  imports: [CommonModule, NgbAccordionModule, RouterLink, FormsModule],
  templateUrl: './inicio-tramite.component.html',
  styleUrl: './inicio-tramite.component.scss'
})
export class InicioTramiteComponent {
  payload: any = {};
  catTramite: any;
  filterText: string = '';
  tramites: any[] = [];
  constructor(
    private tramitesservice: TramitesService,
    private spinner: NgxSpinnerService,
  ) {

  }

  ngOnInit() {
    this.getTramitesSubtramites();
  }

  get tramitesFiltrados(): any[] {
    const quitarAcentos = (texto: string) =>
      texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    if (!this.filterText.trim()) {
      return this.tramites;
    }
    const filtro = quitarAcentos(this.filterText);

    return this.tramites
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
          this.tramites = res;
          console.log(this.tramites);
        },
      }
    );
  }
}
