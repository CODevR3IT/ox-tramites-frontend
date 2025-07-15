import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { ProcessXml, OficioExpediente, ExpedienteTrazabilidad, Expediente } from './expedientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {
 api = environment.api;
  constructor(private readonly http: HttpClient) { }
   findXml(id:String){
    return this.http.get<ProcessXml>(`${this.api}/public/expedientes/find-xml/${id}`);
  }

  findById(id: String) {
    return this.http.get<Expediente>(`${this.api}/public/expedientes/${id}`);
  }

  findOficios(id: String) {
    return this.http.get<OficioExpediente>(`${this.api}/public/oficios/expediente/${id}`);
  }

  findTrazabilidad(id: String) {
    return this.http.get<ExpedienteTrazabilidad>(`${this.api}/public/expedientes/trazabilidad/${id}`);
  }
}
