import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { isValidControl, getMessageError } from '../../forms/input-validator';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styles: ``
})
export class ChangePasswordComponent {
  activeModal = inject(NgbActiveModal);
  private formBuilder = inject(FormBuilder);
  showOldPassword = false;
  showNewPassword = false;
  showRepeatPassword = false;

  constructor(
    private readonly authService: AuthService,
  ) { }

  updatePasswordForm: FormGroup = this.formBuilder.group({
    oldPassword: [
      '',
      [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=\S)(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])\S*$/)],
    ],
    newPassword: [
      '',
      [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=\S)(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])\S*$/)],
    ],
    repeatPassword: [
      '',
      [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=\S)(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])\S*$/)],
    ],
  });

  get oldPasswordError() {
    return isValidControl(this.updatePasswordForm.get('oldPassword'));
  }
  get oldPasswordErrorMessage() {
    return getMessageError(this.updatePasswordForm.get('oldPassword')?.errors, 'contraseña actual', 'Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial, sin espacios.');
  }
  get newPasswordError() {
    return isValidControl(this.updatePasswordForm.get('newPassword'));
  }
  get newPasswordErrorMessage() {
    return getMessageError(this.updatePasswordForm.get('newPassword')?.errors, 'nueva contraseña', 'Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial, sin espacios.');
  }
  get repeatPasswordError() {
    return isValidControl(this.updatePasswordForm.get('repeatPassword'));
  }
  get repeatPasswordErrorMessage() {
    return getMessageError(this.updatePasswordForm.get('repeatPassword')?.errors, 'repetir contraseña', 'Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial, sin espacios.');
  }

  submit() {
    this.authService
      .changePassword(this.updatePasswordForm.value)
      .subscribe((res) => {
        this.activeModal.close();
      });
  }

}
