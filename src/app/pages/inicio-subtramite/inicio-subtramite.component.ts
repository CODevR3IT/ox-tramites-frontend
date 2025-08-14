import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TramitesService } from '../../shared/services/tramites.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CamundaComponent } from '../../shared/components/camunda-form/camunda-form.interface';
import { CamundaFormComponent } from '../../shared/components/camunda-form/camunda-form.component';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { CamundaVariable } from '../../shared/interfaces/camunda.interface';

@Component({
  selector: 'app-inicio-subtramite',
  imports: [CommonModule, FormsModule, CamundaFormComponent],
  templateUrl: './inicio-subtramite.component.html',
  styleUrl: './inicio-subtramite.component.scss'
})
export class InicioSubtramiteComponent {
  payload: any = {};
  components: CamundaComponent[] = [];
  camundaVariables: CamundaVariable[] = [];
  ca_subtramite_id: any;
  constructor(
    private tramitesservice: TramitesService,
    private spinner: NgxSpinnerService,
    private readonly route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.ca_subtramite_id = this.route.snapshot.paramMap.get('id') || '';
    this.getCampoSubtramiteId();
  }

  getCampoSubtramiteId() {
    this.tramitesservice.getCampoSubtramiteId(this.ca_subtramite_id).subscribe(
      {
        next: (res: any) => {
          console.log("SUBTRAMITES!!!!!!!");
          this.components = res[0].campos.components;
          console.log(this.components);
        },
      }
    );
  }


  onSubmit(payload: any) {
    console.log(payload);
  }
}
