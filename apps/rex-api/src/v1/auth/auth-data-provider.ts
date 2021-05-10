import { LoginUserRequest, NewUserRequest } from '@solid-octo-couscous/model';
import { inject, singleton } from 'tsyringe';
import { RedisDatabaseService } from '../../database/redis-database';
import { genSalt, hash, compareSync } from 'bcrypt';
import { red } from 'chalk';
import { v4 as uuidv4 } from 'uuid';

@singleton()
export class AuthDataProvider {
	private readonly logger = console;
	private readonly loggerPrefix = '[AuthDataProvider]';
	private readonly authDataProviderSaltRounds: number = +(process?.env?.AUTH_API_SALT_ROUNDS ?? 10);

	constructor(@inject(RedisDatabaseService) private readonly redisDatabaseService?: RedisDatabaseService) {}

	/**
	 * Create an account in whatever database implementation
	 *
	 * @param userRequest, the request is assumed to be validated by this point in time.
	 * @returns {@link User}, whatever the database insertion gives back.
	 */
	public readonly createAccount = async (userRequest: Readonly<NewUserRequest>): Promise<Record<string, string>> => {
		const { loginName, password, email, dateOfBirth } = userRequest;

		const [, hashedPassword] = await Promise.all([
			this.redisDatabaseService.redisDatabase.incr('users:id'),
			hash(password, await genSalt(+this.authDataProviderSaltRounds)),
		]);

		const createdOnModifiedOnTime: number = new Date().getTime();
		const id = uuidv4();
		const newUserHashCreationResult = await this.redisDatabaseService.redisDatabase.hmset(
			loginName,
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
			id
		);

		if (newUserHashCreationResult === 'OK') {
			return this.redisDatabaseService.redisDatabase.hgetall(id);
		}

		this.logger.log(
			red(
				`${this.loggerPrefix} login name: ${loginName}, password: ${password}, email: ${email}, date of birth: ${dateOfBirth}`
			)
		);
		// just throw an exception if something went wrong. don't give information that's not needed.
		throw new Error();
	};

	/**
	 * Login to the users account and get their information.
	 *
	 * @param loginRequest, the request is assumed to be validated by this point in time.
	 * @returns {@link User}, whatever the users login information is provided.
	 */
	public readonly login = async (loginRequest: Readonly<LoginUserRequest>): Promise<Record<string, string>> => {
		const { loginName, password } = loginRequest;
		const potentialUserEntry: Record<string, string> = await this.redisDatabaseService.redisDatabase.hgetall(
			loginName
		);

		if (compareSync(password, potentialUserEntry?.password)) {
			return potentialUserEntry;
		}

		// if the passwords don't match simply throw an exception and don't give away details.
		throw new Error();
	};
}
