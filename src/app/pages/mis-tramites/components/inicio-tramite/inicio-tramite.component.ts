import { Component } from '@angular/core';
import { MisTramitesService } from '../../mis-tramites.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CamundaComponent, CamundaForm } from '../../../../shared/components/camunda-form/camunda-form.interface';
import { CamundaFormComponent } from '../../../../shared/components/camunda-form/camunda-form.component';
import { Tramite } from '../../interfaces/tramites.interface';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CitaComponent } from '../../../../shared/components/cita/cita.component';
import { CitaConfig } from '../../../../shared/components/cita/cita.interface';
import { fireSwal } from '../../../../shared/helpers/alert.helper';

@Component({
  selector: 'app-inicio-tramite',
  standalone: true,
  imports: [CamundaFormComponent, CitaComponent],
  templateUrl: './inicio-tramite.component.html',
  styles: ``,
})
export class InicioTramiteComponent {

  idTramite: string = '';
  cargaComponents: boolean = false;
  camundaComponents: CamundaComponent[] = [];

  minDate: NgbDateStruct = {} as NgbDateStruct;
  maxDate: NgbDateStruct = {} as NgbDateStruct;
  tramite: Tramite = {} as Tramite;
  citaConfig: CitaConfig = {} as CitaConfig;
  date: string = '';
  time: string = '';

  constructor(
    private readonly misTramitesService: MisTramitesService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
  }


  ngOnInit(): void {
    this.idTramite = this.activateRoute.snapshot.paramMap.get('id') || '';
    this.misTramitesService.findById(this.idTramite).subscribe((res) => {
      this.tramite = res;
    });
    this.misTramitesService.findAvailableDate(this.idTramite).subscribe((res) => {
      this.minDate = this.misTramitesService.dateToNgbDateStruct(res.minDate);
      this.maxDate = this.misTramitesService.dateToNgbDateStruct(res.maxDate);
      this.citaConfig.minDate = this.misTramitesService.dateToNgbDateStruct(res.minDate);
      this.citaConfig.maxDate = this.misTramitesService.dateToNgbDateStruct(res.maxDate);
      this.citaConfig.disabledWeekDays = res.disabledWeekDays;
      this.citaConfig.holidays = res.holidays.map((x: any) => this.misTramitesService.dateToNgbDateStruct(x));
      this.citaConfig.availableDays = res.availableDays.map((x: any) => ({
        fecha: this.misTramitesService.dateToNgbDateStruct(x.fecha),
        disponibles: x.disponibles
      }));
      console.log(this.citaConfig);
    });
    this.misTramitesService.findStartForm(this.idTramite).subscribe((res: CamundaForm) => {
      this.camundaComponents = res.components;
      this.cargaComponents = true;
    });
  }

  onSubmit(event: any): void {
    if (this.tramite.is_cita && !this.date && !this.time) {
      fireSwal('¡Atención!', 'Debe seleccionar una cita para continuar.', 'warning');
      return;
    }
    this.misTramitesService.definitionSubmitForm(this.idTramite, { data: event, date: this.date, time: this.time }).subscribe((res) => {
      this.router.navigate(['/']);
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  getCita(event: { fecha: string, hora: string }) {
    this.date = event.fecha;
    this.time = event.hora;
  }




}
