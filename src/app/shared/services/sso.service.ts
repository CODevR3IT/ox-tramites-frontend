import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppPublic } from '../interfaces/app-public.interface';


@Injectable({
  providedIn: 'root'
})
export class SsoService {
  private api = environment.ssoApi;
  private idApp = environment.appUuid;
  private app = {} as AppPublic;
  constructor(private readonly http: HttpClient) { }

  getApp(id: string = ''){
    return this.http.get<AppPublic>(`${this.api}/apps/public/${id}`)
  }
  setApp(app: AppPublic){
    this.app = app;
  }
  getAppData(){
    return this.app;
  }
  getUuidApp(){
    return this.idApp;
  }
}
