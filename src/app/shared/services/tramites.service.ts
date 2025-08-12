import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppPublic } from '../interfaces/app-public.interface';


@Injectable({
    providedIn: 'root'
})
export class TramitesService {
    baseUrl = environment.api;
    appUUID = environment.appUuid;
    sso = environment.ssoApi + '/apps/public/' + this.appUUID;
    clientOax = environment.clientOax;
    private api = environment.ssoApi;
    private idApp = environment.appUuid;
    private app = {} as AppPublic;
    constructor(private http: HttpClient) {
    }

    getQuery(query: string) {
        const url = `${this.baseUrl}/${query}`;
        return this.http.get(url, {});
    }

    postQuery(query: string, payload: any) {
        const url = `${this.baseUrl}/${query}`;
        return this.http.post(url, payload, {});
    }

    patchQuery(query: string, payload: any) {
        const url = `${this.baseUrl}/${query}`;
        return this.http.patch(url, payload, {})
    }

    deleteQuery(query: string, payload: any) {
        const url = `${this.baseUrl}/${query}`;
        return this.http.delete(url, payload)
    }

    getApp(id: string = '') {
        return this.http.get<AppPublic>(`${this.api}/apps/public/${this.appUUID}`)
    }
    setApp(app: AppPublic) {
        this.app = app;
    }
    getAppData() {
        return this.app;
    }
    getUuidApp() {
        return this.idApp;
    }

    getToken(payload: any) {
        const url = `${this.clientOax}/api/auth/token`;
        return this.http.post(url, payload, {});
    }

    getTramitesCiud(payload: any, headers: any) {
        console.log('Bearer '+headers.access_token);
        const opciones = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+headers.access_token
            })
        };
        const url = `${this.clientOax}/api/v1/tramites?cve_mun=045&num_cta=123456`;
        return this.http.get(url, opciones);
    }

    postDireccion(payload: any) {
        return this.postQuery(`adeudos/vigentes`, payload);
    }

    getTramite() {
        return this.getQuery(`tramite`);
    }

    getTramiteID(payload: any) {
        return this.getQuery(`tramite/obten?id=${payload.id}`);
    }

    getTramiteEstatus() {
        return this.getQuery(`tramite/obten?estatus=true`);
    }

    guardarTramite(payload: any) {
        return this.postQuery(`tramite/crea`, payload);
    }

    actualizaTramiteID(payload: any) {
        return this.patchQuery(`tramite/actualiza`, payload);
    }

    borraTramiteID(id: any, httpOptions: any) {
        return this.deleteQuery(`tramite/borra?id=${id}`, httpOptions);
    }

    getsubTramite() {
        return this.getQuery(`subtramite`);
    }

    getsubTramiteID(payload: any) {
        return this.getQuery(`subtramite/obten?id=${payload.id}`);
    }

    guardarsubTramite(payload: any) {
        return this.postQuery(`subtramite/crea`, payload);
    }

    actualizasubTramiteID(payload: any) {
        return this.patchQuery(`subtramite/actualiza`, payload);
    }

    borrasubTramiteID(id: any, httpOptions: any) {
        return this.deleteQuery(`subtramite/borra?id=${id}`, httpOptions);
    }

    getCatTipoUsuario(){
        return this.getQuery(`catalogo/tipoUsuario`);
    }
}