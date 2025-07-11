import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild, HostListener, inject } from '@angular/core';
import { fadeInLeft } from 'ng-animate';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { isValidControl, getMessageError } from '../../shared/forms/input-validator';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { RegistroService } from '../../shared/services/registro.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))]),
  ],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  payload: any = {
    correo: '',
    password: ''
  };
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        // Validators.pattern(
        //   /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        // ),
      ],
    ],
  });

  fadeInLeft: any;
  isSmallScreen: boolean = false;
  showPassword: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private spinner: NgxSpinnerService,
  ) {
    this.checkScreenSize();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  get emailErrors() {
    return isValidControl(this.loginForm.get('email'));
  }
  get emailMessageError() {
    return getMessageError(this.loginForm.get('email')?.errors, 'correo electrónico');
  }
  get passwordErrors() {
    return isValidControl(this.loginForm.get('password'));
  }
  get passwordMessageError() {
    return getMessageError(this.loginForm.get('password')?.errors, 'contraseña', 'La contraseña debe de tener mínimo 6 caracteres con una letra mayúscula, minúscula y un número.');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // <768px se considera pantalla chica
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email!, password!).subscribe();
    }
  }
}
