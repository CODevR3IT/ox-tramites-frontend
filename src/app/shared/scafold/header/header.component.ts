import { Component } from '@angular/core';
import { User } from '../../auth/interfaces/user.interface';
import { AuthService } from '../../auth/auth.service';
import { SsoService } from '../../services/sso.service';
import { AppPublic } from '../../interfaces/app-public.interface';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroService } from '../../services/registro.service';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Notificacion } from '../../interfaces/notificaciones.interface';
import { NgxJdenticonModule } from "ngx-jdenticon";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule, RouterModule, NgxJdenticonModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  img: string = '';
  theme: string;
  user: User = {} as User;
  app: AppPublic = {} as AppPublic;
  logedIn: boolean = false;
  notificaciones: Notificacion[] = [
    { titulo: 'Notificacion 1', mensaje: 'Mensaje de la notificacion 1 123123123123', badge: 'status-dot-animated bg-red' },
    { titulo: 'Notificacion 2', mensaje: 'Mensaje de la notificacion 2', badge: 'badge badge-success' },
    { titulo: 'Notificacion 3', mensaje: 'Mensaje de la notificacion 3', badge: 'badge badge-warning' },
    { titulo: 'Notificacion 4', mensaje: 'Mensaje de la notificacion 4', badge: 'badge badge-info' },
    { titulo: 'Notificacion 5', mensaje: 'Mensaje de la notificacion 5', badge: 'status-dot-animated bg-green' }
  ];
  constructor(private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly ssoService: SsoService,
    private readonly themeService: ThemeService,
    private pagosService: RegistroService,
    private router: Router
  ) {
    this.theme = this.themeService.getTheme();
    //this.user = authService.getUser();
    /*this.authService.getProfileBase64().subscribe((img) =>{
      this.img = img.img;
    });
    this.ssoService.getApp(this.ssoService.getUuidApp()).subscribe((res)=> this.app = res);*/
  }


  ngOnInit() {
    this.pagosService.getApp().subscribe(
      {
        next: (res: any) => {
          this.app = res

        },
        error: (err: any) => {
        }
      }
    );
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.logedIn = this.authService.isLoggedIn();
      }
    });
  }


  logout() {
    this.authService.logout();
  }

  cambiarPass() {
    this.router.navigate(['/olvide-password']);
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
    this.theme = this.themeService.getTheme();
  }
}
