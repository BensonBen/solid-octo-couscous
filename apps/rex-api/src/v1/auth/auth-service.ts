import { LoginUserRequest, NewUserRequest, User, LoginUserResponse } from '@solid-octo-couscous/model';
import { green } from 'chalk';
import { inject, singleton } from 'tsyringe';
import { AuthDataProvider } from './auth-data-provider';
import { omit as _omit } from 'lodash';
import { sign as jwtSign, Algorithm } from 'jsonwebtoken';

@singleton()
export class AuthService {
	private readonly logger = console.log;
	private readonly loggerPrefix = '[AuthService]';
	private readonly jwtTokenAlgorithm: Algorithm = process?.env?.AUTH_API_JWT_ALG as Algorithm;

	constructor(@inject(AuthDataProvider) private readonly authDataProvider?: AuthDataProvider) {}

	/**
	 * Handles the POST request for creating a users account.
	 *
	 * @param Request, body the body of the request from a POST request.
	 * @param response, response the response object on which to attach objects.
	 * @returns, a Promise that stores the Transactional data from the new account created.
	 */
	public readonly createAccount = async (userRequest: Readonly<NewUserRequest>): Promise<LoginUserResponse> => {
		// prevent logging of sensitive information.
		this.logger(
			green(
				`${this.loggerPrefix} Attempting to create new user account using: ${JSON.stringify({
					...userRequest,
					password: null,
					email: null,
				})}`
			)
		);
		
		const omission: keyof User = 'password';
		const user: LoginUserResponse = _omit(await this.authDataProvider.createAccount(userRequest), omission);

		const jwtToken = jwtSign(user, process?.env?.AUTH_API_JWT_KEY, {
			algorithm: this.jwtTokenAlgorithm,
			audience: process?.env?.AUTH_API_JWT_AUDIENCE,
			issuer: process?.env?.AUTH_API_JWT_ISSUER,
		});

		return { ...user, jwtToken } as LoginUserResponse;
	};

	/**
	 * Handles the POST request for logging into their account.
	 *
	 * @param Request, body the body of the request from a POST request.
	 * @param response, response the response object on which to attach objects.
	 * @returns, a Promise that stores the Transactional data from the new account created.
	 */
	public readonly login = async (loginRequest: Readonly<LoginUserRequest>): Promise<LoginUserResponse> => {
		this.logger(
			green(`${this.loggerPrefix} Attempting to log a user in by using: ${JSON.stringify(loginRequest)}`)
		);

		const omission: keyof User = 'password';
		const user: LoginUserResponse = _omit(await this.authDataProvider.login(loginRequest), omission);

		const jwtToken = jwtSign(user, process?.env?.AUTH_API_JWT_KEY, {
			algorithm: this.jwtTokenAlgorithm,
			audience: process?.env?.AUTH_API_JWT_AUDIENCE,
			issuer: process?.env?.AUTH_API_JWT_ISSUER,
		});

		return { ...user, jwtToken } as LoginUserResponse;
	};
}
