import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { fadeInLeft } from 'ng-animate';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  fadeInLeft: any;
  steps: string[] = ["Inicio", "Detalles", "Confirmación", "Finalizado"];
  currentStep: number = 0;

  formData: any = {
    nombre: '',
    detalles: '',
    confirmado: false
  };

  nextStep() {
    if (this.validateStep()) {
      this.currentStep++;
    } else {
      alert('Por favor completa los datos requeridos antes de continuar.');
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
        return this.formData.nombre.trim() !== '';
      case 1:
        return this.formData.detalles.trim() !== '';
      case 2:
        return this.formData.confirmado === true;
      default:
        return true;
    }
  }

  confirmReset() {
    if (confirm('¿Estás seguro de que quieres reiniciar el formulario?')) {
      this.resetForm();
    }
  }

  resetForm() {
    this.formData = { nombre: '', detalles: '', confirmado: false };
    this.currentStep = 0;
  }
}
