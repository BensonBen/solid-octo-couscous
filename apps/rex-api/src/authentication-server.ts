import * as cors from 'cors';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as expressServer from 'express';

import { autheniticationConfiguration } from './config/auth-api-config';
import { json, urlencoded } from 'body-parser';
import { Application, Router } from 'express';
import { ErrorHandler } from './util/error-handler';
import { green } from 'chalk';
import { autoInjectable, inject } from 'tsyringe';
import * as jwt from 'express-jwt';
import { isEmpty as _isEmpty } from 'lodash';
import { AuthController } from './v1/auth/auth-controller';

/** This class is designed to produce express servers with a default configuration depending on the environment file. */
@autoInjectable()
export class AuthenticationServerFactory {
	public readonly logger = console.log;
	private readonly loggerPrefix: string = `[AuthenticationServerFactory]`;

	constructor(@inject(ErrorHandler) public errorHandler?: ErrorHandler) {}

	public generate(): Application {
		const authenticationServer = expressServer();
		const secret = process?.env?.AUTH_API_JWT_KEY;

		// Setup middleware.
		if (_isEmpty(secret)) {
			throw new Error('failed to load secret from environment variables.');
		}

		authenticationServer.use(
			jwt({ secret, algorithms: ['HS256'] }).unless({ path: ['/v1/auth/createAccount', '/v1/auth/login'] })
		);
		authenticationServer.use(cors({ origin: autheniticationConfiguration.whiteList }));
		authenticationServer.use(json());
		authenticationServer.use(urlencoded({ extended: false }));
		authenticationServer.use(helmet());
		this.logger(green(`${this.loggerPrefix} CREATING SERVER MIDDLEWEAR.`));

		// Setup auto-injected dependencies.
		const authController: AuthController = new AuthController();

		// Setup routing.
		const versionOneRouter: Router = Router();
		const authRouter: Router = Router();

		// Setup sub routes.
		authRouter.post('/login', authController.login);
		authRouter.post('/createAccount', authController.createAccount);

		versionOneRouter.use('/auth', authRouter);
		authenticationServer.use('/v1', versionOneRouter);

		this.logger(green(`${this.loggerPrefix} CREATING SERVER ROUTING PATHWAYS.`));

		// setup generic error handling.
		authenticationServer.use(this.errorHandler.notFound);
		authenticationServer.use(this.errorHandler.internalServerError);
		this.logger(green(`${this.loggerPrefix} CREATING SERVER GENERIC ERROR HANDLING.`));

		return authenticationServer;
	}
}
