import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '../../interfaces/menu.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styles: ``,
})
export class MenuComponent {
  authService = inject(AuthService);
  public menus: Menu[] = [
    {
      label: 'Inicio', iconClass: 'ti ti-users', route: '/tramites-servicios', hasSubmenu: false,
      hasChildren: false
    },
  ];
  ngOnInit() {
    if (this.authService.getUser().roleKey === 'ADMIN') {
      this.menus = [...this.menus, {
        label: 'Categorias', iconClass: 'ti ti-folder', route: '/categorias', hasSubmenu: false,
        hasChildren: false
      },
      {
        label: 'Alta tramites/servicios', iconClass: 'ti ti-folders', route: '/alta-tramites-servicios', hasSubmenu: false,
        hasChildren: false
      }];
    }
  }
  public isDropdownOpen: boolean = false;
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
