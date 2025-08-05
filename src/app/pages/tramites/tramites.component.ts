import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginateQuery, OrderBy } from '../../shared/interfaces/paginate-query.interface';
import { Paginate } from '../../shared/interfaces/paginate.interface';
import { PaginationService } from '../../shared/services/pagination.service';
import { PaginateLaravel } from '../../shared/interfaces/laravel.paginate.interface';
//import { Expediente } from './expedientes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tramites',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tramites.component.html',
})
export class TramitesComponent {
  payload: any = {}
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
  ) { }

  onInit() {

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
