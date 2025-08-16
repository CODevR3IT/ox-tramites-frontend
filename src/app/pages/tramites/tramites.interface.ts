export interface Tramite {
    id: number;
    orden: number | null;
    descripcion: string;
    detalle: string;
    estatus: boolean;
    is_service: boolean;
    tipo_usuarios_restringidos: string;
    created_at: Date;
    updated_at: Date;
}