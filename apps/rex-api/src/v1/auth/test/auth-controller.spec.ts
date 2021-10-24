import { LoginUserResponse } from '@solid-octo-couscous/model';
import { AuthController } from '../auth-controller';
import { AuthService } from '../auth-service';
import { internet } from 'faker';
import { nanoid } from 'nanoid';

describe('AuthController', () => {
	const fakeLoginResponse: LoginUserResponse = {
		approvalNotes: '',
		createdOn: 1,
		dateOfBirth: 1,
		description: '',
		email: internet.email(),
		id: nanoid(),
		isApproved: 1,
		jwtToken: `123.345.562`,
		loginName: internet.userName(),
		modifiedOn: 0,
	};

	const createAccount = jest.fn(() => {
		return Promise.resolve(fakeLoginResponse);
	});
	const login = jest.fn(() => {
		return Promise.resolve(fakeLoginResponse);
	});
	const isDuplicateUserName = jest.fn(() => {
		// no-op.
	});
	const isLoggedIn = jest.fn(() => {
		// no-op.
	});

	const authService = { createAccount, login, isDuplicateUserName, isLoggedIn };
	let authController: AuthController;

	beforeEach(() => {
		authController = new AuthController(authService as unknown as AuthService);
	});

	it('should create', () => {
		expect(authController).toBeDefined();
	});
});
