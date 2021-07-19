import 'reflect-metadata';

import { config } from 'dotenv';
import * as findConfig from 'find-config';
import { green } from 'chalk';
import { AuthenticationServerFactory } from './authentication-server';
import { autheniticationConfiguration } from './config/auth-api-config';

config({ path: findConfig('.env') });

const { port, hostName } = autheniticationConfiguration;

const loggerPrefix = '[AuthServerCreation]';
const serverFactory: AuthenticationServerFactory = new AuthenticationServerFactory();
const logger = console;

serverFactory.bootstrap().listen(port as number, hostName, () => {
	logger.log(
		green(`${loggerPrefix} CORS ENABLED ON DOMAIN(S): ${autheniticationConfiguration?.whiteList?.join(' ')}.`)
	);
	logger.log(green(`${loggerPrefix} APPLICATION NAME: ${autheniticationConfiguration?.applicationName}`));
	logger.log(green(`${loggerPrefix} HOSTNAME: ${autheniticationConfiguration?.hostName}.`));
	logger.log(green(`${loggerPrefix} PORT: ${autheniticationConfiguration?.port}.`));
});
