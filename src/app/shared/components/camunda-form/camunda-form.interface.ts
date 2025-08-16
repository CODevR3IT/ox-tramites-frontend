export interface CamundaForm {
  components: CamundaComponent[];
  type: string;
  id: string;
  exporter: Exporter;
  executionPlatform: string;
  executionPlatformVersion: string;
  schemaVersion: number;
}

export interface CamundaComponent {
  text?: string;
  type: string;
  readonly?: boolean
  layout: Layout;
  conditional?: Conditional;
  id: string;
  label: string;
  dateLabel?: string;
  key: string;
  validate?: Validate;
  properties?: null;
  appearance?: null;
  accept?: string;
  height?: number;
  values?: ValuesMultiple[];
}

export interface Layout {
  row: string;
  columns: null;
}
export interface Conditional {
  hide: string;
}
export interface ValuesMultiple {
  label: string;
  value: string | number | boolean;
}

export interface Validate {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export interface Exporter {
  name: string;
  version: string;
}
export interface GroupedRowComponent {
  row: string;
  components: CamundaComponent[];
}