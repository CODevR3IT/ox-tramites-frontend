import { Component, Input } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerEsI18n } from '../../i18n/ngb-datepicker-es';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleDateAdapter, SimpleDateParserFormatter } from '../camunda-form/camunda-form-component/simple-date.adapter';
import { MisTramitesService } from '../../../pages/mis-tramites/mis-tramites.service';
import { Tramite } from '../../../pages/mis-expedientes/expedientes.interface';
import { CitaConfig } from './cita.interface';

@Component({
  selector: 'app-cita',
  imports: [NgbDatepickerModule, FormsModule, CommonModule],
  templateUrl: './cita.component.html',
  styles: ``,
  providers: [
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerEsI18n },
    { provide: NgbDateAdapter, useClass: SimpleDateAdapter },
    { provide: NgbDateParserFormatter, useClass: SimpleDateParserFormatter },
  ]
})
export class CitaComponent {
  isDisabled: (date: NgbDateStruct) => boolean;
  @Input() idTramite: string = '';
  @Input() citaConfig: CitaConfig = {} as CitaConfig;
  @Input() minDate: NgbDateStruct = {} as NgbDateStruct;
  @Input() maxDate: NgbDateStruct = {} as NgbDateStruct;
  date: string = '';
  time: string = '';
  availableTimes: string[] = [];
  constructor(
    private calendar: NgbCalendar,
    private readonly misTramitesService: MisTramitesService
  ) {
    this.isDisabled = (
      date: NgbDateStruct
    ) => {
      return  this.citaConfig.holidays.find((x: any) =>
        (new NgbDate(x.year, x.month, x.day).equals(date)) || 
        (this.citaConfig.disabledWeekDays.includes(calendar.getWeekday(new NgbDate(date.year, date.month, date.day)))) || 
        this.getDisponibles(date) === 0
      )
        ? true
        : false;
    };
  }
  getEstadoDia(date: NgbDateStruct): 'verde' | 'amarillo' | 'rojo' {
    const disponibles = this.getDisponibles(date); // Implementa esta función según tu lógica
    if (disponibles === 0) return 'rojo';
    if (disponibles < 5) return 'amarillo';
    return 'verde';
  }

  getDisponibles(date: NgbDateStruct): number {

    const fechaDisponible = this.citaConfig.availableDays.find(d => {
      const de = this.misTramitesService.dateToNgbDateStruct(d.fecha);
      return de.year === date.year && de.month === date.month && de.day === date.day;
    });
    return fechaDisponible?.disponibles || 0;
  }

  findAvailableTime() {
    this.misTramitesService.findAvailableTime(this.date, this.idTramite).subscribe(res => {
      this.availableTimes = res;
    });
  }

}
