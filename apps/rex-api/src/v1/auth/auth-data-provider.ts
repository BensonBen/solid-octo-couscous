import { LoginUserRequest, NewUserRequest, User } from '@solid-octo-couscous/model';
import { inject, singleton } from 'tsyringe';
import { RedisDatabaseService } from '../../database/redis-database';
import { genSalt, hash, compareSync } from 'bcrypt';
import { green, red } from 'chalk';
import { nanoid } from 'nanoid';
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
		const id = nanoid();

		const newUserHashCreationResult = await this.redisDatabaseService.redisDatabase.hmset(
			loginName,
			'loginName',
			loginName,
			'password',
			hashedPassword,
			'email',
			email,
			'approvalNotes',
			'',
			'description',
			'',
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
			return this.redisDatabaseService.redisDatabase.hgetall(loginName);
		}

		this.logger.log(
			red(`${this.loggerPrefix} login name: ${loginName}, email: ${email}, date of birth: ${dateOfBirth}`)
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
		console.log('here');
		const potentialUserEntry: Record<string, string> = await this.redisDatabaseService.redisDatabase.hgetall(
			loginName
		);
		console.log(potentialUserEntry);

		if (compareSync(password, potentialUserEntry?.password)) {
			return potentialUserEntry;
		}

		// if the passwords don't match simply throw an exception and don't give away details.
		throw new Error();
	};

	/**
	 * Checks if a given user name exists.
	 *
	 * @param userName, the request is assumed to be validated by this point in time.
	 * @returns boolean, if the user name exists or not.
	 */
	public readonly userNameExists = async (userName: Readonly<string>): Promise<boolean> => {
		const loginNameField: keyof User = 'loginName';
		const result = await this.redisDatabaseService.redisDatabase.hget(userName, loginNameField);

		this.logger.log(
			green(`${this.loggerPrefix} finding by field ${loginNameField} to check ${result} against ${userName}`)
		);

		return userName === result;
	};
}
