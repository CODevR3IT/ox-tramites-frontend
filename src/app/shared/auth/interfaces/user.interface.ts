export interface User {
    user: {
        idU: any;
        email: string;
        ciudadano:{
            idC: string;
            curp: string;
            nombre: string;
            primer_apellido: string;
            segundo_apellido: string;
        }
    }
    sub: string,
    full_name: string;    
    role: string;
    rolekey: string;
    access_token: string;
    token: string;
}

export interface ProfileImg {
    img: string;
} 