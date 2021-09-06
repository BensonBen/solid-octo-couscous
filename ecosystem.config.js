module.exports = {
	apps: [
		{
			name: 'REX API',
			script: './dist/apps/rex-api/main.js',
			node_args: '-r dotenv/config --max_old_space_size=8192',
			env: {
				NODE_ENV: 'development',
				AUTH_API_APP_NAME: 'REX - API',
				AUTH_API_PORT: '3333',
				AUTH_API_HOST_NAME: 'localhost',
				AUTH_API_WHITE_LIST_DOMAIN: 'http://localhost:4200',
				AUTH_API_ENV: `local`,
				AUTH_API_JWT_KEY: `<.JYqDv2L"mSZ~][_uXEwtb>M]<gb9J.$t?'S6`,
				AUTH_API_JWT_AUDIENCE: `http://localhost:4200`,
				AUTH_API_JWT_ISSUER: `http://localhost:3333`,
				AUTH_API_JWT_ALG: `HS256`,
				AUTH_API_REDIS_PORT: `6379`,
				AUTH_API_REDIS_HOST: `0.0.0.0`,
				AUTH_API_REDIS_PASS: `nrjjjfdC6tsIrHf4mXdMykCLQbkgfNUUaC4dmwsZ7Qj8HMzpg3zQQCQBcjsSje/0/QEGdxPsqG5M2Bhu%`,
				AUTH_API_SALT_ROUNDS: `10`,
			},
		},
	],
};
