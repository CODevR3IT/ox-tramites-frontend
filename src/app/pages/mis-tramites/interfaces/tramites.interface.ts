export interface Categoria {
    id:         string;
    categoria:  string;
    created_at: Date;
    updated_at: Date;
    tramites:   Tramite[];
}
 
export interface Tramite {
    id:           string;
    tramite:      string;
    link_ayuda?:   string;
    icon?:         string;
    link_img?:     string;
    process_key:  string;
    activo:       boolean;
    categoria_id: string;
    created_at:   Date;
    updated_at:   Date;
}