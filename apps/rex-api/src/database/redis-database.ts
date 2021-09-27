import { green, red } from 'chalk';

import { Redis, RedisOptions } from 'ioredis';
import { singleton } from 'tsyringe';
import * as IORedis from 'ioredis';

@singleton()
export class RedisDatabaseService {
	public redisDatabase: Redis;
	private readonly loggerPrefix: string = '[RedisDatabaseService]';
	private readonly logger = console;

	constructor() {
		this.logger.log(
			green(`${this.loggerPrefix} REDIS PORT: ${process?.env?.AUTH_API_REDIS_PORT ?? `NO PORT SUPPLIED`}.`)
		);
		this.logger.log(
			green(`${this.loggerPrefix} REDIS HOST: ${process?.env?.AUTH_API_REDIS_HOST ?? `NO HOST SUPPLIED`}.`)
		);
		this.logger.log(
			green(`${this.loggerPrefix} REDIS PASS: ${process?.env?.AUTH_API_REDIS_PASS ?? `NO PASS SUPPLIED`}.`)
		);

		const options: RedisOptions = {
			port: +process?.env?.AUTH_API_REDIS_PORT,
			host: process?.env?.AUTH_API_REDIS_HOST,
			password: process?.env?.AUTH_API_REDIS_PASS,
		};

		this.redisDatabase = new IORedis(options);
		this.redisDatabase.on('error', err => {
			this.logger.log(red(JSON.stringify(err)));
			this.logger.trace();
			// uncaught fatal exception kill the node process prevent it from starting.
			process.exit(1);
		});

		this.redisDatabase.on('connect', () => {
			this.logger.log(green(`${this.loggerPrefix} CONNECTED TO REDIS.`));
		});
	}
}
