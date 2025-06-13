import { Component } from '@angular/core';
import { MisTramitesService } from '../../mis-tramites.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  cargaComponents: boolean = false;
  camundaComponents: CamundaComponent[] = [];

  constructor(
    private readonly misTramitesService: MisTramitesService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router

  ) { }

  ngOnInit(): void {
    this.idTramite = this.activateRoute.snapshot.paramMap.get('id') || '';
    this.misTramitesService.findStartForm(this.idTramite).subscribe((res: CamundaForm) => {
      this.camundaComponents = res.components;
      this.cargaComponents = true;
    });
  }

  onSubmit(event: any): void {
    this.misTramitesService.definitionSubmitForm(this.idTramite, event).subscribe((res) => {
      this.router.navigate(['/inicio']);
    });
  }

  cancel() {
    this.router.navigate(['/inicio']);
  }

}
