import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TramitesService } from '../../shared/services/tramites.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaComponent } from '../../shared/components/camunda-form/camunda-form.interface';
import { CamundaFormComponent } from '../../shared/components/camunda-form/camunda-form.component';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { CamundaVariable } from '../../shared/interfaces/camunda.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-inicio-subtramite',
  imports: [CommonModule, FormsModule, CamundaFormComponent],
  templateUrl: './inicio-subtramite.component.html',
  styleUrl: './inicio-subtramite.component.scss'
})
export class InicioSubtramiteComponent {
  payload: any = {};
  doctos: any = { files: [], tramite_descripcion: '', descripcion: '' };
  components: CamundaComponent[] = [];
  camundaVariables: CamundaVariable[] = [];
  ca_subtramite_id: any;
  tipoPersona: string = '';
  url = environment.api + '/file/';

  constructor(
    private tramitesservice: TramitesService,
    private spinner: NgxSpinnerService,
    private readonly route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.ca_subtramite_id = this.route.snapshot.paramMap.get('id') || '';
    this.getCampoSubtramiteId();
    this.getsubTramiteID();
  }

  getCampoSubtramiteId() {
    this.spinner.show();
    this.tramitesservice.getCampoSubtramiteId(this.ca_subtramite_id).subscribe(
      {
        next: (res: any) => {
          //console.log("SUBTRAMITES!!!!!!!");
          this.components = res[0].campos.components;
          //console.log(this.components);
          //this.ca_subtramite_id = res[0].ca_subtramite_id;
          this.spinner.hide();
          //this.getsubTramiteID();
        },
      }
    );
  }


  onSubmit(formData: any) {
    //console.log(formData);
    this.spinner.show();
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
          this.spinner.hide();
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

  getsubTramiteID() {
    this.spinner.show();
    this.tramitesservice.getsubTramiteID({ id: this.ca_subtramite_id }).subscribe(
      {
        next: (res: any) => {
          //console.log("TRAMITES 1 a 1!!!!!!!");
          //console.log(res);
          this.doctos.files = typeof res[0].files === 'string' ? JSON.parse(res[0].files) : res[0].files;
          this.doctos.tramite_descripcion = res[0].tramite_descripcion;
          this.doctos.descripcion = res[0].descripcion;
          //this.payload.files = res[0].files[0];
          //console.log("res[0].files")
          //console.log(this.doctos.files)
          this.spinner.hide();
        },
      }
    );
  }
}
