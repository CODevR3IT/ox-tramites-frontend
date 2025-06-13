import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpedientesService } from '../expedientes.service';
import { OficioExpediente } from '../expedientes.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-expediente-oficios',
  imports: [],
  templateUrl: './expediente-oficios.component.html',
  styles: ``
})
export class ExpedienteOficiosComponent {
  expedienteId: string = '';
  dataOficios: OficioExpediente[] = [];
  downloadEndpoint = environment.api + '/oficios/file/';
  constructor(
    private route: ActivatedRoute,
    private readonly expedienteService: ExpedientesService,
  ) { }

  ngOnInit() {
    this.expedienteId = this.route.snapshot.parent?.paramMap.get('id') || '';
    this.getData();
  }
  getData() {
    this.expedienteService.findOficios(this.expedienteId).subscribe((res: any) => {
      this.dataOficios = res;

    });
  }
}
