import { UserData } from './user-data.protocol'

export type UserCreateData = Pick<UserData, 'firstName' | 'lastName' | 'status' | 'email' | 'password'>
