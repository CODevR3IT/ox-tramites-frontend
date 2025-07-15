import { Component } from '@angular/core';
import { PaginateQuery, OrderBy } from '../../shared/interfaces/paginate-query.interface';
import { Paginate } from '../../shared/interfaces/paginate.interface';
import { PaginationService } from '../../shared/services/pagination.service';
import { PaginateLaravel } from '../../shared/interfaces/laravel.paginate.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { Expediente } from './expedientes.interface';

@Component({
  selector: 'app-mis-expedientes',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './mis-expedientes.component.html',
  styles: ``
})
export class MisExpedientesComponent {
 public paginationQuery: PaginateQuery = {
    page: 1,
    limit: 10,
    filter: '',
    filterField: '',
    orderBy: OrderBy.ASC,
    orderField: '',
  };
  public paginationData: PaginateLaravel<Expediente> = { total: 0, last_page: 0, data: [] };
  constructor(private readonly paginationService: PaginationService,) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.paginationService
      .findAll<Expediente>('/public/expedientes', this.paginationQuery)
      .subscribe((data: PaginateLaravel<Expediente>) => (this.paginationData = data));
  }

  sort(sort: string){

  }
}
