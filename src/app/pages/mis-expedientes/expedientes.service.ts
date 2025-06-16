import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExpedienteCiudadano } from './expediente-ciudadano.interface';
import { ProcessXml, OficioExpediente, ExpedienteTrazabilidad } from './expedientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {
 api = environment.api;
  constructor(private readonly http: HttpClient) { }
   findXml(id:String){
    return this.http.get<ProcessXml>(`${this.api}/expedientes/find-xml/${id}`);
  }

  findById(id: String) {
    return this.http.get<ExpedienteCiudadano>(`${this.api}/expedientes/${id}`);
  }

  findOficios(id: String) {
    return this.http.get<OficioExpediente>(`${this.api}/oficios/expediente/${id}`);
  }

  findTrazabilidad(id: String) {
    return this.http.get<ExpedienteTrazabilidad>(`${this.api}/expedientes/trazabilidad/${id}`);
  }
}
