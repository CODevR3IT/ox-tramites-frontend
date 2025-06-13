import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpedientesService } from '../expedientes.service';
import { ExpedienteTrazabilidad } from '../expedientes.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expediente-trazabilidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expediente-trazabilidad.component.html',
  styles: ``
})
export class ExpedienteTrazabilidadComponent {
  expedienteId: string = '';
  dataTrazabilidad: ExpedienteTrazabilidad[] = [];
  constructor(
    private route: ActivatedRoute,
    private readonly expedienteService: ExpedientesService,
  ) { }

  ngOnInit() {
    this.expedienteId = this.route.snapshot.parent?.paramMap.get('id') || '';
    this.getData();
  }
  getData() {
    this.expedienteService.findTrazabilidad(this.expedienteId).subscribe((res: any) => {
      this.dataTrazabilidad = res;
    });
  }

}
