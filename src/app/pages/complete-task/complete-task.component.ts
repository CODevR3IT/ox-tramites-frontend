import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaFormComponent } from '../../shared/components/camunda-form/camunda-form.component';
import { CamundaComponent } from '../../shared/components/camunda-form/camunda-form.interface';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { DataGeneral, Expediente, Tramite } from '../mis-expedientes/expedientes.interface';
import { ExpedientesService } from '../mis-expedientes/expedientes.service';
import { TramitesService } from '../mis-expedientes/tramites.service';
import { TasksService } from './tasks.service';
import { CamundaVariable } from '../../shared/interfaces/camunda.interface';



@Component({
  selector: 'app-complete-task',
  imports: [CamundaFormComponent, DataGridComponent],
  templateUrl: './complete-task.component.html',
  styles: ``
})
export class CompleteTaskComponent {
  expedienteId: string = '';
  components: CamundaComponent[] = [];
  camundaVariables: CamundaVariable[] = [];
  dataExpediente: Expediente = {} as Expediente;
  dataTramite: Tramite = {} as Tramite;
  dataGeneral: DataGeneral[] = [];
  payload = {};
  tareaTitulo = '';
  constructor(private readonly route: ActivatedRoute,
    private readonly tasksService: TasksService,
    private readonly expedientesService: ExpedientesService,
    private readonly tramiteService: TramitesService,

    private router: Router,
  ) { }
  ngOnInit() {
    this.expedienteId = this.route.snapshot.paramMap.get('id') || '';
    this.expedientesService.findById(this.expedienteId).subscribe((res) => {
      this.dataExpediente = res;
      this.tareaTitulo = this.dataExpediente.tarea!.tarea;
      this.getDataTramite(this.dataExpediente.tramite.id);
      this.tasksService.getTaskForm(this.dataExpediente.tarea!.tarea_key).subscribe((res) => this.components = res.components);
    });

  }
  getDataTramite(id: string) {
    this.tramiteService.findOne(id).subscribe((res: Tramite) => {
      this.dataTramite = res;
      this.dataGeneral = this.dataExpediente.tramite_data;
    });
  }
  onSubmit(payload: any) {
    this.tasksService.completeTask(this.expedienteId, payload).subscribe((res) => {
      this.router.navigate(['/']);
    });
  }
} 
