import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CamundaFormComponentComponent } from './camunda-form-component/camunda-form-component.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CamundaComponent, GroupedRowComponent } from './camunda-form.interface';
import { CamundaFormService } from './camunda-form.service';


@Component({
  selector: 'app-camunda-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CamundaFormComponentComponent],
  templateUrl: './camunda-form.component.html',
  styles: ``,
})
export class CamundaFormComponent {
  @Input() components?: CamundaComponent[] = [];
  @Input() buttonText: string = 'Enviar';
  @Output() onSubmitForm = new EventEmitter<any>();
  groupedComponents: GroupedRowComponent[] = [];
  form!: FormGroup;
  @Input() payLoad = {};
  constructor(private cfs: CamundaFormService) { }
  ngOnInit() {

    this.groupComponent();
    this.form = this.cfs.toFormGroup(
      this.components as CamundaComponent[],
      this.payLoad
    );
  }
  onSubmit() {
    const payload = this.components?.map((component) => {
      return {
        key: component.key,
        type: component.type,
        value: this.form.value[component.key],
        label: component.label || component.dateLabel,
      };
    }).filter((item) => item.value !== null && item.value !== undefined);
    console.log(payload);
    this.onSubmitForm.emit(payload);
  }

  groupComponent() {
    this.groupedComponents = Array.from(
      this.components!.reduce((map, item) => {
        const row = item.layout?.row;
        if (!row) return map;

        if (!map.has(row)) {
          map.set(row, { row, components: [] });
        }
        map.get(row)!.components.push(item);
        return map;
      }, new Map<string, GroupedRowComponent>())
        .values()
    );
  }

   columnClass(columns: number | null): string{
    if (!columns){
      return 'col'
    }
    return `col-${columns}`;
  }
}
