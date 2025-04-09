import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppPublic } from '../interfaces/app-public.interface';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
    baseUrl = environment.api;
    //appUUID = environment.appUUID;
    //sso = environment.ssoApi+'/apps/public/'+this.appUUID;
    private api = environment.ssoApi;
    private idApp = environment.appUuid;
    private app = {} as AppPublic;
    constructor( private http: HttpClient) { 
    }

    getQuery(query: string){
        const url = `${ this.baseUrl }/${ query }`;
        return this.http.get(url, { });
    }

    postQuery(query: string, payload: any){
        const url = `${ this.baseUrl }/${ query }`;
        return this.http.post(url, payload ,{ });
    }

    patchQuery(query: string, payload: any){
        const url = `${ this.baseUrl }/${ query }`;
        return this.http.patch(url, payload, { })
    }

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

    postDireccion(payload: any){
        return this.postQuery(`adeudos/vigentes`, payload);
    }

    getCP(cp: any){
        return this.getQuery(`datosCp/${ cp }`);
    }

    getCURP(curp: any){
        return this.getQuery(`datosCURP/${ curp }`);
    }

    guardar(payload: any){
        return this.postQuery(`datosCiudadano/guardaCiudadano`, payload);
    }
}