import * as bcrypt from 'bcrypt';
import { green } from 'chalk';
import * as redis from 'ioredis';

import { Redis, RedisOptions } from 'ioredis';
import { singleton } from 'tsyringe';

@singleton()
export class RedisDatabaseService {
	public redisDatabase: Redis;
	private readonly loggerPrefix: string = '[RedisDatabaseService]';
	private readonly logger = console;

	constructor() {
		const options: RedisOptions = {
			port: +process.env.AUTH_API_REDIS_PORT,
			host: process.env.AUTH_API_REDIS_HOST,
		};

		this.redisDatabase = new redis(options);
		this.redisDatabase.on('error', error => {
			this.logger.trace();
			this.logger.error(JSON.parse(error.stack));
		});

		this.redisDatabase.on('connect', () => {
			this.logger.log(green(`${this.loggerPrefix} CONNECTED TO REDIS.`));
		});
	}
}
