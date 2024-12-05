import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private clientKey: string = environment.clientKey;
  constructor() {}
  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }
  public getData(key: string) {
    const data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }
  private encrypt(message: string): string {
    return CryptoJS.AES.encrypt(message, this.clientKey).toString();
  }
  private decrypt(cryptMessage: string) {
    return CryptoJS.AES.decrypt(cryptMessage, this.clientKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
