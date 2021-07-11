import { User } from '@solid-octo-couscous/model';
export interface State extends Omit<User, 'password'> {
	isLoaded: boolean;
	loading: boolean;
	error: any;
}

export const initialState: State = {
	approvalNotes: '',
	createdOn: 0,
	dateOfBirth: 0,
	description: '',
	email: '',
	error: null,
	id: '',
	isApproved: 0,
	isLoaded: false,
	loading: false,
	loginName: '',
	modifiedOn: 0,
};
