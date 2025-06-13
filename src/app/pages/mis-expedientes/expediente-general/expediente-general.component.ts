import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpedientesService } from '../expedientes.service';
import { ExpedienteCiudadano } from '../../tasks/expediente.ciudadano.interface';
import { Tramite } from '../../tramites/tramite.interface';
import { TramitesService } from '../../tramites/tramites.service';
import { DataGeneral } from '../expedientes.interface';
import { DataGridComponent } from '../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-expediente-general',
  standalone: true,
  imports: [DataGridComponent],
  templateUrl: './expediente-general.component.html',
  styles: ``
})
export class ExpedienteGeneralComponent {
  expedienteId: string = '';
  dataExpediente: ExpedienteCiudadano = {} as ExpedienteCiudadano;
  dataTramite: Tramite = {} as Tramite;
  dataGeneral: DataGeneral[] = [];
  tituloTramite = '';
  constructor(
    private route: ActivatedRoute,
    private readonly expedienteService: ExpedientesService,
    private readonly tramiteService: TramitesService
  ) { }

  ngOnInit() {
    this.expedienteId = this.route.snapshot.parent?.paramMap.get('id') || '';
    this.getDataExp();
  }

  getDataExp() {
    this.expedienteService.findById(this.expedienteId).subscribe((res: ExpedienteCiudadano) => {
      this.dataExpediente = res;
      this.tituloTramite = this.dataExpediente.tramite.tramite;
      this.getDataTramite(this.dataExpediente.tramite.id);
    });
  }

  getDataTramite(id: string) {
    this.tramiteService.findOne(id).subscribe((res: Tramite) => {
      this.dataTramite = res;
    
      this.dataGeneral = JSON.parse(this.dataTramite.configuracion.init_data_labels).init;
      const tramiteData = JSON.parse(this.dataExpediente.tramite_data);
      for (let index = 0; index < this.dataGeneral.length; index++) {
        this.dataGeneral[index]['value'] = tramiteData[this.dataGeneral[index]['key']];       
      }
    });
  }


}
