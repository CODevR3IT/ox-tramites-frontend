import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { fadeInLeft } from 'ng-animate';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistroService } from '../../shared/services/registro.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))]),
  ],
})
export class LoginComponent {
  payload:any = {
    correo: '',
    password: ''
  };
  fadeInLeft: any;
  isSmallScreen: boolean = false;
  showPassword: boolean = false;
  valida: boolean = false;
  correoError: string = '';
  cambioPassword: boolean = true;

  constructor(
    private spinner: NgxSpinnerService,
  ){}

  validaForm(): any{
    this.correoError = '';
    if (!this.isValidEmail(this.payload.correo)) { 
      this.correoError = 'Correo inválido. Usa el formato: nombre@dominio.com';
      return false;
    }
    // if(this.existeCodigo){
    //   console.log("aca entre2");
    //   return this.valida = (this.payload.correo !== '' && this.payload.password !== '' && this.payload.codigo !== '' ? true : false);
    // }else{
    //   console.log("aca entre3");
    //   return this.valida = (this.payload.correo !== '' && this.payload.password !== '' ? true : false);
    // }
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // <768px se considera pantalla chica
  }


  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
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

}
