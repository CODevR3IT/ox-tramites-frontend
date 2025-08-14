import { Component, ElementRef, inject, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginateQuery, OrderBy } from '../../shared/interfaces/paginate-query.interface';
import { Paginate } from '../../shared/interfaces/paginate.interface';
import { PaginationService } from '../../shared/services/pagination.service';
import { PaginateLaravel } from '../../shared/interfaces/laravel.paginate.interface';
import { TramitesService } from '../../shared/services/tramites.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//import { Expediente } from './expedientes.interface';
import Swal from 'sweetalert2';
import { FormPlayground } from '@bpmn-io/form-js';
import {NgxSatSign} from 'ngx-sat-sign';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subtramites',
  imports: [CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './subtramites.component.html',
  styleUrl: './subtramites.component.scss'
})
export class SubtramitesComponent {
  payload: any = {}
  data: any;
  addEdit: number = 0;
  catTipoU: any;
  catTramite: any;
  myArray: any[] = [];
  formEditor: FormPlayground = {} as FormPlayground;
  @ViewChild('formContainer', { static: false }) formContainerRef!: ElementRef;
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  archivoBase64: string | null = null;
  archivoSeguro: SafeResourceUrl | null = null;
  idTramite: any;
  url = environment.api + '/file/';
  private schema = {
    type: 'default',
    components: [
    ],
  };
  private dataForm: { [key: string]: any } = {};
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
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.getsubTramite();
  }

  getsubTramite() {
    this.tramitesservice.getsubTramite().subscribe(
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
    this.getTramiteEstatus();
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
      this.getsubTramiteID(arreglo);
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

  getTramiteEstatus() {
    this.payload = {};
    this.tramitesservice.getTramiteEstatus().subscribe(
      {
        next: (res: any) => {
          console.log("TRAMITES!!!!!!!");
          this.catTramite = res;
          console.log(this.catTramite);
        },
      }
    );
  }

  getsubTramiteID(arreglo: any) {
    this.tramitesservice.getsubTramiteID(arreglo).subscribe(
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
          this.payload.ca_tramite_id = res[0].ca_tramite_id;
          this.payload.files = typeof res[0].files === 'string' ? JSON.parse(res[0].files) : res[0].files;
          //this.payload.files = res[0].files[0];
          console.log("res[0].files")
          console.log(this.payload.files)
          this.spinner.hide();
        },
      }
    );
  }

  guardarsubTramite() {
    this.payload.tipo_usuarios_restringidos = JSON.stringify(this.payload.tipo_usuarios_restringidos);
    console.log("this.payload");
    console.log(this.payload);
    this.tramitesservice.guardarsubTramite(this.payload).subscribe(
      {
        next: (res: any) => {
          console.log("GUARDAR!!!!!!!");
          console.log(res);
          this.modalService.dismissAll();
          this.getsubTramite();
        },
      }
    );
  }

  actualizasubTramiteID() {
    this.payload.tipo_usuarios_restringidos = JSON.stringify(this.payload.tipo_usuarios_restringidos);
    const query = {
      "id": 2,
      "descripcion": this.payload.subtramite,
      "fileb64": "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MjNjYS00MzQzLTExZTUtMDAwMC0yZjAxNjVjMzBhYyYjMTY7JyB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPjx4bXA6TW9kaWZ5RGF0ZT4yMDE1LTA4LTEyVDEzOjQ5OjI3KzAyOjAwPC94bXA6TW9kaWZ5RGF0ZT4KPHhtcDpDcmVhdGVEYXRlPjIwMTUtMDgtMTJUMTM6NDk6MjcrMDI6MDA8L3htcDpDcmVhdGVEYXRlPgo8eG1wOkNyZWF0b3JUb29sPlBERkNyZWF0b3IgVmVyc2lvbiAxLjIuMzwveG1wOkNyZWF0b3JUb29sPjwvcmRmOkRlc2NyaXB0aW9uPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nYzQ2MTIzY2EtNDM0My0xMWU1LTAwMDAtMmYwMTY1YzMwYWMmIzE2OycgeG1sbnM6eGFwTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nIHhhcE1NOkRvY3VtZW50SUQ9J3V1aWQ6YzQ2MTIzY2EtNDM0My0xMWU1LTAwMDAtMmYwMTY1YzMwYWNXJiM2O0qw0mMmIzMxOyYjMTY7Jy8+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSdjNDYxMjNjYS00MzQzLTExZTUtMDAwMC0yZjAxNjVjMzBhYyYjMTY7JyB4bWxuczpkYz0naHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8nIGRjOmZvcm1hdD0nYXBwbGljYXRpb24vcGRmJz48ZGM6dGl0bGU+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5ob2phIGVuIGJsYW5jbyBwZGY8L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzp0aXRsZT48ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPmpjbWZlcm5hbmRlejwvcmRmOmxpPjwvcmRmOlNlcT48L2RjOmNyZWF0b3I+PGRjOmRlc2NyaXB0aW9uPjxyZGY6U2VxPjxyZGY6bGk+KCk8L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpkZXNjcmlwdGlvbj48L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+CmVuZHN0cmVhbQplbmRvYmoKMiAwIG9iago8PC9Qcm9kdWNlcihHUEwgR2hvc3RzY3JpcHQgOS4wNCkKL0NyZWF0aW9uRGF0ZShEOjIwMTUwODEyMTM0OTI3KzAyJzAwJykKL01vZERhdGUoRDoyMDE1MDgxMjEzNDkyNyswMicwMCcpCi9UaXRsZShcMzc2XDM3N1wwMDBoXDAwMG9cMDAwalwwMDBhXDAwMCBcMDAwZVwwMDBuXDAwMCBcMDAwYlwwMDBsXDAwMGFcMDAwblwwMDBjXDAwMG9cMDAwIFwwMDBwXDAwMGRcMDAwZikKL0NyZWF0b3IoXDM3NlwzNzdcMDAwUFwwMDBEXDAwMEZcMDAwQ1wwMDByXDAwMGVcMDAwYVwwMDB0XDAwMG9cMDAwclwwMDAgXDAwMFZcMDAwZVwwMDByXDAwMHNcMDAwaVwwMDBvXDAwMG5cMDAwIFwwMDAxXDAwMC5cMDAwMlwwMDAuXDAwMDMpCi9BdXRob3IoXDM3NlwzNzdcMDAwalwwMDBjXDAwMG1cMDAwZlwwMDBlXDAwMHJcMDAwblwwMDBhXDAwMG5cMDAwZFwwMDBlXDAwMHopCi9LZXl3b3JkcygpCi9TdWJqZWN0KCk+PmVuZG9iagp4cmVmCjAgMTMKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMzk5IDAwMDAwIG4gCjAwMDAwMDU1ODAgMDAwMDAgbiAKMDAwMDAwMDM0MCAwMDAwMCBuIAowMDAwMDAwMTk5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDE4MSAwMDAwMCBuIAowMDAwMDAwNzE4IDAwMDAwIG4gCjAwMDAwMDA4NjQgMDAwMDAgbiAKMDAwMDAwMDQ2NCAwMDAwMCBuIAowMDAwMDAxMDYyIDAwMDAwIG4gCjAwMDAwMDA0OTMgMDAwMDAgbiAKMDAwMDAwMzkyMiAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDEzIC9Sb290IDEgMCBSIC9JbmZvIDIgMCBSCi9JRCBbPDJGQjBBOEQ4NjdDQTc4MkJGRDU5MDI0RURERDg5NjRBPjwyRkIwQThEODY3Q0E3ODJCRkQ1OTAyNEVEREQ4OTY0QT5dCj4+CnN0YXJ0eHJlZgo2MDUwCiUlRU9GCg==",
      "ext": "pdf",
      "nombre": "PDF1",
      "fileb641": "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MjNjYS00MzQzLTExZTUtMDAwMC0yZjAxNjVjMzBhYyYjMTY7JyB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPjx4bXA6TW9kaWZ5RGF0ZT4yMDE1LTA4LTEyVDEzOjQ5OjI3KzAyOjAwPC94bXA6TW9kaWZ5RGF0ZT4KPHhtcDpDcmVhdGVEYXRlPjIwMTUtMDgtMTJUMTM6NDk6MjcrMDI6MDA8L3htcDpDcmVhdGVEYXRlPgo8eG1wOkNyZWF0b3JUb29sPlBERkNyZWF0b3IgVmVyc2lvbiAxLjIuMzwveG1wOkNyZWF0b3JUb29sPjwvcmRmOkRlc2NyaXB0aW9uPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nYzQ2MTIzY2EtNDM0My0xMWU1LTAwMDAtMmYwMTY1YzMwYWMmIzE2OycgeG1sbnM6eGFwTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nIHhhcE1NOkRvY3VtZW50SUQ9J3V1aWQ6YzQ2MTIzY2EtNDM0My0xMWU1LTAwMDAtMmYwMTY1YzMwYWNXJiM2O0qw0mMmIzMxOyYjMTY7Jy8+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSdjNDYxMjNjYS00MzQzLTExZTUtMDAwMC0yZjAxNjVjMzBhYyYjMTY7JyB4bWxuczpkYz0naHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8nIGRjOmZvcm1hdD0nYXBwbGljYXRpb24vcGRmJz48ZGM6dGl0bGU+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5ob2phIGVuIGJsYW5jbyBwZGY8L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzp0aXRsZT48ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPmpjbWZlcm5hbmRlejwvcmRmOmxpPjwvcmRmOlNlcT48L2RjOmNyZWF0b3I+PGRjOmRlc2NyaXB0aW9uPjxyZGY6U2VxPjxyZGY6bGk+KCk8L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpkZXNjcmlwdGlvbj48L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+CmVuZHN0cmVhbQplbmRvYmoKMiAwIG9iago8PC9Qcm9kdWNlcihHUEwgR2hvc3RzY3JpcHQgOS4wNCkKL0NyZWF0aW9uRGF0ZShEOjIwMTUwODEyMTM0OTI3KzAyJzAwJykKL01vZERhdGUoRDoyMDE1MDgxMjEzNDkyNyswMicwMCcpCi9UaXRsZShcMzc2XDM3N1wwMDBoXDAwMG9cMDAwalwwMDBhXDAwMCBcMDAwZVwwMDBuXDAwMCBcMDAwYlwwMDBsXDAwMGFcMDAwblwwMDBjXDAwMG9cMDAwIFwwMDBwXDAwMGRcMDAwZikKL0NyZWF0b3IoXDM3NlwzNzdcMDAwUFwwMDBEXDAwMEZcMDAwQ1wwMDByXDAwMGVcMDAwYVwwMDB0XDAwMG9cMDAwclwwMDAgXDAwMFZcMDAwZVwwMDByXDAwMHNcMDAwaVwwMDBvXDAwMG5cMDAwIFwwMDAxXDAwMC5cMDAwMlwwMDAuXDAwMDMpCi9BdXRob3IoXDM3NlwzNzdcMDAwalwwMDBjXDAwMG1cMDAwZlwwMDBlXDAwMHJcMDAwblwwMDBhXDAwMG5cMDAwZFwwMDBlXDAwMHopCi9LZXl3b3JkcygpCi9TdWJqZWN0KCk+PmVuZG9iagp4cmVmCjAgMTMKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMzk5IDAwMDAwIG4gCjAwMDAwMDU1ODAgMDAwMDAgbiAKMDAwMDAwMDM0MCAwMDAwMCBuIAowMDAwMDAwMTk5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDE4MSAwMDAwMCBuIAowMDAwMDAwNzE4IDAwMDAwIG4gCjAwMDAwMDA4NjQgMDAwMDAgbiAKMDAwMDAwMDQ2NCAwMDAwMCBuIAowMDAwMDAxMDYyIDAwMDAwIG4gCjAwMDAwMDA0OTMgMDAwMDAgbiAKMDAwMDAwMzkyMiAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDEzIC9Sb290IDEgMCBSIC9JbmZvIDIgMCBSCi9JRCBbPDJGQjBBOEQ4NjdDQTc4MkJGRDU5MDI0RURERDg5NjRBPjwyRkIwQThEODY3Q0E3ODJCRkQ1OTAyNEVEREQ4OTY0QT5dCj4+CnN0YXJ0eHJlZgo2MDUwCiUlRU9GCg==",
      "ext1": "pdf",
      "nombre1": "PDF2"
    }
    console.log(this.payload);
    this.tramitesservice.actualizasubTramiteID(this.payload).subscribe(
      {
        next: (res: any) => {
          console.log("ACTUALIZADO!!!!!!!");
          console.log(res);
          this.modalService.dismissAll();
          this.getsubTramite();
        },
      }
    );
  }

  actualizasubTramiteEstatus(event: Event, arreglo: any) {
    const checked = (event.target as HTMLInputElement).checked;
    console.log(checked);
    console.log(arreglo);
    const query = {
      "id": arreglo.id,
      "estatus": checked,
    }
    this.tramitesservice.actualizasubTramiteID(query).subscribe(
      {
        next: (res: any) => {
          console.log("ACTULIZA ESTATUS!!!!!!!");
          console.log(res);
          //this.getTramite();
        },
      }
    );
  }

  borrasubTramiteID(arreglo: any) {
    Swal.fire({
      icon: "info",
      title: "¿Está seguro que desea eliminar el registro?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.tramitesservice.borrasubTramiteID(arreglo.id, {}).subscribe(
          {
            next: (res: any) => {
              console.log("BORRAR!!!!!!!");
              console.log(res);
              Swal.fire({
                icon: "success",
                title: "¡EXITO!",
                text: "Registro eliminado",
              });
              this.getsubTramite();
            },
          }
        );
      } /* else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }*/
    });
  }

  convertirArchivoBase64(event: any, opcion: any): void {
    console.log("DATO LETRA");
    console.log(opcion);
    const archivo: File = event.target.files[0];
    if (!archivo) return;

    if (archivo.size < 5200123 && archivo.type === 'application/pdf') {
      this.payload.nombreOriginal = archivo.name;
      const lector = new FileReader();

      lector.onload = () => {
        const base64 = lector.result as string;
        const cadena64: any = base64.split(";base64,");
        switch (opcion) {
          case "a":
            this.payload.fileb64 = cadena64[1];
            this.payload.ext = "pdf";
            this.payload.nombre = "PDF";
            break;
          case "b":
            this.payload.fileb641 = cadena64[1];
            this.payload.ext1 = "pdf";
            this.payload.nombre1 = "PDF1";
            break;
          case "c":
            this.payload.fileb642 = cadena64[1];
            this.payload.ext2 = "pdf";
            this.payload.nombre2 = "PDF2";
            break;
          default:
            break;
        }
        //this.payload.archivoV = base64;
        console.log("this.payload");
        console.log(this.payload);
        this.archivoSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(base64);
      };

      lector.onerror = (error) => {
        console.error('Error al leer el archivo:', error);
        Swal.fire({
          title: '¡Atención!',
          text: 'Error al leer el archivo.',
          icon: 'error',
          confirmButtonColor: '#03277E',
          confirmButtonText: 'Aceptar',
        });
      };

      lector.readAsDataURL(archivo);
    } else {
      Swal.fire({
        title: '¡Atención!',
        text: 'El archivo debe ser menor a 5MB y formato PDF.',
        icon: 'error',
        confirmButtonColor: '#03277E',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  sort(sort: string) {

  }

  /*********************************** CAMUNDA *********************************************/
  muestraCamposSubtramite(content: TemplateRef<any>, arreglo: any) {
    // this.spinner.show();
    this.getCampoId(arreglo.id);
     this.idTramite = arreglo.id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', scrollable: true, windowClass: 'modal-xxl' }).result.then(
      (result) => {

        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  saveForm() {
    const payload = {
      campos: this.formEditor.getSchema(),
      ca_subtramite_id: this.idTramite
    };
    this.tramitesservice.guardaCampos(payload).subscribe(
      {
        next: (res: any) => {
          console.log("GUARDAR!!!!!!!");
          console.log(res);
          this.modalService.dismissAll();
          this.getsubTramite();
        },
      }
    );
  }

  updateForm() {
    const payload = {
      campos: this.formEditor.getSchema(),
      id: this.idTramite
    };
    this.tramitesservice.updateForm(payload).subscribe(
      {
        next: (res: any) => {
          console.log("ACTUALIZA!!!!!!!");
          console.log(res);
          this.modalService.dismissAll();
          this.getsubTramite();
        },
      }
    );
  }

  guardaCampos() {
    this.tramitesservice.guardaCampos(this.dataForm).subscribe(
      {
        next: (res: any) => {
          console.log("GUARDAR!!!!!!!");
          console.log(res);
          this.modalService.dismissAll();
          this.getsubTramite();
        },
      }
    );
  }

  getCampoId(id: any) {
    this.payload = {};
    this.tramitesservice.getCampoId(id).subscribe(
      {
        next: (res: any) => {
          console.log("CAMPOS!!!!!!!");
          if(res.length > 0){console.log("GUARDA");}else{console.log("NUEVO");}
          this.addEdit = res.length > 0 ? 2 : 1;
          setTimeout(() => {
            if (this.formContainerRef) {
              this.formEditor = new FormPlayground({
                container: this.formContainerRef.nativeElement,
                schema:res.length ? res[0].campos : this.schema,
                data: this.dataForm
              });
            }
          }, 0);
        },
      }
    );
  }

  getPDF(id: any) {
    this.tramitesservice.getPDF(id).subscribe(
      {
        next: (res: any) => {
          
        },
      }
    );
  }
}
