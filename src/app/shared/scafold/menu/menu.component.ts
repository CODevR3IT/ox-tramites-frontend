import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styles: ``,
})
export class MenuComponent {
  public menus: Menu[] = [
   {
     label: 'Home', iconClass: 'ti ti-home', route: '/', hasSubmenu: false,
     hasChildren: false
   },
   {
     label: 'Trámite', iconClass: 'ti ti-home', route: '/tramites', hasSubmenu: false,
     hasChildren: false
   },
   {
     label: 'Subtramite', iconClass: 'ti ti-home', route: '/subtramites', hasSubmenu: false,
     hasChildren: false
   },
   {
     label: 'Tramite del ciudadano', iconClass: 'ti ti-home', route: '/contribuyente-tramite', hasSubmenu: false,
     hasChildren: false
   },
  ];
}
