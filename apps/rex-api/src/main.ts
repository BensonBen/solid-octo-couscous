// only needs to be imported once per tsyringe's instructions.
import 'reflect-metadata';

// according to the dotenv documentation this should be invoked as early as possible
import { config, DotenvConfigOutput } from 'dotenv';
import { green } from 'chalk';
import { AuthenticationServerFactory } from './authentication-server';
import { autheniticationConfiguration } from './config/auth-api-config';

const dotEnvConfig: DotenvConfigOutput = config({ debug: true });

// TODO: wrap this in a debug only environment variable to not log it in any higher environments.
if (dotEnvConfig.error == null) {
	console.log(`Something went wrong with environment variables: ${JSON.stringify(dotEnvConfig?.error)}`);
}

if (process.env.AUTH_API_ENV === 'local') {
	console.log(`Current directory: ${process.cwd()}`);
	console.log(`Dotenv parsed current environment variables: ${JSON.stringify(dotEnvConfig?.parsed)}`);
}

const { port, hostName } = autheniticationConfiguration;

const loggerPrefix = '[AuthServerCreation]';
const serverFactory: AuthenticationServerFactory = new AuthenticationServerFactory();

serverFactory.generate().listen(port as number, hostName, () => {
	console.log(
		green(`${loggerPrefix} CORS ENABLED ON DOMAIN(S): ${autheniticationConfiguration?.whiteList?.join(' ')}.`)
	);
	console.log(green(`${loggerPrefix} APPLICATION NAME: ${autheniticationConfiguration?.applicationName}.`));
	console.log(green(`${loggerPrefix} HOSTNAME: ${autheniticationConfiguration?.hostName}.`));
	console.log(green(`${loggerPrefix} PORT: ${autheniticationConfiguration?.port}.`));
});
