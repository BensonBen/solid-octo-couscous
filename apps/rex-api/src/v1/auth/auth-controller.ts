import { LoginUserResponse, Transaction, User } from '@solid-octo-couscous/model';
import { red, magentaBright } from 'chalk';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import { autoInjectable, inject } from 'tsyringe';
import { AuthService } from './auth-service';

@autoInjectable()
export class AuthController {
	private readonly loggerPrefix: string = `[Auth Controller]`;
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
			console.log(magentaBright(`${body}`));
			const newUser = await this.authService.createAccount(body);
			return response.status(OK).send({
				...this.baseTransaction,
				data: newUser,
				success: true,
			} as Transaction<LoginUserResponse>);
		} catch (error: any) {
			this.logger.log(red(`Failed to create account with reason: ${JSON.stringify(error)}`));
			return response
				.status(INTERNAL_SERVER_ERROR)
				.send({ ...this.baseTransaction, message: this.somethingWentWrong });
		}
	};

	public readonly login = async ({ body }: Request, response: Response) => {
		try {
			const loggedInUser = await this.authService.login(body);

			return response.status(OK).send({
				...this.baseTransaction,
				data: loggedInUser,
				success: true,
			} as Transaction<LoginUserResponse>);
		} catch (error: any) {
			this.logger.log(red(`Failed to login account with reason: ${JSON.stringify(error)}`));
			return response
				.status(INTERNAL_SERVER_ERROR)
				.send({ ...this.baseTransaction, message: this.somethingWentWrong });
		}
	};
}
