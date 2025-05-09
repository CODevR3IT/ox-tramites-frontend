import { Component } from '@angular/core';
import { Categoria } from './interfaces/tramites.interface';
import { MisTramitesService } from './mis-tramites.service';
import { RouterLink } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mis-tramites',
  standalone: true,
  imports: [RouterLink, NgbAccordionModule],
  templateUrl: './mis-tramites.component.html',
  styles: ``
})
export class MisTramitesComponent {
  categorias: Categoria[] = [];

  constructor(
    private readonly misTramitesService: MisTramitesService,
  ) { }

  ngOnInit(): void {
    this.misTramitesService.findAll().subscribe((res: Categoria[]) => {
      this.categorias = res;
    });
  }

}
