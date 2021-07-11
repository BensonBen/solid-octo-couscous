import { SocAuthenticationConfiguration } from '@solid-octo-couscous/model';

export const autheniticationConfiguration: SocAuthenticationConfiguration = {
	applicationName: process.env.AUTH_API_APP_NAME,
	port: process.env.AUTH_API_PORT,
	hostName: process.env.AUTH_API_HOST_NAME,
	whiteList: [process.env.AUTH_API_WHITE_LIST_DOMAIN],
};
