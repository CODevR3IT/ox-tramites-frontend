export interface ResponseLogin {
    token: string;
    user: User;
}
export interface User {
    id: string;
    email: string;
    telefono: string;
    email_verified_at: Date;
    created_at: Date;
    updated_at: Date;
    ciudadano?: Ciudadano;
    extranjero?: Extranjero;
    notario?: Notario;
}

export interface Notario {
    id: string;
    curp: string;
    rfc: string;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    fecha_nacimiento: string;
    sexo: string;
    user_id: string;
    caracter: string;
    cp_id: number;
    calle: string;
    num_ext: string;
    num_int: null;
    num_notaria: string;
    clave_notario: string;
    d_estado: string;
    d_mnpio: string;
    d_asenta: string;
    d_codigo: string;
}

export interface Ciudadano {
    id: string;
    curp: string;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    fecha_nacimiento: string;
    sexo: string;
    user_id: string;
    cp_id: number;
    d_estado: string;
    d_mnpio: string;
    d_asenta: string;
    d_codigo: string;
}

export interface Extranjero {

}