import 'reflect-metadata';

import { config } from 'dotenv';
import chalk from 'chalk';
import { AuthenticationServerFactory } from './authentication-server';
import { autheniticationConfiguration } from './config/auth-api-config';

config();

const { port, hostName } = autheniticationConfiguration;

const loggerPrefix = '[AuthServerCreation]';
const serverFactory: AuthenticationServerFactory = new AuthenticationServerFactory();
const logger = console;

serverFactory.bootstrap().listen(port as number, hostName, () => {
	logger.log(
		chalk.green(
			`${loggerPrefix} CORS ENABLED ON DOMAIN(S): ${
				autheniticationConfiguration?.whiteList?.join(' ') ?? 'NO WHITELISTED DOMAIN(S)'
			}.`
		)
	);
	logger.log(
		chalk.green(
			`${loggerPrefix} APPLICATION NAME: ${autheniticationConfiguration?.applicationName ?? 'NO APPLICATION NAME'}`
		)
	);
	logger.log(chalk.green(`${loggerPrefix} HOSTNAME: ${autheniticationConfiguration?.hostName ?? 'NO HOST NAME'}.`));
	logger.log(chalk.green(`${loggerPrefix} PORT: ${autheniticationConfiguration?.port ?? 'NO PORT'}.`));
});
