import { NewUserRequest, User, LoginUserResponse } from '@solid-octo-couscous/model';
import { green } from 'chalk';
import { inject, singleton } from 'tsyringe';
import { TensorFlowDataProvider } from './tensorflow-data-provider';
import { omit as _omit } from 'lodash';
import { sign as jwtSign, Algorithm, SignOptions } from 'jsonwebtoken';

@singleton()
export class TensorFlowService {
	private readonly logger = console;
	private readonly loggerPrefix = '[TensorFlowService]';
	private readonly jwtSignOptions: SignOptions = {
		algorithm: process?.env?.AUTH_API_JWT_ALG as Algorithm,
		audience: process?.env?.AUTH_API_JWT_AUDIENCE,
		issuer: process?.env?.AUTH_API_JWT_ISSUER,
		expiresIn: '1h',
	};

	constructor(@inject(TensorFlowDataProvider) private readonly tensorFlowDataProvider?: TensorFlowDataProvider) {}

	/**
	 * Handles tensorflow estimation and transmission.
	 *
	 * @param Request, body the body of the request from a POST request.
	 * @param response, response the response object on which to attach objects.
	 * @returns, a Promise that stores the Transactional data from the new account created.
	 */
	public readonly createAccount = async (userRequest: Readonly<NewUserRequest>): Promise<LoginUserResponse> => {
		// prevent logging of sensitive information.
		this.logger.log(
			green(
				`${this.loggerPrefix} Attempting to create new user account using: ${JSON.stringify({
					...userRequest,
					password: null,
					email: null,
				})}`
			)
		);

		const omission: keyof User = 'password';
		const user: LoginUserResponse = _omit(await this.tensorFlowDataProvider.createAccount(userRequest), omission);
		const jwtToken = jwtSign(user, process?.env?.AUTH_API_JWT_KEY, this.jwtSignOptions);

		return { ...user, jwtToken } as LoginUserResponse;
	};
}
