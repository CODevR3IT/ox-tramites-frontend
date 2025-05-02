import { Component } from '@angular/core';
import { MisTramitesService } from '../../mis-tramites.service';
import { ActivatedRoute } from '@angular/router';
import { CamundaComponent, CamundaForm } from '../../../../shared/components/camunda-form/camunda-form.interface';
import { CamundaFormComponent } from '../../../../shared/components/camunda-form/camunda-form.component';


@Component({
  selector: 'app-inicio-tramite',
  standalone: true,
  imports: [CamundaFormComponent],
  templateUrl: './inicio-tramite.component.html',
  styles: ``
})
export class InicioTramiteComponent {
  idTramite: string = '';
  camundaComponents: CamundaComponent[] = [];

  constructor(
    private readonly misTramitesService: MisTramitesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idTramite = this.route.snapshot.paramMap.get('id') || '';
    this.misTramitesService.findStartForm(this.idTramite).subscribe((res: CamundaForm) => this.camundaComponents = res.components);
  }

  onSubmit(event: any): void {
   /* console.log(event);
    this.misTramitesService.startProcess(this.idTramite, event).subscribe((res: any) => {
      console.log(res);
    });*/
  }

}
