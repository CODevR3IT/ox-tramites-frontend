import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseMessage } from '../../shared/interfaces/response-message.interface';
import { tap } from 'rxjs';
import { responseSuccess } from '../../shared/helpers/response.helper';
import { Tramite } from './expediente-ciudadano.interface';
import { Categoria, TramiteCreate } from './expedientes.interface';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {
  api = environment.api;
  responseSuccess = responseSuccess();

  constructor(private readonly http: HttpClient) { }

  findOne(id: string) {
    return this.http.get<Tramite>(`${this.api}/ciudadano/tramites/${id}`);
  }

  getCategorias() {
    return this.http.get<Categoria[]>(`${this.api}/ciudadano/tramites/find-all/categorias`);
  }

  create(tramite: FormData) {
    return this.http.post<ResponseMessage>(`${this.api}/ciudadano/tramites`, tramite).pipe(tap(this.responseSuccess));
  }

  update(id: string, tramite: TramiteCreate) {	
    return this.http.patch<ResponseMessage>(`${this.api}/ciudadano/tramites/${id}`, tramite).pipe(tap(this.responseSuccess));
  }

  setMarkdown(id: string, markdown: string) {	
    return this.http.patch<ResponseMessage>(`${this.api}/ciudadano/tramites/markdown/${id}`, {markdown: markdown}).pipe(tap(this.responseSuccess));
  }
  
  getMarkdown(id: string) {
    return this.http.get<string>(`${this.api}/ciudadano/tramites/markdown/${id}`);
  }
}
