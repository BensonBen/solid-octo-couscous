import { NewUserRequest } from '@solid-octo-couscous/model';
import { inject, singleton } from 'tsyringe';
import { RedisDatabaseService } from '../../database/redis-database';
import { genSalt, hash } from 'bcrypt';
import { red } from 'chalk';
import { nanoid } from 'nanoid';

@singleton()
export class TextRecognitionDataProvider {
	private readonly logger = console;
	private readonly loggerPrefix = '[TextRecognitionDataProvider]';

	constructor(@inject(RedisDatabaseService) private readonly redisDatabaseService?: RedisDatabaseService) {}

	/**
	 * Create an account in whatever database implementation
	 *
	 * @param userRequest, the request is assumed to be validated by this point in time.
	 * @returns {@link User}, whatever the database insertion gives back.
	 */
	public readonly findTextInImage = async (userRequest: Readonly<NewUserRequest>): Promise<Record<string, string>> => {
		const { loginName, password, email, dateOfBirth } = userRequest;

		const [, hashedPassword] = await Promise.all([
			this.redisDatabaseService.redisDatabase.incr('users:id'),
			hash(password, await genSalt(10)),
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
}
