import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CamundaForm } from '../../shared/components/camunda-form/camunda-form.interface';
import { PaginateLaravel } from '../../shared/interfaces/laravel.paginate.interface';
import { tap } from 'rxjs';
import { responseSuccess } from '../../shared/helpers/response.helper';
import { ResponseMessage } from '../../shared/interfaces/response-message.interface';
import { Tarea } from '../mis-expedientes/expedientes.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  api = environment.api;
   responseSuccess = responseSuccess();
  constructor(private readonly http: HttpClient) { }

  completeTask(idExpediente: string, body: any){
    return this.http.post<ResponseMessage>(`${this.api}/tareas/complete/externo/${idExpediente}`, body).pipe(tap(this.responseSuccess));
  }

  getTaskForm(key:string){
    return this.http.get<CamundaForm>(`${this.api}/tareas/find-form/${key}`);
  }

  findById(id: string) {
    return this.http.get<Tarea[]>(`${this.api}/tareas/tramite/${id}`);
  }
}
