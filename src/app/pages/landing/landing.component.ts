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
  @ViewChild('appatInput') appatInput!: ElementRef
  @ViewChild('apMaterno') apMaterno!: ElementRef
  @ViewChild('sexoInput') sexoInput!: ElementRef;
  @ViewChild('fechaInput') fechaInput!: ElementRef
  @ViewChild('cpInput') cpInput!: ElementRef
  @ViewChild('coloniaInput') coloniaInput!: ElementRef
  @ViewChild('estadoInput') estadoInput!: ElementRef
  @ViewChild('municipioInput') municipioInput!: ElementRef
  @ViewChild('correoInput') correoInput!: ElementRef
  @ViewChild('correoBInput') correoBInput!: ElementRef
  @ViewChild('telefonoInput') telefonoInput!: ElementRef
  @ViewChild('passwordInput') passwordInput!: ElementRef
  @ViewChild('telefonoBInput') telefonoBInput!: ElementRef
  @ViewChild('passwordBInput') passwordBInput!: ElementRef
  payload:any = {};
  catSexo: any;
  catPais: any;
  catIde: any;
  query:any = {};
  datosCURP: any = {}
  fadeInLeft: any;
  steps: string[] = ["Inicio", "Detalles", "Confirmación", "Finalizado"];
  currentStep: number = 0;
  existeCURP: boolean = true;
  existeConfirma: boolean = true;
  arregloCP: any;
  fechaN:string = '';
  mensanjeValida:string = '';
  correoError: string = '';
  telefonoError: string = '';
  formData: any = {
    curp: '',
    nombre: '',
    detalles: '',
    apPaterno: '',
    sexo: '',
    fecha: '',
    colonia: '',
    correo: '',
    password: '',
    telefono: '',
    correoB: '',
    passwordB: '',
    telefonoB: '',
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
    this.spinner.show();
    this.getCatSexo();
  }

  getCatSexo(){
    this.registroService.getCatSexo().subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          this.catSexo = res;
          this.getCatPais();
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

  getCatPais(){
    this.registroService.getCatPais().subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          this.catPais = res;
          this.getCatIde();
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

  getCatIde(){
    this.registroService.getCatIde().subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          this.catIde = res;
          this.spinner.hide();
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
          this.datosCURP = res;
          this.formData.nombre = this.datosCURP.nombres;
          this.formData.apPaterno = this.datosCURP.primer_apellido;
          this.formData.apMaterno = this.datosCURP.segundo_apellido;
          this.formData.sexo = this.datosCURP.sexo;
          this.fechaN = this.datosCURP.fecha_nacimiento;
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
    this.formData.estado = '';
    this.formData.municipio = '';
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
    console.log(this.formData.colonia);
    this.mensanjeValida = '';
    this.correoError = '';
    this.telefonoError = '';
    if (this.validateStep() == 'z') {
      this.currentStep++;
    } else if(this.validateStep() !== 'z') {
      switch(this.validateStep()){
        case 'a':
          setTimeout(() => this.nombreInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor completa el nombre antes de continuar.'
          break;
        case 'b':
          setTimeout(() => this.appatInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor completa el apellido paterno antes de continuar.'
          break;
        case 'c':
          setTimeout(() => this.sexoInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor selecciona el campo de sexo antes de continuar.'
          break;
        case 'd':
          setTimeout(() => this.fechaInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor selecciona la fecha antes de continuar.'
          break;
        case 'e':
          setTimeout(() => this.cpInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor completa el código postal antes de continuar.'
          break;
        case 'f':
          setTimeout(() => this.coloniaInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor completa la colonia antes de continuar.'
          break;
        case 'g':
          setTimeout(() => this.correoInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor completa el correo y verifique que los correos coincidan antes de continuar.'
          break;
        case 'g1':
          setTimeout(() => this.correoInput.nativeElement.focus(), 0);
          setTimeout(() => this.correoBInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor ingresa un correo válido.'
          this.correoError = 'Correo inválido. Usa el formato: nombre@dominio.com';
          break;
        case 'h':
          setTimeout(() => this.telefonoInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor completa el teléfono y verifique que el número coincida antes de continuar.'
          this.telefonoError = 'El número debe contener solo dígitos (0-9)';
          break;
        case 'h1':
          setTimeout(() => this.telefonoInput.nativeElement.focus(), 0);
          setTimeout(() => this.telefonoBInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor ingresa un número válido a 10 digítos.'
          this.telefonoError = 'El número debe contener solo dígitos (0-9)';
          break;
        case 'i':
          setTimeout(() => this.passwordInput.nativeElement.focus(), 0);
          setTimeout(() => this.passwordBInput.nativeElement.focus(), 0);
          this.mensanjeValida = 'Por favor completa la contraseña y verifique que las contraseñas coincidan antes de continuar.'
          break;
      }
      
      Swal.fire({
        title: '¡Atención!',
        text: this.mensanjeValida,
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

  // validateStep(): boolean {
  //   switch (this.currentStep) {
  //     case 0:
  //       return this.formData.nombre.trim() !== '' && this.formData.apPaterno.trim() !== '' && this.formData.sexo.trim() !== '' && this.formData.fecha.trim() !== '';
  //     case 1:
  //       return (this.formData.correo.trim() == this.payload.correo.trim() ? this.formData.telefono.trim() !== '' && this.payload.telefono.trim() !== '': false);
  // if (!this.isValidEmail(this.formData.email)) {
  //   setTimeout(() => this.emailInput.nativeElement.focus(), 0);
  //   alert('Por favor ingresa un correo válido.');
  //   return false;
  // }
  //     case 2:
  //       return (this.formData.password.trim() == this.payload.password.trim() ? this.formData.confirmado === true: false);
  //     default:
  //       return true;
  //   }
  // }

  validateStep(): any {
    switch (this.currentStep) {
      case 0:
        let case0: string = 'z';
        if(this.formData.nombre.trim() === ''){ case0 = 'a';}
        else if(this.formData.apPaterno.trim() === ''){ case0 = 'b';}
        else if(this.formData.sexo.trim() === ''){ case0 = 'c';}
        else if(this.formData.fecha.trim() === ''){ case0 = 'd';}
        else if(this.payload.cp === undefined){ case0 = 'e';}
        else if(this.formData.colonia === ''){ case0 = 'f';}
        
        return case0;
      case 1:
        let case1: string = 'z';
        if((this.formData.correo !== this.formData.correoB) || (this.formData.correo.trim() === '') || (this.formData.correoB.trim() === '')){ case1 = 'g';}
        else if((this.formData.telefono !== this.formData.telefonoB) || (this.formData.telefono.trim() === '') || (this.formData.telefonoB === '')){ case1 = 'h';}
        
        if (!this.isValidEmail(this.formData.correo) || !this.isValidEmail(this.formData.correoB)) { case1 = 'g1';}
        if (!this.isValidPhone(this.formData.telefono) || !this.isValidPhone(this.formData.telefonoB)) { case1 = 'h1';}
        return case1;
      case 2:
        let case2: string = 'z';
        if((this.formData.password !== this.formData.passwordB) || (this.formData.password.trim() === '') || (this.formData.passwordB.trim() === undefined)){ case2 = 'i';}
        
        return case2;
      default:
        return 'z';
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.trim());
  }

  permitirSoloNumeros(event: KeyboardEvent) {
    const tecla = event.key;
    if (!/^[0-9]$/.test(tecla)) {
      event.preventDefault();
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
    this.existeCURP = (e.target.checked ? false:true);
  }

  confirma(e: any){
    this.existeConfirma = (e.target.checked ? false:true);
  }

  verData(){
    console.log(JSON.stringify(this.formData.colonia));
    this.formData.coloniaB = this.formData.colonia.colonia; 
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
      "fecha_nacimiento":  fechaNacimiento,
      "sexo": this.formData.sexo,
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Archivo seleccionado:', file);
  }

}
