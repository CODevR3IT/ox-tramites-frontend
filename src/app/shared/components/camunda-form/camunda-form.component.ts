import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CamundaFormComponentComponent } from './camunda-form-component/camunda-form-component.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CamundaComponent } from './camunda-form.interface';
import { CamundaFormService } from './camunda-form.service';


@Component({
  selector: 'app-camunda-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CamundaFormComponentComponent],
  templateUrl: './camunda-form.component.html',
  styles: ``,
})
export class CamundaFormComponent {
  @Input() components: CamundaComponent[] | null = [];
  @Input() buttonText: string = 'Enviar';
  @Output() onSubmitForm = new EventEmitter<any>();
  form!: FormGroup;
  @Input() payLoad = {};
  constructor(private cfs: CamundaFormService) {}
  ngOnInit() {
    this.form = this.cfs.toFormGroup(
      this.components as CamundaComponent[],
      this.payLoad
    );
  }
  onSubmit() {
    this.onSubmitForm.emit(this.form.value);
  }

}
