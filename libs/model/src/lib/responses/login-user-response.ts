import { User } from '../model/user';

export interface LoginUserResponse extends Omit<User, 'password'> {
	jwtToken: string;
}
