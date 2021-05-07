import { NewUserRequest } from '@solid-octo-couscous/model';
import { inject, singleton } from 'tsyringe';
import { RedisDatabaseService } from '../../database/redis-database';
import { genSalt, hash } from 'bcrypt';
import { red } from 'chalk';
import { v4 as uuidv4 } from 'uuid';

@singleton()
export class AuthDataProvider {
	private readonly logger = console;
	private readonly loggerPrefix = '[AuthDataProvider]';
	private readonly authDataProviderSaltRounds: number = +(process?.env?.AUTH_API_SALT_ROUNDS ?? 10);

	constructor(@inject(RedisDatabaseService) private readonly redisDatabaseService?: RedisDatabaseService) { }

	/**
	 * Create an account in whatever database implementation
	 *
	 * @param userRequest, the request is assumed to be validated by this point in time.
	 * @returns {@link User}, whatever the database insertion gives back.
	 */
	public readonly createAccount = async (userRequest: Readonly<NewUserRequest>): Promise<Record<string, string>> => {
		const { loginName, password, email, dateOfBirth } = userRequest;

		const [
			currentNumberOfUsers,
			hashedPassword,
			hashedEmail
		] = await Promise.all([
			this.redisDatabaseService.redisDatabase.incr('users:id'),
			hash(password, await genSalt(+this.authDataProviderSaltRounds)),
			hash(email, await genSalt(+this.authDataProviderSaltRounds))
		]);

		this.logger.log(
			red(`${this.loggerPrefix} currentNumberOfUsers: ${currentNumberOfUsers}, hashedPassword: ${hashedPassword}, hashedEmail: ${hashedEmail}`)
		);

		const createdOnModifiedOnTime: number = new Date().getTime();
		const newUserHashCreationResult = await this.redisDatabaseService.redisDatabase.hmset(
			hashedEmail,
			'loginName',
			loginName,
			'password',
			hashedPassword,
			'email',
			email,
			'dateOfBirth',
			dateOfBirth,
			'createdOn',
			createdOnModifiedOnTime,
			'modifiedOn',
			createdOnModifiedOnTime,
			'id',
			uuidv4()
		);

		if (newUserHashCreationResult === 'OK') {
			return this.redisDatabaseService.redisDatabase.hgetall(hashedEmail);
		}

		this.logger.log(
			red(`${this.loggerPrefix} login name: ${loginName}, password: ${password}, email: ${email}, date of birth: ${dateOfBirth}`)
		);
		// just throw an exception if something went wrong. don't give information that's not needed.
		throw new Error();
	};
}
