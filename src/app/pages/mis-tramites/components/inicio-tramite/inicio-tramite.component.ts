import { Component } from '@angular/core';
import { MisTramitesService } from '../../mis-tramites.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CamundaComponent, CamundaForm } from '../../../../shared/components/camunda-form/camunda-form.interface';
import { CamundaFormComponent } from '../../../../shared/components/camunda-form/camunda-form.component';
import { Tramite } from '../../interfaces/tramites.interface';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CitaComponent } from '../../../../shared/components/cita/cita.component';
import { CitaConfig } from '../../../../shared/components/cita/cita.interface';

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
      this.minDate = this.misTramitesService.dateToNgbDateStruct( new Date(res.minDate));
      this.maxDate = this.misTramitesService.dateToNgbDateStruct( new Date(res.maxDate));
      this.citaConfig.minDate = new Date(res.minDate);
      this.citaConfig.maxDate = new Date(res.maxDate);
      this.citaConfig.disabledWeekDays = res.disabledWeekDays;
      this.citaConfig.holidays = res.holidays.map((x: any) => new Date(x));
      this.citaConfig.availableDays = res.availableDays.map((x: any) => ({
        fecha: new Date(x.fecha),
        disponibles: x.disponibles
      }));
    });
    this.misTramitesService.findStartForm(this.idTramite).subscribe((res: CamundaForm) => {
      this.camundaComponents = res.components;
      this.cargaComponents = true;
    });
  }

  onSubmit(event: any): void {
    this.misTramitesService.definitionSubmitForm(this.idTramite, event).subscribe((res) => {
      this.router.navigate(['/']);
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }




}
