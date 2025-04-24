import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SsoService } from '../../shared/services/sso.service';
import {
  getMessageError,
  isValidControl,
} from '../../shared/forms/input-validator';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  
})
export class ForgotPasswordComponent {
  private formBuilder = inject(FormBuilder);

  restorePasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  constructor(private readonly authService: AuthService) {}

  get emailErrors() {
    return isValidControl(this.restorePasswordForm.get('email'));
  }
  get emailMessageError() {
    return getMessageError(
      this.restorePasswordForm.get('email')?.errors,
      'correo electrónico'
    );
  }
  onSubmit() {
    if (this.restorePasswordForm.valid) {
      const { email } = this.restorePasswordForm.value;
      this.authService.forgotPassword(email!).subscribe();
    }
  }
}
