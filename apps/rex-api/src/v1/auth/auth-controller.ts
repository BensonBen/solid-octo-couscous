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

	public readonly createAccount = async ({ body }: Request, response: Response) => {
		try {
			const newUser = await this.authService.createAccount(body);
			return response.status(OK).send({
				...this.baseTransaction,
				data: newUser,
				success: true,
			} as Transaction<LoginUserResponse>);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to create account with reason: ${JSON.stringify(error)}`));
			return response
				.status(INTERNAL_SERVER_ERROR)
				.send({ ...this.baseTransaction, message: this.somethingWentWrong });
		}
	};

	public readonly login = async ({ body }: Readonly<Request>, response: Readonly<Response>) => {
		try {
			const loggedInUser = await this.authService.login(body);
			console.log(body);
			return response.status(OK).send({
				...this.baseTransaction,
				data: loggedInUser,
				success: true,
			} as Transaction<LoginUserResponse>);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to login account with reason: ${JSON.stringify(error)}`));
			return response
				.status(INTERNAL_SERVER_ERROR)
				.send({ ...this.baseTransaction, message: this.somethingWentWrong });
		}
	};

	public readonly userNameExists = async ({ query }: Readonly<Request>, response: Readonly<Response>) => {
		try {
			const userNameExists = await this.authService.userNameExists(query?.userName as string);

			return response.status(OK).send({
				...this.baseTransaction,
				data: userNameExists,
				success: true,
			} as Transaction<boolean>);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to find user name with reason: ${JSON.stringify(error)}`));
			return response
				.status(INTERNAL_SERVER_ERROR)
				.send({ ...this.baseTransaction, message: this.somethingWentWrong });
		}
	};

	public readonly isLoggedIn = async ({ headers }: Readonly<Request>, response: Readonly<Response>) => {
		try {
			const isLoggedIn = await this.authService.isLoggedIn(headers);

			return response.status(OK).send({
				...this.baseTransaction,
				data: isLoggedIn,
				success: true,
			} as Transaction<boolean>);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to find user name with reason: ${JSON.stringify(error)}`));
			return response
				.status(INTERNAL_SERVER_ERROR)
				.send({ ...this.baseTransaction, message: this.somethingWentWrong });
		}
	};
}
