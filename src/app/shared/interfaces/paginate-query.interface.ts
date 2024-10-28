export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface PaginateQuery {
  page: number;
  limit?: number;
  filterField?: string;
  filter?: string;
  orderField?: string;
  orderBy?: OrderBy;
}
