import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { fadeInLeft } from 'ng-animate';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistroService } from '../../shared/services/registro.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


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
  payload:any = {};
  fadeInLeft: any;
  steps: string[] = ["Inicio", "Detalles", "Confirmación", "Finalizado"];
  currentStep: number = 0;
  existeCURP: boolean = true;
  arregloCP: any;
  formData: any = {
    curp: '',
    nombre: '',
    detalles: '',
    apPaterno: '',
    sexo: '',
    fecha: '',
    confirmado: false
  };
event: any;
  constructor(
    private registroService: RegistroService,
    private spinner: NgxSpinnerService,
  ){

  }

  ngOnInit(){
    
  }

  nextStep() {
    if (this.validateStep()) {
      this.currentStep++;
    } else {
      
      //alert('Por favor completa los datos requeridos antes de continuar.');
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
        return this.formData.nombre.trim() !== '' && this.formData.apPaterno.trim() && this.formData.sexo.trim() && this.formData.fecha.trim();
      case 1:
        return this.formData.detalles.trim() !== '';
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
      confirmButtonText: 'Guardar',
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
    this.formData = { nombre: '', detalles: '', confirmado: false };
    this.currentStep = 0;
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

  getCP(){
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

  getCURP(){
    this.registroService.getCURP(this.payload.curp).subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          this.formData.nombre = res.nombres;
          this.formData.apPaterno = res.primer_apellido;
          this.formData.apMaterno = res.segundo_apellido;
          this.formData.fecha = res.fecha_nacimiento;
        },
        error: (err)=>  {
          
        },
      }
    );
  }
}
