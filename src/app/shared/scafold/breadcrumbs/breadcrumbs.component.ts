import { Component } from '@angular/core';
import { Breadcrumb } from './breadcrumb.interface';
import { Observable } from 'rxjs';
import { BreadcrumsbService } from './breadcrumbs.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})
export class BreadcrumbsComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumsbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }
}
