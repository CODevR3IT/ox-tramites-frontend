import { Component } from '@angular/core';
import { PaginateQuery, OrderBy } from '../../shared/interfaces/paginate-query.interface';
import { Paginate } from '../../shared/interfaces/paginate.interface';
import { PaginationService } from '../../shared/services/pagination.service';

@Component({
  selector: 'app-mis-expedientes',
  imports: [],
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
  //public paginationData: Paginate<> = { total: 0, totalPages: 0, data: [] };
  //constructor(private readonly paginationService: PaginationService,) {}
}
