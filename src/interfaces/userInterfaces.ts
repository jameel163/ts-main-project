

export interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    phone_no: number;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    user_profile?:string;
    
    
}
export interface AddressAttributes{
    id?:number;
    address:string;
    user_id:number;
}
export interface User {
    
    id: number;
    name: string;
    email: string;
    phone_no: number;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    user_profile:string;
}

export interface CreateUser{
    name:string;
    email:string;
    phone_no:number;
    password:string;
    user_profile?:string;
    address:string;
}

export interface UserUpdate{
    user_id:number;
    name?:string;
    email?:string;
    phone_no?:number;
    password?:string;
    user_profile?:string;
    address?:string;
}