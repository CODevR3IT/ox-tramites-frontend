import { Component, inject } from '@angular/core';
import { Notification } from '../../interfaces/notification.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [],
  templateUrl: './notification-modal.component.html',
  styles: ``
})
export class NotificationModalComponent {
  activeModal = inject(NgbActiveModal);
  notification: Notification = {} as Notification;

}
