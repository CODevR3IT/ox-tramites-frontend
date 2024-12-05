export interface Paginate<T> {
  total: number;
  totalPages: number;
  data: Array<T>;
}
