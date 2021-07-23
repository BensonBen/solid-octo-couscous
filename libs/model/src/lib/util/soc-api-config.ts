export interface SocApiConfiguration {
	applicationName: string;
	port: number | string;
	hostName: string;
	whiteList: Array<string>;
	algorithm: Algorithm;
	redisPort: number;
	redisHost: string;
	jwtSecret: string;
	jwtAudience: string;
	jwtIssuer: string;
}
