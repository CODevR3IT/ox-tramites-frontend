import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CamundaComponent } from './camunda-form.interface';
import { validTypes } from './camunda-form-component/camunda-form-constants';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
export interface FilesResponse {
  file: string;
}

@Injectable({
  providedIn: 'root',
})
export class CamundaFormService {
  constructor(private readonly http: HttpClient) {}

  toFormGroup(components: CamundaComponent[], data: any) {
    const group: any = {};
    components.forEach((component) => {
      if (validTypes.includes(component.type)) {
        const validators = [];
        if(component.validate?.required) validators.push(Validators.required);
        if(component.validate?.pattern) validators.push(Validators.pattern(component.validate?.pattern));
        if(component.validate?.maxLength) validators.push(Validators.maxLength(component.validate?.maxLength));
        if(component.validate?.minLength) validators.push(Validators.minLength(component.validate?.minLength));
        group[component.key] = new FormControl(data[component.key!] || '',validators);
      }
    });
    return new FormGroup(group);
  }

  uploadFile(payload:FormData){
    return this.http.post<FilesResponse>(`${environment.fileEndpoint}/files`, payload);
  }

}
