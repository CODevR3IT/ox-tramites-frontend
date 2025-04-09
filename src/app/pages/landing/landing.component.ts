import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fadeInLeft } from 'ng-animate';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistroService } from '../../shared/services/registro.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { format, parse  } from "date-fns";
import moment from 'moment';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styles: ``,
  animations: [
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))]),
  ],
})
export class LandingComponent {
  @ViewChild('nombreInput') nombreInput!: ElementRef;
  @ViewChild('sexoInput') sexoInput!: ElementRef;
  @ViewChild('appatInput') appatInput!: ElementRef
  @ViewChild('apMaterno') apMaterno!: ElementRef
  @ViewChild('fechaInput') fechaInput!: ElementRef
  @ViewChild('cpInput') cpInput!: ElementRef
  @ViewChild('estadoInput') estadoInput!: ElementRef
  @ViewChild('municipioInput') municipioInput!: ElementRef
  @ViewChild('correoInput') correoInput!: ElementRef
  @ViewChild('telefonoInput') telefonoInput!: ElementRef
  @ViewChild('passwordInput') passwordInput!: ElementRef
  payload:any = {};
  query:any = {};
  fadeInLeft: any;
  steps: string[] = ["Inicio", "Detalles", "Confirmación", "Finalizado"];
  currentStep: number = 0;
  existeCURP: boolean = true;
  arregloCP: any;
  fechaN:string = '';
  formData: any = {
    curp: '',
    nombre: '',
    detalles: '',
    apPaterno: '',
    sexo: '',
    fecha: '',
    colonia: '',
    confirmado: false,
  };
event: any;
password: string = '';
showPassword: boolean = false;
  constructor(
    private registroService: RegistroService,
    private spinner: NgxSpinnerService,

  ){

  }

  ngOnInit(){

  }

  getCURP(){
    this.registroService.getCURP(this.payload.curp).subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          this.formData.nombre = res.nombres;
          this.formData.apPaterno = res.primer_apellido;
          this.formData.apMaterno = res.segundo_apellido;
          this.fechaN = res.fecha_nacimiento;
          let fechaDate: Date = parse(this.fechaN, 'dd/MM/yyyy', new Date());
          this.formData.fecha = format(fechaDate, 'yyyy-MM-dd');
        },
        error: (err)=>  {
          this.spinner.hide();
          Swal.fire({
            title: '¡Atención!',
            text: err.error.message,
            icon: 'error',
            confirmButtonColor: '#6a1c32',
            confirmButtonText: 'Aceptar',
          });
        },
      }
    );
  }

  getCP(){
    this.formData = { colonia: null,};
    this.arregloCP = '';
    this.registroService.getCP(this.payload.cp).subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          this.arregloCP = res;
        },
        error: (err)=>  {
          this.spinner.hide();
          Swal.fire({
            title: '¡Atención!',
            text: err.error.message,
            icon: 'error',
            confirmButtonColor: '#6a1c32',
            confirmButtonText: 'Aceptar',
          });
        },
      }
    );
  }

  nextStep() {
    console.log(this.validateStep());
    if (this.validateStep()) {
      this.currentStep++;
    } else {
      //setTimeout(() => this.nombreInput.nativeElement.focus(), 0);
      Swal.fire({
        title: '¡Atención!',
        text: 'Por favor completa los datos requeridos antes de continuar.',
        icon: 'error',
        confirmButtonColor: '#6a1c32',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  validateStep(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.formData.nombre.trim() !== '' && this.formData.apPaterno.trim() !== '' && this.formData.sexo.trim() !== '' && this.formData.fecha.trim() !== '';
      case 1:
        return (this.formData.correo.trim() == this.payload.correo.trim() ? this.formData.correo.trim() !== '' && this.payload.correo.trim() !== '': false);
      case 2:
        return this.formData.confirmado === true;
      default:
        return true;
    }
  }

  confirmReset() {
    // if (confirm('¿Estás seguro de que quieres reiniciar el formulario?')) {
    //   this.resetForm();
    // }
    Swal.fire({
      title: '¡ATENCIÓN!',
      text: "¿Estás seguro de que quieres reiniciar el formulario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9f2241',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Reiniciar',
      cancelButtonText: 'Cancelar',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.resetForm();
      }
    })
  }

  resetForm() {
    this.formData = { nombre: '', detalles: '', curp: '', apPaterno: '', sexo: '', fecha: '', colonia: null, confirmado: false };
    this.payload = {};
    this.arregloCP = '';
    this.currentStep = 0;
    console.log(this.formData);
    console.log(this.payload);
  }

  muestraCURP(e: any){
    console.log(e.target.checked);
    if(e.target.checked){
      this.existeCURP = false;
    }else{
      this.existeCURP = true;
    }
  }

  verData(){
    console.log(JSON.stringify(this.formData.colonia));
    this.formData.estado = this.formData.colonia.estado;
    this.formData.municipio = this.formData.colonia.municipio;
  }

  guardar(){
    console.log("this.formData");
    console.log(this.formData);
    
    const fechaN = parse(this.formData.fecha, 'yyyy-MM-dd', new Date()); // Esto evita que el constructor de Date aplique la conversión por zona horaria, más seguro

    const fechaNacimiento = format(fechaN, 'dd/MM/yyyy'); // Formato deseado
    console.log(fechaNacimiento); // "29/06/1990" le quitaba un dia por la zona horaria.

    this.query = {
      "curp" : this.payload.curp,
      "email": this.formData.correo,
      "password": this.formData.password,
      "telefono": this.formData.telefono,
      "nombre": this.formData.nombre,
      "primer_apellido": this.formData.apPaterno,
      "segundo_apellido": this.formData.apMaterno,
      "cp_id": this.payload.cp,
      "fecha_nacimiento":  fechaNacimiento
    }
    console.log(JSON.stringify(this.query));
    //return;
    this.registroService.guardar(this.query).subscribe(
      {
        next: (res:any)=>{
          console.log("GUARDADO");
          console.log(res);
          Swal.fire({
            title: '¡ATENCIÓN!',
            text: res.msg,
            icon: 'success',
            confirmButtonColor: '#9f2241',
            confirmButtonText: 'Aceptar',
            customClass: {
              actions: 'my-actions',
              confirmButton: 'order-2',
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.resetForm();
            }
          })
        },
        error: (err)=>  {
          this.spinner.hide();
          Swal.fire({
            title: '¡Atención!',
            text: err.error.message,
            icon: 'error',
            confirmButtonColor: '#6a1c32',
            confirmButtonText: 'Aceptar',
          });
        },
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
