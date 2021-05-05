import { green } from 'chalk';
const Redis = require("ioredis");

import { Redis, RedisOptions } from 'ioredis';
import { singleton } from 'tsyringe';
import { environment } from '../environments/environment';

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
		this.redisDatabase = new Redis(options);
		this.redisDatabase.on('error', error => {
			if (!environment.production) {
				this.logger.trace();
				this.logger.error(JSON.parse(error.stack));
			}
		});

		this.redisDatabase.on('connect', () => {
			if (!environment.production) {
				this.logger.log(green(`${this.loggerPrefix} CONNECTED TO REDIS.`));
			}
		});
	}
}
