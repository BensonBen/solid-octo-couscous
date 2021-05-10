import { LoginUserRequest, NewUserRequest, User } from '@solid-octo-couscous/model';
import { green } from 'chalk';
import { inject, singleton } from 'tsyringe';
import { AuthDataProvider } from './auth-data-provider';
import { omit as _omit } from 'lodash';
import { sign as jwtSign } from 'jsonwebtoken';

@singleton()
export class AuthService {
	private readonly logger = console.log;
	private readonly loggerPrefix = '[AuthService]';

	constructor(@inject(AuthDataProvider) private readonly authDataProvider?: AuthDataProvider) { }

	/**
	 * Handles the POST request for creating a users account.
	 *
	 * @param Request, body the body of the request from a POST request.
	 * @param response, response the response object on which to attach objects.
	 * @returns, a Promise that stores the Transactional data from the new account created.
	 */
	public readonly createAccount = async (userRequest: Readonly<NewUserRequest>): Promise<string> => {
		this.logger(
			green(`${this.loggerPrefix} Attempting to create new user account using: ${JSON.stringify(userRequest)}`)
		);

		const user: Omit<User, 'password'> =
			_omit(await this.authDataProvider.createAccount(userRequest), ['password'] as Array<keyof User>);

		return Promise.resolve(
			jwtSign(
				user,
				process?.env?.AUTH_API_JWT_KEY,
				{
					algorithm: 'HS256',
					audience: process?.env?.AUTH_API_JWT_AUDIENCE,
					issuer: process?.env?.AUTH_API_JWT_ISSUER
				}
			)
		);
	};

	/**
	 * Handles the POST request for logging into their account.
	 *
	 * @param Request, body the body of the request from a POST request.
	 * @param response, response the response object on which to attach objects.
	 * @returns, a Promise that stores the Transactional data from the new account created.
	 */
	public readonly login = async (loginRequest: Readonly<LoginUserRequest>): Promise<string> => {
		this.logger(
			green(`${this.loggerPrefix} Attempting to log a user in by using: ${JSON.stringify(loginRequest)}`)
		);

		const user: Omit<User, 'password'> =
			_omit(await this.authDataProvider.login(loginRequest), ['password'] as Array<keyof User>);

		return Promise.resolve(
			jwtSign(
				user,
				process?.env?.AUTH_API_JWT_KEY,
				{
					algorithm: 'HS256',
					audience: process?.env?.AUTH_API_JWT_AUDIENCE,
					issuer: process?.env?.AUTH_API_JWT_ISSUER
				}
			)
		);
	};
}
