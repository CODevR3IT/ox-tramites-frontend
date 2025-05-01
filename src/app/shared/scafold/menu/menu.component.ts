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
   // { label: 'Home', iconClass: 'ti ti-home', route: '/', hasSubmenu: false},
  ];
}
