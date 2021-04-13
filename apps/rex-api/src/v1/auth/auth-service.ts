import { NewUserRequest, User } from '@solid-octo-couscous/model';
import { green } from 'chalk';
import { isEmpty as _isEmpty } from 'lodash';
import { inject, singleton } from 'tsyringe';
import { AuthDataProvider } from './auth-data-provider';
import { omit as _omit } from 'lodash';

@singleton()
export class AuthService {
	private readonly logger = console.log;
	private readonly loggerPrefix = '[AuthService]';
	private readonly twoThousandTen: number = 1262304000000;

	constructor(@inject(AuthDataProvider) private readonly authDataProvider?: AuthDataProvider) {}

	/**
	 * Handles the POST request for creating a users account.
	 *
	 * @param Request, body the body of the request from a POST request.
	 * @param response, response the response object on which to attach objects.
	 * @returns, a Promise that stores the Transactional data from the new account created.
	 */
	public readonly createAccount = async (userRequest: Readonly<NewUserRequest>): Promise<Record<string, string>> => {
		const { lastName, firstName, loginName, password, email, dateOfBirth } = userRequest;

		if (
			!_isEmpty(lastName) &&
			!_isEmpty(firstName) &&
			!_isEmpty(loginName) &&
			!_isEmpty(password) &&
			!_isEmpty(email) &&
			dateOfBirth > 0 &&
			dateOfBirth <= this.twoThousandTen
		) {
			this.logger(
				green(
					`${this.loggerPrefix} Attempting to create new user account using: ${JSON.stringify(userRequest)}`
				)
			);

			return Promise.resolve(
				_omit(await this.authDataProvider.createAccount(userRequest), ['password'] as Array<keyof User>)
			);
		}

		return Promise.resolve(null);
	};
}
