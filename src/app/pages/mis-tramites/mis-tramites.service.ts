import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Categoria } from './interfaces/tramites.interface';
import { CamundaForm } from '../../shared/components/camunda-form/camunda-form.interface';

@Injectable({
  providedIn: 'root'
})
export class MisTramitesService {
  api = environment.api;

  constructor(
    private readonly http: HttpClient
  ) { }

  findAll() {
    return this.http.get<Categoria[]>(`${this.api}/tramites`);
  }

  findStartForm(id: string) {
    return this.http.get<CamundaForm>(`${this.api}/tramites/start-form/${id}`);
  }
}
