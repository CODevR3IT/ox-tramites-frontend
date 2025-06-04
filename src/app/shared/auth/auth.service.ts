import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProfileImg, User } from './interfaces/user.interface';
import { StorageService } from '../services/storage.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { RestorePasswordDto } from '../interfaces/restore-password.dto';
import { ResponseMessage } from '../interfaces/response-message.interface';
import { responseSuccess } from '../helpers/response.helper';
import { ChangePasswordDto } from '../interfaces/change-password.dto';
import { ForgotPasswordDto } from '../interfaces/forgot-password.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions: any;
  payload: any = {};
  private apiUrl = environment.api;
  private readonly TOKEN_KEY = '_accessToken' + environment.clientKey;
  private readonly REFRESH_TOKEN_KEY = '_refreshToken' + environment.clientKey;
  private readonly USER_DATA_KEY = '_userData' + environment.clientKey;
  private isAuthenticated = false;
  private redirectUrl: string | null = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  responseSuccess = responseSuccess();
  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {}

  login(email: string, password: string) {
    //this.setAccessToken(accessToken);
    return this.http
      .post<User>(`${this.apiUrl}/login/login`, {
        email,
        password
      })
      .pipe(
        tap((user) => {
          if (user.token) {
            this.setSession(user);
          }
        })
      );
  }

  logout() {
    this.storageService.clearData();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
    /*this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        Authorization: 'Bearer '+this.payload.token,
      })
    };

    /*return this.http
      .post<User>(`${this.apiUrl}/login/logout`, {}, this.httpOptions)
      .pipe(
        tap((res:any) => {
          if (res.message === "Sesión cerrada exitosamente") {
            this.payload = {};
            this.router.navigate(['/login']);
          }
        })
      );*/
    //window.location.href = `${environment.loginUrl}/login/${environment.appUuid}`;
    
  }

  isLoggedIn() {
    this.accessToken = this.getAccessToken();
    return !!this.accessToken;
  }

  getAccessToken(): string | null {
    return this.storageService.getData(this.TOKEN_KEY);
  }
  setAccessToken(accessToken: string) {
    this.storageService.saveData(this.TOKEN_KEY, accessToken);
  }

  getUser(): User {
    let { user: {
      idU,
      email,
      ciudadano:{
          idC,
          curp,
          nombre,
          primer_apellido,
          segundo_apellido,
      }
    },sub, full_name, role, rolekey, access_token, token } = JSON.parse(
      this.storageService.getData(this.USER_DATA_KEY)
    );
    let user: User = {
      user: {
        idU,
        email,
        ciudadano:{
            idC,
            curp,
            nombre,
            primer_apellido,
            segundo_apellido,
        }
      },
      sub,
      full_name,
      access_token,
      role,
      rolekey,
      token
    };
    return user;
  }
  private setSession(user: User) {
    //this.storageService.saveData('usuario', { nombre: 'Carlos', token: '123' });
    this.storageService.saveData(this.TOKEN_KEY, user.token);
    this.storageService.saveData(this.USER_DATA_KEY, JSON.stringify(user));
    const usuario = this.storageService.getData('usuario');
    this.payload.token = user.token;
    this.isAuthenticated = true;
    this.router.navigate(['/inicio']);
  }
  getProfileBase64() {
    return this.http.get<ProfileImg>(`${this.apiUrl}/auth/profile-img`);
  }

  forgotPassword(body: ForgotPasswordDto){
    return this.http.post<ResponseMessage>(`${this.apiUrl}/datosUser/olvidePasswordT`, body).pipe(tap((res) => this.responseSuccess(res).then(() =>  this.router.navigate(['/login']))));
  }
  restorePassword(body: RestorePasswordDto){
    return this.http.post<ResponseMessage>(`${this.apiUrl}/datosUser/cambiaPassword`, body).pipe(tap((res) => this.responseSuccess(res).then(() =>  this.router.navigate(['/login']))));
  }
  changePassword(body: ChangePasswordDto){
    return this.http.patch<ResponseMessage>(`${this.apiUrl}/auth/reset-password`, body).pipe(tap((res) => this.responseSuccess(res).then(() =>  this.router.navigate(['/login']))));
  }
}
