export interface IUser {
    id: number;
    username: string;
    email: string;
    fullname: string;
    password: string;
    roll: "developer" | "chef" | "lead" | "senior" | "superadmin";
    region: string;
    avatar?: string | null;
    created_at?: Date;
    updated_at?: Date;
}