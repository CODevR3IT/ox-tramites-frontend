import { Component, inject } from '@angular/core';
import { User } from '../../auth/interfaces/user.interface';
import { AuthService } from '../../auth/auth.service';
import { SsoService } from '../../services/sso.service';
import { AppPublic } from '../../interfaces/app-public.interface';
import { ChangePasswordComponent } from '../../auth/change-password/change-password.component';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Notification } from '../../interfaces/notification.interface';
import { NotificationServices } from '../../services/notifications.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationModalComponent } from '../../modals/notification-modal/notification-modal.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgbTooltipModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  private modalService = inject(NgbModal);
  img: string = '';
  theme: string;
  user: User;
  app: AppPublic = {} as AppPublic;
  notificaciones: Notification[] = [];

  constructor(private readonly authService: AuthService,
    private readonly ssoService: SsoService,
    private router: Router,
    private readonly notificationService: NotificationServices,
    private readonly themeService: ThemeService,
  ) {
    this.theme = this.themeService.getTheme();
    this.user = authService.getUser();
    this.authService.getProfileBase64().subscribe((img) => {
      this.img = img.img;
    });
    this.ssoService.getApp(this.ssoService.getUuidApp()).subscribe((res) => this.app = res);
    this.getNotifications();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.user = this.authService.getUser();
        this.getNotifications();
      }
    });
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notificaciones = res;
    });
  }

  markAsReadNotification(notificacion: Notification) {
    const modalRef = this.modalService.open(NotificationModalComponent, {
      windowClass: 'modal',
      backdrop: 'static'
    });

    modalRef.componentInstance.notification = notificacion;

    modalRef.result.then((result) => {
      if (notificacion.readedAt) return;
      this.notificationService.markAsReadNotifications(notificacion.id).subscribe(() => {
        this.getNotifications();
      });
    });
  }

  get notReadNotifications() {
    return this.notificaciones.filter(notification => !notification.readedAt).length;
  }

  changePassword() {
    const modalRef = this.modalService.open(ChangePasswordComponent, {
      windowClass: 'modal',
      backdrop: 'static'
    });

    modalRef.result.then((result) => {
    });
  }

  logout() {
    this.authService.logout();
  }
  toggleTheme() {
    this.themeService.toggleDarkMode();
    this.theme = this.themeService.getTheme();
  }
}
