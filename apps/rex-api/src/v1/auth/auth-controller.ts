import { LoginUserResponse, Transaction, User } from '@solid-octo-couscous/model';
import { red } from 'chalk';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import { autoInjectable, inject } from 'tsyringe';
import { AuthService } from './auth-service';

@autoInjectable()
export class AuthController {
	private readonly loggerPrefix: string = `[AuthController]`;
	private readonly logger = console;
	private readonly baseTransaction: Transaction<User> = {
		data: undefined,
		success: false,
		message: '',
		error: null,
	};
	private readonly somethingWentWrong: string = 'Whoops! something went wrong.';

	constructor(@inject(AuthService) public authService?: AuthService) {}

	public readonly createAccount = async ({ body }: Readonly<Request>, response: Readonly<Response>) => {
		try {
			const newUser = await this.authService.createAccount(body);
			const data: Transaction<LoginUserResponse> = {
				...this.baseTransaction,
				data: newUser,
				success: true,
			};
			return response.status(OK).send(data);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to create account with reason: ${JSON.stringify(error)}`));
			const data = { ...this.baseTransaction, message: this.somethingWentWrong };

			return response.status(INTERNAL_SERVER_ERROR).send(data);
		}
	};

	public readonly login = async ({ body }: Readonly<Request>, response: Readonly<Response>) => {
		try {
			const loggedInUser = await this.authService.login(body);
			const data: Transaction<LoginUserResponse> = {
				...this.baseTransaction,
				data: loggedInUser,
				success: true,
			};
			return response.status(OK).send(data);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to login account with reason: ${JSON.stringify(error)}`));
			const data = { ...this.baseTransaction, message: this.somethingWentWrong };

			return response.status(INTERNAL_SERVER_ERROR).send(data);
		}
	};

	public readonly isDuplicateUserName = async ({ query }: Readonly<Request>, response: Readonly<Response>) => {
		try {
			const isDuplicateUserName = await this.authService.isDuplicateUserName(query?.userName as string);
			const data: Transaction<boolean> = {
				...this.baseTransaction,
				data: isDuplicateUserName,
				success: true,
			};
			return response.status(OK).send(data);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to find user name with reason: ${JSON.stringify(error)}`));
			const data = { ...this.baseTransaction, message: this.somethingWentWrong };

			return response.status(INTERNAL_SERVER_ERROR).send(data);
		}
	};

	public readonly isLoggedIn = async ({ headers }: Readonly<Request>, response: Readonly<Response>) => {
		try {
			const isLoggedIn = await this.authService.isLoggedIn(headers);
			const data: Transaction<boolean> = {
				...this.baseTransaction,
				data: isLoggedIn,
				success: true,
			};
			return response.status(OK).send(data);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to find user name with reason: ${JSON.stringify(error)}`));
			const data = { ...this.baseTransaction, message: this.somethingWentWrong };
			return response.status(INTERNAL_SERVER_ERROR).send(data);
		}
	};
}
