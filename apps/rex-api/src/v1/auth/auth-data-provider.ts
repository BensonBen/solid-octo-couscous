import { NewUserRequest } from '@solid-octo-couscous/model';
import { inject, singleton } from 'tsyringe';
import { RedisDatabaseService } from '../../database/redis-database';
import { genSalt, hash } from 'bcrypt';

@singleton()
export class AuthDataProvider {
	private readonly logger = console.log;
	private readonly loggerPrefix = '[AuthDataProvider]';

	private readonly authDataProviderSaltRounds: string = process?.env?.AUTH_API_SALT_ROUNDS;

	constructor(@inject(RedisDatabaseService) private readonly redisDatabaseService?: RedisDatabaseService) {}

	public readonly createAccount = async (userRequest: Readonly<NewUserRequest>): Promise<Record<string, string>> => {
		const { lastName, firstName, loginName, password, email, dateOfBirth } = userRequest;
		const currentNumberOfUsers = await this.redisDatabaseService.redisDatabase.incr('currentUsers');
		const createdOnModifiedOnTime: number = new Date().getTime();

		const newUserHashCreationResult = await this.redisDatabaseService.redisDatabase.hmset(
			`users${currentNumberOfUsers}`,
			'lastName',
			lastName,
			'firstName',
			firstName,
			'loginName',
			loginName,
			'password',
			await hash(password, await genSalt(+this.authDataProviderSaltRounds || 12)),
			'email',
			email,
			'dateOfBirth',
			dateOfBirth,
			'createdOn',
			createdOnModifiedOnTime,
			'modifiedOn',
			createdOnModifiedOnTime,
			'id',
			currentNumberOfUsers
		);

		if (newUserHashCreationResult === 'OK') {
			return this.redisDatabaseService.redisDatabase.hgetall(`users${currentNumberOfUsers}`);
		}

		return Promise.resolve({});
	};
}
