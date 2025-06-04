export interface ExpedienteCiudadano {
    id:                string;
    folio:             string;
    tramite_data:      string;
    definition_id:     string;
    tarea_id_actual:   string;
    tramite_id:        string;
    ciudadano_id:      string;
    ended_at:          Date | null;
    id_usuario_actual: string;
    usuario_actual:    string;
    created_at:        Date;
    updated_at:        Date;
    tarea:             Tarea;
    tramite:           Tramite;
}
 
export interface Tarea {
    id:                string;
    tarea:             string;
    tarea_key:         string;
    tarea_descripcion: string;
    prioridad:         string;
    tramite_id:        string;
    created_at:        Date;
    updated_at:        Date;
}
 
export interface Tramite {
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