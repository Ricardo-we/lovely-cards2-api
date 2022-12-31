export interface IUser {
    id?: number;
    username: string;
    password?: string;
    email: string;
    isActive: boolean;
}

export interface FullUser {
    user: IUser,
    token: string;
}