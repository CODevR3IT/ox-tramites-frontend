import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import {
  getMessageError,
  isValidControl,
} from '../../shared/forms/input-validator';
import { AuthService } from '../../shared/auth/auth.service';
import { RestorePasswordDto } from '../../shared/interfaces/restore-password.dto';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './restore-password.component.html',

})
export class RestorePasswordComponent {
  private formBuilder = inject(FormBuilder);
  query: any = {};
  showPassword = false;
  repeatShowPassword = false;
  restorePasswordForm = this.formBuilder.group({
    token: ['', []],
    codigo: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*\W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,12}$/
        ),
      ],
    ],
    new_password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*\W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,12}$/
        ),
      ],
    ],
    new_password_confirmation: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*\W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,12}$/
        ),
      ],
    ],
  });
  constructor(
    private readonly authService: AuthService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.restorePasswordForm.controls['token'].setValue(params['t']);
    });

  }
  onSubmit() {
    const body = this.restorePasswordForm.value as RestorePasswordDto;
    console.log(body);
    this.authService.restorePassword(body).subscribe();
  }
  get codigoErrors() {
    return isValidControl(this.restorePasswordForm.get('codigo'));
  }
  get codigoMessageError() {
    return getMessageError(
      this.restorePasswordForm.get('codigo')?.errors,
      'Ingrese el código enviado al correo.'
    );
  }
  get emailErrors() {
    return isValidControl(this.restorePasswordForm.get('email'));
  }
  get emailMessageError(){
    return getMessageError(this.restorePasswordForm.get('email')?.errors, 'correo electrónico');
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
  get new_passwordErrors() {
    return isValidControl(this.restorePasswordForm.get('new_password'));
  }
  get new_passwordMessageError() {
    return getMessageError(
      this.restorePasswordForm.get('new_password')?.errors,
      'contraseña',
      'La contraseña debe de tener mínimo 8 y máximo 12 caracteres con una letra mayúscula, minúscula, un simbolo y un número.'
    );
  }
  get new_password_confirmationErrors() {
    return isValidControl(this.restorePasswordForm.get('new_password_confirmation'));
  }
  get new_password_confirmationMessageError() {
    return getMessageError(
      this.restorePasswordForm.get('new_password_confirmation')?.errors,
      'contraseña',
      'La contraseña debe de tener mínimo 8 y máximo 12 caracteres con una letra mayúscula, minúscula, un simbolo y un número.'
    );
  }
}