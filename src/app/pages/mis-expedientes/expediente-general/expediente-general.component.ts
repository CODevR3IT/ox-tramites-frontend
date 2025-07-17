import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataGridComponent } from '../../../shared/components/data-grid/data-grid.component';
import { DataGeneral, Expediente, Tramite } from '../expedientes.interface';
import { ExpedientesService } from '../expedientes.service';
import { TramitesService } from '../tramites.service';

@Component({
  selector: 'app-expediente-general',
  standalone: true,
  imports: [DataGridComponent],
  templateUrl: './expediente-general.component.html',
  styles: ``
})
export class ExpedienteGeneralComponent {
  expedienteId: string = '';
  dataExpediente: Expediente = {} as Expediente;
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
    this.expedienteService.findById(this.expedienteId).subscribe((res: Expediente) => {
      this.dataExpediente = res;
      this.tituloTramite = this.dataExpediente.tramite.tramite;
      this.getDataTramite(this.dataExpediente.tramite.id);
    });
  }

  getDataTramite(id: string) {
    this.tramiteService.findOne(id).subscribe((res: Tramite) => {
      this.dataTramite = res;
      this.dataGeneral = this.dataExpediente.tramite_data;
    });
  }


}
