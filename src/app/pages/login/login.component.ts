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

  constructor(
    private spinner: NgxSpinnerService,
  ){}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // <768px se considera pantalla chica
  }

}
