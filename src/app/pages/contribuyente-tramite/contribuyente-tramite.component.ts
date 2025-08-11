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
  selector: 'app-contribuyente-tramite',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contribuyente-tramite.component.html',
})
export class ContribuyenteTramiteComponent {
  payload: any = {}
  tokenData: dataToken = {} as dataToken;
  data: any;
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
    this.getToken();
  }

  getToken() {
    const query = {
      "client_id": "f86f3bf8-6973-4ef3-a6e2-3973e54b3fca",
      "client_secret": "22c6cd541b846161f8bb473072ffd0b5fe2727f97861898eebab1d9636a29ed8fdd29124e4bfb16c22d6023d45121fd3172e747f895802b5ba5bcb87d86042ed"
    }
    this.tramitesservice.getToken(query).subscribe(
      {
        next: (res: any) => {
          console.log("TOKEN!!!!!!!");
          this.tokenData = res;
          console.log(this.tokenData);
          this.getTramitesCiud();
        },
      }
    );
  }

  getTramitesCiud() {
    this.tramitesservice.getTramitesCiud('query', this.tokenData).subscribe(
      {
        next: (res: any) => {
          console.log("TRAMITES!!!!!!!");
          this.data = res;
          console.log(this.data);
        },
      }
    );
  }

  muestraAviso(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'm', scrollable: true }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
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

  guardarTramite() {
    console.log(this.payload);
  }

  sort(sort: string) {

  }
}
