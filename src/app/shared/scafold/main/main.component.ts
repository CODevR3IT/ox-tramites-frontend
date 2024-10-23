import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  templateUrl: './main.component.html',
  styles: ``
})
export class MainComponent {

}
