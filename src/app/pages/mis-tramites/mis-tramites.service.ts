import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Categoria } from './interfaces/tramites.interface';
import { CamundaForm } from '../../shared/components/camunda-form/camunda-form.interface';
import { ResponseMessage } from '../../shared/interfaces/response-message.interface';
import { tap } from 'rxjs';
import { responseSuccess } from '../../shared/helpers/response.helper';

@Injectable({
  providedIn: 'root'
})
export class MisTramitesService {
  api = environment.api;
  responseSuccess = responseSuccess();
  constructor(
    private readonly http: HttpClient
  ) { }

  findAll() {
    return this.http.get<Categoria[]>(`${this.api}/public/tramites`);
  }

  findStartForm(id: string) {
    return this.http.get<CamundaForm>(`${this.api}/public/tramites/start-form/${id}`);
  }

  definitionSubmitForm(id:string, payload:any){
    return this.http.post<ResponseMessage>(`${this.api}/public/tramites/submit-form/${id}`, payload).pipe(tap(this.responseSuccess));;
  }
  getMarkdown(id: string) {
    return this.http.get<string>(`${this.api}/public/tramites/markdown/${id}`);
  }
}
