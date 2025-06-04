import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MisTramitesService } from '../mis-tramites/mis-tramites.service';

@Component({
  selector: 'app-tramites-markdown',
  imports: [],
  templateUrl: './tramites-markdown.component.html',
  styles: ``
})
export class TramitesMarkdownComponent {
  idTramite: string = '';
  markdown: string = '';

  constructor(
    private readonly misTramitesService: MisTramitesService,
    private readonly activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idTramite = this.activateRoute.snapshot.paramMap.get('id') || '';
    this.getMarkdown();
  }
  getMarkdown() {
    this.misTramitesService.getMarkdown(this.idTramite).subscribe((res: any) => {
      this.markdown = res.markdown || '';
    });
  }
}
