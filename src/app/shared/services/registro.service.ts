import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppPublic } from '../interfaces/app-public.interface';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
    baseUrl = environment.api;
    appUUID = environment.appUuid;
    sso = environment.ssoApi+'/apps/public/'+this.appUUID;
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
        return this.http.get<AppPublic>(`${this.api}/apps/public/${this.appUUID}`)
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

    getCatSexo(){
        return this.getQuery(`datosCatalogo/sexo`);
    }

    getCatPais(){
        return this.getQuery(`datosCatalogo/pais`);
    }

    getCatIde(){
        return this.getQuery(`datosCatalogo/identificacion`);
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

    guardarExtranjero(payload: any){
        return this.postQuery(`datosExtranjero/guardaExtranjero`, payload);
    }

    solicitarCodigo(payload: any){
        return this.postQuery(`datosUser/obtenercodigo`, payload);
    }

    validaCodigo(payload: any){
        return this.postQuery(`datosUser/validaCodigo`, payload);
    }

    cambiarPass(payload: any){
        return this.postQuery(`datosUser/olvidePassword`, payload);
    }

}