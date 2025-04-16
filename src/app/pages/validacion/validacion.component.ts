import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { fadeInLeft } from 'ng-animate';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistroService } from '../../shared/services/registro.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-validacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './validacion.component.html',
  styleUrl: './validacion.component.scss',
  animations: [
      trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))]),
    ],
})
export class ValidacionComponent {
  payload:any = {
    correo: '',
    password: '',
    codigo: '',
    cambiaPassword: '',
    cambiaPasswordB: '',
  };
  fadeInLeft: any;
  isSmallScreen: boolean = false;
  showPassword: boolean = false;
  existeCodigo: boolean = true;
  valida: boolean = false;
  correoError: string = '';
  cambioPassword: boolean = true;

  constructor(
    private registroService: RegistroService,
    private spinner: NgxSpinnerService,
  ){}

  validaForm(): any{
    console.log("aca valdoo");
    console.log(this.payload);
    console.log("aca valdo1o" + this.payload.correo);
    this.correoError = '';
    if (!this.isValidEmail(this.payload.correo)) { 
      this.correoError = 'Correo inválido. Usa el formato: nombre@dominio.com';
      console.log("aca entre1");
      console.log(this.existeCodigo);
      return false;
    }
    if(this.existeCodigo){
      console.log("aca entre2");
      return this.valida = (this.payload.correo !== '' && this.payload.password !== '' && this.payload.codigo !== '' ? true : false);
    }else{
      console.log("aca entre3");
      return this.valida = (this.payload.correo !== '' && this.payload.password !== '' ? true : false);
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  solicitarCodigo(){
    this.existeCodigo = false;
    if(!this.validaForm()){
      Swal.fire({
        title: '¡Atención!',
        text: 'Ingrese los campos solicitados.',
        icon: 'error',
        confirmButtonColor: '#6a1c32',
        confirmButtonText: 'Aceptar',
      });
      console.log("aca entresol");
      return;
    }
    console.log("this.validaForm()");
    console.log(this.validaForm());
    const query = {
        "email":this.payload.correo,
        "password":this.payload.password,
    }
    this.registroService.solicitarCodigo(query).subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          this.spinner.hide();
          Swal.fire({
            title: '¡Atención!',
            text: res.msg,
            icon: 'success',
            confirmButtonColor: '#6a1c32',
            confirmButtonText: 'Aceptar',
          });
          this.correoError = '';
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

  validaCodigo(){
    this.existeCodigo = true;
    if(!this.validaForm()){
      Swal.fire({
        title: '¡Atención!',
        text: 'Ingrese los campos solicitados.',
        icon: 'error',
        confirmButtonColor: '#6a1c32',
        confirmButtonText: 'Aceptar',
      });
      console.log("aca entreval");
      return;
    }
    console.log("this.validaForm()");
    console.log(this.validaForm());
    const query = {
        "email":this.payload.correo,
        "password":this.payload.password,
        "codigo":this.payload.codigo
    }
    this.registroService.validaCodigo(query).subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          Swal.fire({
            title: '¡Atención!',
            text: res.msg,
            icon: 'success',
            confirmButtonColor: '#6a1c32',
            confirmButtonText: 'Aceptar',
          });
          this.correoError = '';
          this.payload = {
            correo: '',
            password: '',
            codigo: '',
          };
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

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // <768px se considera pantalla chica
  }

  olvidePass(numero: number){
    this.cambioPassword = (numero === 0 ? false : true);
  }

  validaFormPass(): any{
    if (!this.isValidEmail(this.payload.correo)) { 
      this.correoError = 'Correo inválido. Usa el formato: nombre@dominio.com';
      return false
    }
    if((this.payload.cambiaPassword !== this.payload.cambiaPasswordB) 
        || (this.payload.cambiaPassword.trim() === '') 
        || (this.payload.cambiaPasswordB.trim() === undefined)){ 
          return false;
        }else{
          return true;
        }
  }
  
  cambiarPass(){
    this.existeCodigo = true;
    if(!this.validaFormPass()){
      Swal.fire({
        title: '¡Atención!',
        text: 'Ingrese los campos solicitados.',
        icon: 'error',
        confirmButtonColor: '#6a1c32',
        confirmButtonText: 'Aceptar',
      });
      console.log("aca entreval");
      return;
    }
    console.log("this.validaFormPass()");
    console.log(this.validaFormPass());
    const query = {
        "email":this.payload.correo,
        "password":this.payload.cambiaPassword,
        "password_confirmation": this.payload.cambiaPasswordB,
    }
    this.registroService.cambiarPass(query).subscribe(
      {
        next: (res:any)=>{
          console.log(res);
          Swal.fire({
            title: '¡Atención!',
            text: res.msg,
            icon: 'success',
            confirmButtonColor: '#6a1c32',
            confirmButtonText: 'Aceptar',
          });
          this.correoError = '';
          this.payload = {
            correo: '',
            password: '',
            codigo: '',
          };
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
}
