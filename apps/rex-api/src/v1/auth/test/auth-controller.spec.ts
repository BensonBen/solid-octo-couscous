import { LoginUserRequest, LoginUserResponse } from '@solid-octo-couscous/model';
import { AuthController } from '../auth-controller';
import { AuthService } from '../auth-service';
import { Request, Response } from 'express';
import { finance, internet } from 'faker';
import { cyan } from 'chalk';
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

	const send = jest.fn((statusCode: number) => {
		console.log(cyan(`send called`));
		this;
	});

	const status = jest.fn(() => {
		console.log(cyan(`status called`));
		this;
	});

	const response: Readonly<Response> = {
		status: jest.fn(() => response),
		send: jest.fn(() => response),
	} as unknown as Readonly<Response>;

	const authService = { createAccount, login, isDuplicateUserName, isLoggedIn };
	let authController: AuthController;

	beforeEach(() => {
		authController = new AuthController(authService as unknown as AuthService);
	});

	it('should create', () => {
		expect(authController).toBeDefined();
	});

	it('should call create account', async done => {
		const loginUserRequest: LoginUserRequest = {
			loginName: finance.accountName(),
			password: internet.password(),
		};
		const request: Readonly<Request> = {
			body: loginUserRequest,
		} as Readonly<Request>;

		authController.login(request, response);

		expect(login).toHaveBeenCalled();
		expect(status).toHaveBeenCalled();
		expect(send).toHaveBeenCalled();

		done();
	});
});
