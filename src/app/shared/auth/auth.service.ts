import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProfileImg, User } from './interfaces/user.interface';
import { StorageService } from '../services/storage.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ResponseMessage } from '../interfaces/response-message.interface';
import { ChangePasswordDto } from '../interfaces/change-password.dto';
import { responseSuccess } from '../helpers/response.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.ssoApi;
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

  login(accessToken: string) {
    this.setAccessToken(accessToken);
    return this.http
      .get<User>(`${this.apiUrl}/auth/profile`, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .pipe(
        tap((user) => {
          if (user.access_token) {
            this.setSession(user);
          }
        })
      );
  }

  logout() {
    this.storageService.clearData();
    this.isAuthenticated = false;
    window.location.href = `${environment.loginUrl}/login/${environment.appUuid}`;
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
    let { sub, email, full_name, role, rolekey, access_token } = JSON.parse(
      this.storageService.getData(this.USER_DATA_KEY)
    );
    let user: User = {
      sub,
      email,
      full_name,
      access_token,
      role,
      rolekey,
    };
    return user;
  }
  private setSession(user: User) {
    this.storageService.saveData(this.TOKEN_KEY, user.access_token);
    this.storageService.saveData(this.USER_DATA_KEY, JSON.stringify(user));
    this.isAuthenticated = true;
    this.router.navigate(['/tramites']);
  }
  getProfileBase64() {
    return this.http.get<ProfileImg>(`${this.apiUrl}/auth/profile-img`);
  }
   changePassword(body: ChangePasswordDto){
    return this.http.patch<ResponseMessage>(`${this.apiUrl}/auth/reset-password`, body).pipe(tap((res) => this.responseSuccess(res).then(() => {} )));
  }
}
