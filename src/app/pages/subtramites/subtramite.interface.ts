export interface Campos {
    id_tipo_campo: string;
    nombre: string;
    etiqueta: string;
    id_validacion: string;
    longitud?: string | null;
    msgerror: string;
    requerido: string;
    tipoPersona: string;
    opciones: OpcionRadio[];
    visible: string;
}

export interface OpcionRadio {
    nombre: string;
    valor: string
}