import { Transaction, User } from '@solid-octo-couscous/model';
import { red } from 'chalk';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import { autoInjectable, inject } from 'tsyringe';
import { AuthService } from './auth-service';

@autoInjectable()
export class AuthController {
	private readonly loggerPrefix: string = `[Auth Controller]`;
	private readonly logger = console.log;
	private readonly baseTransaction: Transaction<User> = {
		data: undefined,
		success: false,
		message: '',
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
			} as Transaction<Record<string, string>>);
		} catch (error: any) {
			this.logger(red(`Failed to create account with reason: ${JSON.stringify(error)}`));
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
			} as Transaction<Record<string, string>>);
		} catch (error: any) {
			return response
				.status(INTERNAL_SERVER_ERROR)
				.send({ ...this.baseTransaction, message: this.somethingWentWrong });
		}
	};
}
