import { LoginUserRequest, NewUserRequest, User, LoginUserResponse } from '@solid-octo-couscous/model';
import { green, cyan } from 'chalk';
import { inject, singleton } from 'tsyringe';
import { AuthDataProvider } from './auth-data-provider';
import { omit as _omit } from 'lodash';
import { sign as jwtSign, verify as jwtVerify, Algorithm, SignOptions } from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';

@singleton()
export class AuthService {
	private readonly logger = console.log;
	private readonly loggerPrefix = '[AuthService]';
	private readonly jwtTokenAlgorithm: Algorithm = process?.env?.AUTH_API_JWT_ALG as Algorithm;
	private readonly jwtSignOptions: SignOptions = {
		algorithm: this.jwtTokenAlgorithm,
		audience: process?.env?.AUTH_API_JWT_AUDIENCE,
		issuer: process?.env?.AUTH_API_JWT_ISSUER,
		expiresIn: '1h',
	};

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

		const jwtToken = jwtSign(user, process?.env?.AUTH_API_JWT_KEY, this.jwtSignOptions);

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

		const jwtToken = jwtSign(user, process?.env?.AUTH_API_JWT_KEY, this.jwtSignOptions);

		return { ...user, jwtToken } as LoginUserResponse;
	};

	/**
	 * Checks if a given user name exists.
	 */
	public readonly userNameExists = async (userName: Readonly<string>): Promise<boolean> => {
		this.logger(green(`${this.loggerPrefix} Attempting to find user name: ${userName}`));

		return await this.authDataProvider.userNameExists(userName);
	};

	public readonly isLoggedIn = async (headers: IncomingHttpHeaders): Promise<boolean> => {
		console.log(cyan(headers));
		const authorization = headers?.authorization;
		console.log(cyan(authorization));
		const issuer = {
			algorithm: this.jwtTokenAlgorithm,
			audience: process?.env?.AUTH_API_JWT_AUDIENCE,
			issuer: process?.env?.AUTH_API_JWT_ISSUER,
		};
		const verifiedToken = await jwtVerify(authorization, process?.env?.AUTH_API_JWT_KEY, issuer);
		console.log(cyan(verifiedToken));
		// this.logger(green(`${this.loggerPrefix} Attempting to find user name: ${userName}`));
		return Promise.resolve(true);
		// return await this.authDataProvider.userNameExists(userName);
	};
}
