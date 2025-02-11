import { User } from '../entities/user';

export type GetUserType = null | User;
export type NewUser = User & { uid: string }