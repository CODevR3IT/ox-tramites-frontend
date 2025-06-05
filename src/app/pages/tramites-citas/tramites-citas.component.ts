import { Component, signal, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-tramites-citas',
  imports: [FullCalendarModule],
  templateUrl: './tramites-citas.component.html',
  styles: ``
})
export class TramitesCitasComponent {
  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      locales: [esLocale],
      locale: 'es',
      plugins: [dayGridPlugin],
      events: [
      { title: 'Cita', date: '2025-06-10' }
    ]
    };
  ngAfterViewInit() {
    const tab = document.querySelector('a[href="#citas"]');
    if (tab) {
      tab.addEventListener('shown.bs.tab', () => {
        setTimeout(() => {
          if (this.calendarComponent) {
            this.calendarComponent.getApi().updateSize();
          }
        }, 100);
      });
    }
  }
}


