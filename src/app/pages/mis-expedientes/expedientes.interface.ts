export interface Expediente {
    id:                string;
    folio:             string;
    tramite_data:      DataGeneral[];
    definition_id:     string;
    tarea_id_actual:   string;
    tramite_id:        string;
    estatus:         string;
    user_id:      string;
    ended_at:          Date | null;
    id_usuario_actual: string;
    usuario_actual:    string;
    created_at:        Date;
    updated_at:        Date;
    tarea?:             Tarea | null;
    tramite:           Tramite;
}
 
export interface Tarea {
    id:                string;
    tarea:             string;
    tarea_key:         string;
    tarea_descripcion: string;
    prioridad:         string;
    tramite_id:        string;
    target_group:      string[];
    target_user:       string[];
    created_at:        Date;
    updated_at:        Date;
}
 
export interface Tramite {
    configuracion: any;
    id:           string;
    tramite:      string;
    process_key:  string;
    descripcion:  string;
    icon:         string;
    link_ayuda:   string;
    link_archivo: string;
    link_img:     string;
    activo:       boolean;
    categoria_id: string;
    created_at:   Date;
    updated_at:   Date;
}

export interface ProcessXml {
  id: string;
  bpmn20Xml: string;
}

export interface DataGeneral {
  key:   string;
  type:  string;
  label: string;
  value: any;
}

export interface OficioExpediente {
    id: string;
    oficio_id: string;
    oficio_tarea: OficioTarea;
}

export interface OficioTarea {
    id: string;
    nombre_oficio: string;
    tipo_oficio: string;
}

export interface ExpedienteTrazabilidad {
    id:                  string;
    tarea_id:            string;
    expediente_id:       string;
    current_data:        string;
    usuario_finalizo:    string;
    id_usuario_finalizo: null;
    ended_at:            null;
    created_at:          Date;
    updated_at:          Date;
    tarea:               Tarea;
}


export interface Configuracion {
    id:               string;
    tramite_id:       string;
    init_data_labels: any;
    cita_config?:     string;
    markdown?:        string;
    folio_base:       string;
    folio_increment:  number;
    created_at:       Date;
    updated_at:       Date;
}

export interface Categoria {
    id:              string;
    categoria:       string;
}

export interface TramiteCreate {
    tramite:       string;
    descripcion:   string;
    link_ayuda:    string;
    link_img:      string;
    link_archivo:  string;
    diagrama:      File;
    activo:        boolean;
    categoria_id:  Categoria;   
}




