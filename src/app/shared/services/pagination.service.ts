import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginateQuery } from '../interfaces/paginate-query.interface';
import { Paginate } from '../interfaces/paginate.interface';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private apiUrl: string = environment.api;
  constructor(private readonly http: HttpClient) { }

  findAll<T>(urlPage: string,query: PaginateQuery){
    return this.http.get<Paginate<T>>(`${this.apiUrl}${urlPage}`, {params: {...query}})
  }
}
