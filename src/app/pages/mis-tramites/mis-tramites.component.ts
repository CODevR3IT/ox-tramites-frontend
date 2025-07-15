import { Component, Input } from '@angular/core';
import { Categoria } from './interfaces/tramites.interface';
import { MisTramitesService } from './mis-tramites.service';
import { RouterLink } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-tramites',
  standalone: true,
  imports: [RouterLink, NgbAccordionModule, CommonModule],
  templateUrl: './mis-tramites.component.html',
  styles: ``
})
export class MisTramitesComponent {
  @Input() categorias: Categoria[] = [];
  fileEndpoint = environment.fileEndpoint + '/files/';
  constructor(
  ) { }

  ngOnInit(): void {
    
  }

}
