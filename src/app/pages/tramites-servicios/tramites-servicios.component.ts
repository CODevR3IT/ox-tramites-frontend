import { Component, Input } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from '../mis-tramites/interfaces/tramites.interface';
import { MisTramitesService } from '../mis-tramites/mis-tramites.service';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tramites-servicios',
  imports: [NgbAccordionModule,RouterLink],
  templateUrl: './tramites-servicios.component.html',
  styles: ``
})
export class TramitesServiciosComponent {
  @Input() categorias: Categoria[] = [];
  fileEndpoint = environment.fileEndpoint + '/files/';
  constructor(
    private readonly misTramitesService: MisTramitesService,
  ) { }

  ngOnInit(): void {
  }
}