export interface Categoria {
    id: string;
    categoria: string;
    created_at: Date;
    updated_at: Date;
    tramites: Tramite[];
}

export interface Tramite {
    id: string;
    tramite: string;
    descripcion: string;
    link_ayuda?: string;
    link_archivo?: string;
    icon?: string;
    link_img?: string;
    is_cita: boolean;
    process_key: string;
    activo: boolean;
    categoria_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface NowDate {
    date: string;
}