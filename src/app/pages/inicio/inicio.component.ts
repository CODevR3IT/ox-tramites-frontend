import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MisTramitesComponent } from '../mis-tramites/mis-tramites.component';
import { TramitesServiciosComponent } from "../tramites-servicios/tramites-servicios.component";
import { MisExpedientesComponent } from "../mis-expedientes/mis-expedientes.component";
import { TramitesCitasComponent } from "../tramites-citas/tramites-citas.component";
import { RegistroService } from '../../shared/services/registro.service';
import { AppPublic } from '../../shared/interfaces/app-public.interface';
import { RouterOutlet } from '@angular/router';
export interface NavMenu {
  title: string;
  icon: string;
  id: string;
  active: boolean;
}
@Component({
  selector: 'app-inicio',
  imports: [NgbCarouselModule, CommonModule, NgbNavModule, MisTramitesComponent, TramitesServiciosComponent, MisExpedientesComponent, TramitesCitasComponent],
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  app: any;
  // Variables para el menú
  isSmallScreen: boolean = false;
  navMenus: NavMenu[] = [
    { title: 'Difusión de trámites y servicios', icon: 'ti ti-ad-2', id: 'difusion', active: true },
    { title: 'Solicitud de trámite', icon: 'ti ti-browser-plus', id: 'solicitud', active: false },
    { title: 'Avance en atención', icon: 'ti ti-checkup-list', id: 'avance', active: false },
    //{ title: 'Citas en línea', icon: 'ti ti-calendar-search', id: 'citas', active: false }
  ]
  constructor(
    private spinner: NgxSpinnerService,
    private registroService: RegistroService,
  ){
    this.checkScreenSize();
  }

  ngOnInit(){
    this.spinner.show();
    this.registroService.getApp().subscribe(
      {
        next: (res: any) => {
          this.app = res
        },
      }
    );
    this.obtieneTramites();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // <768px se considera pantalla chica
  }

  obtieneTramites(){
    this.spinner.hide();
  }
}
