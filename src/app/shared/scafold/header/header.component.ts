import { Component } from '@angular/core';
import { User } from '../../auth/interfaces/user.interface';
import { AuthService } from '../../auth/auth.service';
import { SsoService } from '../../services/sso.service';
import { AppPublic } from '../../interfaces/app-public.interface';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  img: string = '';
  theme: string;
  user: User = {} as User;
  app: AppPublic = {} as AppPublic;
  constructor(private readonly authService: AuthService,
    private readonly ssoService: SsoService,
    private readonly themeService: ThemeService,
  ){
    this.theme = this.themeService.getTheme(); 
    //this.user = authService.getUser();
    /*this.authService.getProfileBase64().subscribe((img) =>{
      this.img = img.img;
    });
    this.ssoService.getApp(this.ssoService.getUuidApp()).subscribe((res)=> this.app = res);*/
  }

  logout(){
    this.authService.logout();
  }
  toggleTheme(){
    this.themeService.toggleDarkMode();
    this.theme = this.themeService.getTheme(); 
  }
}
