import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Menu } from '../../../shared/interfaces/menu.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expediente-view',
  standalone: true,
  imports: [RouterOutlet, RouterModule,CommonModule],
  templateUrl: './expediente-view.component.html',
  styles: ``
})
export class ExpedienteViewComponent {
processMenu: Menu[] = [
    { label: 'Datos Generales', route: 'general', iconClass: 'ti ti-settings', hasSubmenu: false, hasChildren: false },
    { label: 'Oficios', route: 'oficios', iconClass: 'ti ti-file-text', hasSubmenu: false, hasChildren: false },
    { label: 'Diagrama', route: 'bpmn', iconClass: 'ti ti-sitemap', hasSubmenu: false, hasChildren: false },
    { label: 'Trazabilidad', route: 'trazabilidad', iconClass: 'ti ti-timeline', hasSubmenu: false, hasChildren: false },
  ];
}
