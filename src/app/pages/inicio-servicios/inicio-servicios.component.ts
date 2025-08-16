import { Component } from '@angular/core';
import { TramitesService } from '../../shared/services/tramites.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CamundaComponent } from '../../shared/components/camunda-form/camunda-form.interface';
import { CamundaVariable } from '../../shared/interfaces/camunda.interface';

@Component({
  selector: 'app-inicio-servicios',
  imports: [FormsModule, CommonModule,NgbAccordionModule, RouterLink],
  templateUrl: './inicio-servicios.component.html',
  styles: ``
})
export class InicioServiciosComponent {
  payload: any = {};
  catServicios: any;
  filterText: string = '';
  components: CamundaComponent[] = [];
  camundaVariables: CamundaVariable[] = [];
  servicios: any[] = [];
  ca_subtramite_id: any;
  constructor(
    private tramitesservice: TramitesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {

  }

  ngOnInit() {
    this.ca_subtramite_id = this.route.snapshot.paramMap.get('id') || '';
    this.getTramitesServicios();
  }

  get serviciosFiltrados(): any[] {
    const quitarAcentos = (texto: string) =>
      texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    if (!this.filterText.trim()) {
      return this.servicios;
    }
    const filtro = quitarAcentos(this.filterText);

    return this.servicios
      .map(cat => ({
        ...cat,
        subtramites: cat.subtramites?cat.subtramites.filter((subtramite: any) =>
          quitarAcentos(subtramite.descripcion).includes(filtro)
        ):[]
      }))
      .filter(cat => cat.subtramites.length > 0);
  }

  getTramitesServicios() {
    this.tramitesservice.getTramitesServicios({ is_service: true }).subscribe(
      {
        next: (res: any) => {
          //console.log("TRAMITES!!!!!!!");
          this.servicios = res;
          //console.log(this.servicios);
        },
      }
    );
  }

  onSubmit(formData: any) {
      //console.log(formData);
      
      const payload = {
        datos_tramite: formData,
        ca_subtramite_id: this.ca_subtramite_id,
        ca_estatus_id: 1
      }
      //console.log(payload);
      this.tramitesservice.guardaCamposRegistro(payload).subscribe(
        {
          next: (res: any) => {
            window.open(res.url, '_blank');
            
            //console.log("GUARDA CAMUNDA!!!!!!!");
            Swal.fire({
              icon: "success",
              title: "Se ha registrado con exito",
              confirmButtonText: "Aceptar",
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/tramites-servicios'])
                //console.log(this.components);
              }
            });
          },
        }
      );
    }
}
