export interface IUser {
    id: number;
    username: string;
    email: string;
    fullname: string;
    password: string;
    roll: 'developer' | 'chef' | 'lead' | 'senior' | 'superadmin' | 'admin' | 'user';
    region: string;
    avatar?: string | null;
    created_at?: Date;
    updated_at?: Date;
}
export interface IJwtPayload {
    id: number;
    role: string;
    username: string;
    iat: number;
    exp: number;
}

export interface ICustomRequest extends Express.Request {
    user: IJwtPayload | IJwtRefreshPayload;
}

export interface IJwtRefreshPayload {
    id: number;
    iat: number;
    exp: number;
}

export interface IRegion { 
    id: number;
    name: string;
    country: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface IDistrict {
    id: number;
    name: string;
    description: string;
    region_id: string;
    created_at?: Date;
    updated_at?: Date;
}