import { Component, Input } from '@angular/core';
import { CamundaComponent } from '../camunda-form.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';
import { validTypes } from './camunda-form-constants';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CamundaFormService } from '../camunda-form.service';
import { environment } from '../../../../../environments/environment';
import { SimpleDateAdapter, SimpleDateParserFormatter } from './simple-date.adapter';
import { getMessageError, isValidControlClass } from './input-validator';


@Component({
  selector: 'app-camunda-form-component',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './camunda-form-component.component.html',
  styles: ``,
  providers: [provideNgxMask(),
  { provide: NgbDateAdapter, useClass: SimpleDateAdapter },
  { provide: NgbDateParserFormatter, useClass: SimpleDateParserFormatter }
  ],
})
export class CamundaFormComponentComponent {
  @Input() component!: CamundaComponent;
  @Input() form!: FormGroup;
  file: File | null = null;
  isFileUploaded: boolean = false;

  constructor(private readonly cfs: CamundaFormService) {
  }

  get componentError() {
    if(this.component.type === 'filepicker'){
      return this.isFileUploaded && this.form.controls[this.component.key!].valid ? 'is-valid' :'is-invalid';
    }
    return isValidControlClass(this.form.controls[this.component.key!]);
  }

  get messageError(){
    if(this.component.type === 'filepicker'){
      return this.isFileUploaded && this.form.controls[this.component.key!].valid ? '' :'Debes de cargar un archivo';
    }
    return getMessageError(this.form.controls[this.component.key!]?.errors, this.component.label && this.component.label.toLowerCase(), '')
  }

  get textComponent() {
    if (this.component.type === 'text' && this.component.text) {
      const text = this.component.text.trim();
      const match = text.match(/^#+/);
      if (match) {
        const level = match[0].length; // Cuenta cuántos # hay
        const content = text.replace(/^#+/, '').trim();
        return `<h${level}>${content}</h${level}>`; 
      }
      return `<span>${text}</span>`; 
    }
    return '';
  }

  protected onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList.item(0);

    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file!);
    formData.append('usuario', 'public');
    formData.append('app_id', environment.appUuid);
    this.cfs.uploadFile(formData).subscribe((res) => {
      this.isFileUploaded = true;
      this.form.controls[this.component.key!].setValue(res.file);
    });

  }

}
