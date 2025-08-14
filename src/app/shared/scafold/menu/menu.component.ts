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
     label: 'Inicio', iconClass: 'ti ti-users', route: '/inicio-tramite', hasSubmenu: false,
     hasChildren: false
   },
   {
     label: 'Trámites', iconClass: 'ti ti-folder', route: '/tramites', hasSubmenu: false,
     hasChildren: false
   },
   {
     label: 'Subtramites', iconClass: 'ti ti-folders', route: '/subtramites', hasSubmenu: false,
     hasChildren: false
   },
  ];
    closeDropdown(event: Event) {
   
    const target = event.target as HTMLElement;
    const dropdown = target.closest('#parentDropdown');
    if (dropdown) {
      const dropdownToggle = dropdown.previousElementSibling as HTMLElement;
      if (dropdownToggle && dropdownToggle.classList.contains('dropdown-toggle')) {
        dropdownToggle.click(); // Simula un clic para cerrar el dropdown
      }
    }
  }
}
