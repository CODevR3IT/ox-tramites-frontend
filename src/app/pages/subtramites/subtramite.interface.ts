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

export interface Subtramite {
    id:                         number;
    descripcion:                string;
    detalle:                    string;
    estatus:                    boolean;
    is_cita:                    boolean;
    is_pago:                    boolean;
    config:                     string;
    url_file:                   null;
    files:                      File[];
    ca_tramite_id:              number;
    tipo_usuarios_restringidos: string;
    created_at:                 Date;
    updated_at:                 Date;
    tramite_descripcion:        string;
}
 
export interface File {
    url_file: Array<number | string>;
    nombre:   string;
}