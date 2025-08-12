import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  estatus: boolean = false;
  addEdit: number = 0;
  catTipoU: any;
  myArray: any[] = [];
  private modalService = inject(NgbModal);
  private modalRef?: NgbModalRef;
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
    this.payload = {};
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

  muestraAviso(content: TemplateRef<any>, tipo: number, arreglo: any) {
    this.spinner.show();
    this.getCatTipoUsuario();
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
      this.payload = {};
      this.spinner.show();
      this.getTramiteID(arreglo);
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

  getCatTipoUsuario() {
    this.tramitesservice.getCatTipoUsuario().subscribe(
      {
        next: (res: any) => {
          console.log("TRAMITES!!!!!!!");
          this.catTipoU = res;
          console.log(this.catTipoU);
          this.spinner.hide();
        },
      }
    );
  }

  getTramiteID(arreglo: any) {
    this.tramitesservice.getTramiteID(arreglo).subscribe(
      {
        next: (res: any) => {
          console.log("TRAMITES 1 a 1!!!!!!!");
          console.log(res);
          const jsonObject = JSON.parse(res[0].tipo_usuarios_restringidos);
          for (const key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
              this.myArray.push(jsonObject[key]);
            }
          }
          console.log(this.myArray);
          // Ahora myArray contiene: ["value1", "value2", "value3"]
          this.payload.descripcion = res[0].descripcion;
          this.payload.detalle = res[0].detalle;
          this.payload.tipo_usuarios_restringidos = this.myArray;
          this.payload.id = res[0].id;
          this.spinner.hide();
        },
      }
    );
  }

  guardarTramite() {
    this.payload.tipo_usuarios_restringidos = JSON.stringify(this.payload.tipo_usuarios_restringidos);
    console.log("this.payload");
    console.log(this.payload);
    /*const query = {
      "descripcion": this.payload.tramite,
      "tipo_usuarios_restringidos": "[2, 3, 4]"
    }*/
    this.tramitesservice.guardarTramite(this.payload).subscribe(
      {
        next: (res: any) => {
          console.log("GUARDAR!!!!!!!");
          console.log(res);
          this.modalService.dismissAll();
          this.getTramite();
        },
      }
    );
  }

  actualizaTramiteID() {
    this.payload.tipo_usuarios_restringidos = JSON.stringify(this.payload.tipo_usuarios_restringidos);
    this.tramitesservice.actualizaTramiteID(this.payload).subscribe(
      {
        next: (res: any) => {
          console.log("ACTUALIZADO!!!!!!!");
          console.log(res);
          this.modalService.dismissAll();
          this.getTramite();
        },
      }
    );
  }

  actualizaTramiteEstatus(event: Event, arreglo: any) {
    const checked = (event.target as HTMLInputElement).checked;
    console.log(checked);
    console.log(arreglo);
    const query = {
      "id": arreglo.id,
      "estatus": checked,
    }
    this.tramitesservice.actualizaTramiteID(query).subscribe(
      {
        next: (res: any) => {
          console.log("ACTULIZA ESTATUS!!!!!!!");
          console.log(res);
          //this.getTramite();
        },
      }
    );
  }

  borraTramiteID(arreglo: any) {
    Swal.fire({
      icon: "info",
      title: "¿Está seguro que desea eliminar el registro?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.tramitesservice.borraTramiteID(arreglo.id, {}).subscribe(
          {
            next: (res: any) => {
              console.log("BORRAR!!!!!!!");
              console.log(res);
              Swal.fire({
                icon: "success",
                title: "¡EXITO!",
                text: "Registro eliminado",
              });
              this.getTramite();
            },
          }
        );
      } /* else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }*/
    });
  }

  sort(sort: string) {

  }
}
