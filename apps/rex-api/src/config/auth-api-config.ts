import { SocApiConfiguration } from '@solid-octo-couscous/model';

export const autheniticationConfiguration: SocApiConfiguration = {
	applicationName: process?.env?.AUTH_API_APP_NAME,
	port: process?.env?.AUTH_API_PORT,
	hostName: process?.env.AUTH_API_HOST_NAME,
	whiteList: [process?.env?.AUTH_API_WHITE_LIST_DOMAIN],
	algorithm: process?.env?.AUTH_API_JWT_ALG as unknown as Algorithm,
	redisPort: +process?.env?.AUTH_API_REDIS_PORT,
	jwtAudience: process?.env?.AUTH_API_JWT_AUDIENCE,
	jwtIssuer: process?.env?.AUTH_API_JWT_ISSUER,
	jwtSecret: process?.env?.AUTH_API_JWT_KEY,
	redisHost: process?.env?.AUTH_API_REDIS_HOST,
};
