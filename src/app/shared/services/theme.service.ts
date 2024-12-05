import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  constructor() {
    this.setTheme();
   }
  toggleDarkMode(){
    this.darkMode = !this.darkMode;
    this.setTheme();
  }
  setTheme(){
    const body=document.body as HTMLElement
    body.setAttribute('data-bs-theme',this.getTheme());
  }
  getTheme(): string{
    return this.darkMode ? 'dark':'light';
  }
}
