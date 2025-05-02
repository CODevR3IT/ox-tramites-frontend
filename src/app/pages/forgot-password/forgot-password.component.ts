import { CommonModule } from '@angular/common';
import { Component, inject, HostListener } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  getMessageError,
  isValidControl,
} from '../../shared/forms/input-validator';
import { ForgotPasswordDto } from '../../shared/interfaces/forgot-password.dto';
import { AuthService } from '../../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegistroService } from '../../shared/services/registro.service';
import Swal from 'sweetalert2';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',

})
export class ForgotPasswordComponent {
  private formBuilder = inject(FormBuilder);
  showPassword = false;
  repeatShowPassword = false;
  payload: any = {};
  restorePasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    token: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*\W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,12}$/
        ),
      ],
    ],
    password_confirmation: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*\W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,12}$/
        ),
      ],
    ],
  });

  isSmallScreen: boolean = false;
  hidePassword: boolean = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  
  constructor(private readonly authService: AuthService,
    private spinner: NgxSpinnerService,
    private registroService: RegistroService,
    private themeService: ThemeService
  ) { 
    this.checkScreenSize();
  }

  ngOnInit(){
    //this.spinner.show();
  }

  @HostListener('window:resize')
    onResize() {
      this.checkScreenSize();
    }
  
    private checkScreenSize() {
      this.isSmallScreen = window.innerWidth < 768; // <768px se considera pantalla chica
    }

  get isDarkMode(): boolean {
    return this.themeService.getTheme() === 'dark';
  }

  get tokenErrors() {
    return isValidControl(this.restorePasswordForm.get('token'));
  }
  get tokenMessageError() {
    return getMessageError(
      this.restorePasswordForm.get('token')?.errors,
      'Ingrese el código enviado al correo.'
    );
  }
  get emailErrors() {
    return isValidControl(this.restorePasswordForm.get('email'));
  }
  get emailMessageError() {
    return getMessageError(
      this.restorePasswordForm.get('email')?.errors,
      'correo electrónico'
    );
  }
  get passwordErrors() {
    return isValidControl(this.restorePasswordForm.get('password'));
  }
  get passwordMessageError() {
    return getMessageError(
      this.restorePasswordForm.get('password')?.errors,
      'contraseña',
      'La contraseña debe de tener mínimo 8 y máximo 12 caracteres con una letra mayúscula, minúscula, un simbolo y un número.'
    );
  }
  get password_confirmationErrors() {
    return isValidControl(this.restorePasswordForm.get('password_confirmation'));
  }
  get password_confirmationMessageError() {
    return getMessageError(
      this.restorePasswordForm.get('password_confirmation')?.errors,
      'contraseña',
      'La contraseña debe de tener mínimo 8 y máximo 12 caracteres con una letra mayúscula, minúscula, un simbolo y un número.'
    );
  }

  pedirCambioPassword() {
    const { email } = this.restorePasswordForm.value
    const query = {
      "email": email,
      "motivo": "olvido",
    }
    this.registroService.pedirCambioPassword(query).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.spinner.hide();
          Swal.fire({
            title: '¡Atención!',
            text: res.msg,
            icon: 'success',
            confirmButtonColor: '#6a1c32',
            confirmButtonText: 'Aceptar',
          });
        },
      }
    );
  }

  onSubmit() {
    if (this.restorePasswordForm.valid) {
      const body = this.restorePasswordForm.value as ForgotPasswordDto;
      this.authService.forgotPassword(body).subscribe();
    }
  }
}
