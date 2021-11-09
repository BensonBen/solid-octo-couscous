import { NewUserRequest } from '@solid-octo-couscous/model';
import { red } from 'chalk';
import { inject, singleton } from 'tsyringe';
import { RedisDatabaseService } from '../../database/redis-database';

@singleton()
export class TensorFlowDataProvider {
	private readonly logger = console;
	private readonly loggerPrefix = '[TensorFlowDataProvider]';

	constructor(@inject(RedisDatabaseService) private readonly redisDatabaseService?: RedisDatabaseService) {}

	public readonly createAccount = async (userRequest: Readonly<NewUserRequest>): Promise<Record<string, string>> => {
		this.logger.log(
			red(`${this.loggerPrefix} login name: ${loginName}, email: ${email}, date of birth: ${dateOfBirth}`)
		);
		// just throw an exception if something went wrong. don't give information that's not needed.
		throw new Error();
	};
}
