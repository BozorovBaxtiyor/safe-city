export interface IUser {
    id: number;
    username: string;
    email: string;
    fullname: string;
    password: string;
    roll: 'developer' | 'chef' | 'lead' | 'senior' | 'superadmin' | 'admin' | 'user';
    region_id: number;
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
    region_id: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IProject {
    id: number;
    name: string;
    description?: string;
    created_by: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IOrder {
    id: number;
    order_number: string;
    description?: string;
    project_id: number;
    created_by: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IDescriptonType {
    id: number
    name: string
    description?: string;
    created_by: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IDescription {
    id: number;
    name: string;
    description?: string;
    des_id: number; 
    created_by: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IDeviceType { 
    id: number;
    name: string;

}

export interface IDeviceModel {
    id: number;
    name: string;
    description?: string;
    device_type_id: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IObject {
    id: number;
    project_id: number;
    order_id: number;
    des_type_id: number;
    des_id: number;
    region_id: number;
    district_id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    ip_subnet: string;
    connection_type: string;
    speed: string;
    created_by: number;
    updated_by: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IDevice {
    id: number;
    object_id: number;
    device_model_id: number;
    device_type_id: number;
    created_by: number;
    serial_number: string;
    ip_address: string;
    mac_address: string;
    status: 'active' | 'inactive' | 'maintenance';
    extra_info?: Record<string, any> | null;
    created_at?: Date;
    updated_at?: Date;
}