import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DataGeneral } from '../../../pages/mis-expedientes/expedientes.interface';

@Component({
  selector: 'app-data-grid',
  imports: [],
  templateUrl: './data-grid.component.html',
  styles: ``
})
export class DataGridComponent {
  fileUrl = environment.fileEndpoint + '/files/';
  @Input() components: DataGeneral[] | null = [];
}
