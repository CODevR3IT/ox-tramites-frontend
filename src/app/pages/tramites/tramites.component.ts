import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginateQuery, OrderBy } from '../../shared/interfaces/paginate-query.interface';
import { Paginate } from '../../shared/interfaces/paginate.interface';
import { PaginationService } from '../../shared/services/pagination.service';
import { PaginateLaravel } from '../../shared/interfaces/laravel.paginate.interface';
import { TramitesService } from '../../shared/services/tramites.service';
//import { Expediente } from './expedientes.interface';
import Swal from 'sweetalert2';
export interface dataToken {
  access_token: any,
  expires_at: any,
  token_type: any,
}

@Component({
  selector: 'app-tramites',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tramites.component.html',
})
export class TramitesComponent {
  payload: any = {}
  tokenData: dataToken = {} as dataToken;
  data: any;
  addEdit: number = 0;
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  public paginationQuery: PaginateQuery = {
    page: 1,
    limit: 10,
    filter: '',
    filterField: '',
    orderBy: OrderBy.ASC,
    orderField: '',
  };
  //public paginationData: PaginateLaravel<Expediente> = { total: 0, last_page: 0, data: [] };
  //para la paginación preguntar a Razo y Mario por cómo envían el back 
  constructor(
    private spinner: NgxSpinnerService,
    private tramitesservice: TramitesService,
  ) { }

  ngOnInit() {
    this.getTramite();
  }

  getTramite() {
    this.tramitesservice.getTramite().subscribe(
      {
        next: (res: any) => {
          console.log("TRAMITES!!!!!!!");
          this.data = res;
          console.log(this.data);
        },
      }
    );
  }

  muestraAviso(content: TemplateRef<any>, tipo: number) {
    this.addEdit = (tipo == 2 ? 2 : 1);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'm', scrollable: true }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
    if (tipo == 2) {
      this.getTramiteID();
    }
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  getTramiteID() {
    this.tramitesservice.getTramiteID().subscribe(
      {
        next: (res: any) => {
          console.log("TRAMITES!!!!!!!");
          this.data = res;
          console.log(this.data);
        },
      }
    );
  }

  guardarTramite() {
    console.log(this.payload);
    const query = {
      "descripcion": this.payload.tramite,
      "tipo_usuarios_restringidos": "[2, 3, 4]"
    }
    this.tramitesservice.guardarTramite(query).subscribe(
      {
        next: (res: any) => {
          console.log("GUARDAR!!!!!!!");
          this.data = res;
          console.log(this.data);
          this.closeResult.set(`Closed with: ${res}`);
          this.getTramite();
        },
      }
    );
  }

  actualizaTramiteID() {
    const query = {
      "id": 2,
      "descripcion": this.payload.tramite,
    }
    this.tramitesservice.actualizaTramiteID(query).subscribe(
      {
        next: (res: any) => {
          console.log("GUARDAR!!!!!!!");
          this.data = res;
          console.log(this.data);
          this.getTramite();
        },
      }
    );
  }

  sort(sort: string) {

  }
}
