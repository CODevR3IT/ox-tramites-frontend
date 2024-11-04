import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { fadeInLeft } from 'ng-animate';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styles: ``,
  animations: [trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))])],
})
export class LandingComponent {
  fadeInLeft:any
}
