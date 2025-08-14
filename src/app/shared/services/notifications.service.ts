import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Notification } from '../interfaces/notification.interface';
import { ResponseMessage } from '../../shared/interfaces/response-message.interface';

@Injectable({
  providedIn: 'root'
})

export class NotificationServices {
  private api = environment.ssoApi;

  constructor(private readonly http: HttpClient) { }

  getNotifications() {
    return this.http.get<Notification[]>(`${this.api}/notifications`)
  }

  markAsReadNotifications(id: string) {
    return this.http.patch<ResponseMessage>(`${this.api}/notifications/read/${id}`, {});
  }
}