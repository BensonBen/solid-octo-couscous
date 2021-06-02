import { Transaction, User } from '@solid-octo-couscous/model';
import { green, bgRed } from 'chalk';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status';
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

	constructor(@inject(AuthService) public authService?: AuthService) {}

	public readonly createAccount = async ({ body }: Request, response: Response) => {
		try {
			const newUser = await this.authService.createAccount(body);
			return response.status(OK).send({ ...this.baseTransaction, data: newUser, success: true });
		} catch (error: any) {
			this.logger(bgRed(`Failed to create account with reason: ${JSON.stringify(error)}`));
			return response
				.status(INTERNAL_SERVER_ERROR)
				.send({ ...this.baseTransaction, message: 'Whoops! something went wrong.' });
		}
	};

	public readonly login = ({ body }: Request, response: Response) => {
		const serverResponse = response.status(UNAUTHORIZED);
		try {
			// find the user in the database?
			// const user =

			// do the passwords match?
			// const matchPasswords =

			// generate secure token.
			const token = '034166ee-d4ba-43aa-8804-2d6c0b0ecfbe';

			// you really shouldn't be logging this, but just for these purposes.
			this.logger(green(`[Server] Created a token: ${token}`));
			serverResponse.append('data', token);
			serverResponse.status(OK);
		} catch (error: any) {
			// return a reponse as appropriate to indicate error.

			this.logger(bgRed(`UnAuthorized Access: ${error}`));
			serverResponse.append('error', error);
		}

		return serverResponse.send();
	};
}
