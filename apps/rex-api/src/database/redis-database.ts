import { green, red } from 'chalk';

import { Redis, RedisOptions } from 'ioredis';
import { singleton } from 'tsyringe';
import { environment } from '../environments/environment';
import * as IORedis from 'ioredis';

@singleton()
export class RedisDatabaseService {
	public redisDatabase: Redis;
	private readonly loggerPrefix: string = '[RedisDatabaseService]';
	private readonly logger = console;

	constructor() {
		const options: RedisOptions = {
			port: +process?.env?.AUTH_API_REDIS_PORT,
			host: process?.env?.AUTH_API_REDIS_HOST,
			password: process?.env?.AUTH_API_REDIS_PASS,
		};

		this.redisDatabase = new IORedis(options);
		this.redisDatabase.on('error', err => {
			if (!environment.production) {
				this.logger.log(red(JSON.stringify(err)));
				this.logger.trace();
			}
		});

		this.redisDatabase.on('connect', () => {
			if (!environment.production) {
				this.logger.log(green(`${this.loggerPrefix} CONNECTED TO REDIS.`));
			}
		});
	}
}
