import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode: boolean;

  constructor() {
    this.darkMode = this.loadTheme();
    this.setTheme();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.saveTheme();
    this.setTheme();
  }

  setTheme() {
    const body = document.body as HTMLElement;
    body.setAttribute('data-bs-theme', this.getTheme());
  }

  getTheme(): string {
    return this.darkMode ? 'dark' : 'light';
  }

  private saveTheme() {
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }

  private loadTheme(): boolean {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    // Si no hay un tema guardado, usar el valor por defecto del sistema
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}