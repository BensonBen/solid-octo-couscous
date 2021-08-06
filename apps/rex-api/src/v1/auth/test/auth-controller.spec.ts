import { LoginUserRequest } from '@solid-octo-couscous/model';
import { AuthController } from '../auth-controller';
import { AuthService } from '../auth-service';
import { Request, Response } from 'express';

describe('AuthController', () => {
	const createAccount = jest.fn(() => {
		// no-op.
	});
	const login = jest.fn(() => {
		// no-op.
	});
	const isDuplicateUserName = jest.fn(() => {
		// no-op.
	});
	const isLoggedIn = jest.fn(() => {
		// no-op.
	});
	const status = jest.fn(() => {
		// no-op.
	});
	const send = jest.fn(() => {
		// no-op.
	});
	const response: Readonly<Response> = {
		status,
		send,
	} as unknown as Readonly<Response>;

	const authService = { createAccount, login, isDuplicateUserName, isLoggedIn };
	let authController: AuthController;

	beforeEach(() => {
		authController = new AuthController(authService as unknown as AuthService);
		status.mockReset();
		status.mockClear();
		send.mockReset();
		send.mockReset();
	});

	it('should create', () => {
		expect(authController).toBeDefined();
	});

	it('should call create account', () => {
		const loginUserRequest: LoginUserRequest = {
			loginName: `chaoz133`,
			password: `someNotSecurePassword`,
		};
		const request: Readonly<Request> = {
			body: loginUserRequest,
		} as Readonly<Request>;

		authController.createAccount(request, response);
		expect(createAccount).toHaveBeenCalled();
		expect(status).toHaveBeenCalled();
		expect(send).toHaveBeenCalled();
	});
});
