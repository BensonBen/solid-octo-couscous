import * as cors from 'cors';
import * as helmet from 'helmet';
import * as expressServer from 'express';
import * as morgan from 'morgan';

import { autheniticationConfiguration } from './config/auth-api-config';
import { json, urlencoded } from 'body-parser';
import { Application, Router } from 'express';
import { ErrorHandler } from './util/error-handler';
import { green } from 'chalk';
import { autoInjectable, inject } from 'tsyringe';
import * as jwt from 'express-jwt';
import { isEmpty as _isEmpty } from 'lodash';
import { AuthController } from './v1/auth/auth-controller';
import { WorkoutController } from './v1/workout/workout-controller';
import { Algorithm } from 'jsonwebtoken';
import { AliveController } from './v1/alive/alive-controller';
import { environment } from './environments/environment';
import { NOT_FOUND } from 'http-status';

/** This class is designed to produce express servers with a default configuration depending on the environment file. */
@autoInjectable()
export class AuthenticationServerFactory {
	public readonly logger = console.log;
	private readonly loggerPrefix: string = `[AuthenticationServerFactory]`;
	private readonly jwtTokenAlgorithm: Algorithm = process?.env?.AUTH_API_JWT_ALG as Algorithm;
	private readonly secret = process?.env?.AUTH_API_JWT_KEY;
	private readonly audience = process?.env?.AUTH_API_JWT_AUDIENCE;
	private readonly issuer = process?.env?.AUTH_API_JWT_ISSUER;

	constructor(@inject(ErrorHandler) public errorHandler?: ErrorHandler) {}

	public bootstrap(): Application {
		const authenticationServer = expressServer();

		if (_isEmpty(this.secret) || _isEmpty(this.audience) || _isEmpty(this.issuer)) {
			// uncaught fatal exception kill the node process prevent it from starting.
			process.exit(1);
		}

		authenticationServer.use(
			jwt({
				secret: this.secret,
				audience: this.audience,
				issuer: this.issuer,
				algorithms: [this.jwtTokenAlgorithm],
			}).unless({
				path: [
					'/v1/auth/createAccount',
					'/v1/auth/login',
					'/v1/alive/server',
					'/v1/auth/userNameExists',
					'/v1/auth/isLoggedIn',
				],
			})
		);

		authenticationServer.use(cors({ origin: autheniticationConfiguration.whiteList }));
		authenticationServer.use(json());
		authenticationServer.use(urlencoded({ extended: false }));
		authenticationServer.use(helmet());
		authenticationServer.use(
			morgan('common', {
				skip: environment.production ? (req, res) => res.statusCode < NOT_FOUND : () => false,
			})
		);

		this.logger(green(`${this.loggerPrefix} CREATING SERVER MIDDLEWEAR.`));

		// Setup auto-injected dependencies.
		const authController: AuthController = new AuthController();
		const workoutController: WorkoutController = new WorkoutController();
		const aliveController: AliveController = new AliveController();

		// Setup routing.
		const versionOneRouter: Router = Router();
		const authRouter: Router = Router();
		const workoutRouter: Router = Router();
		const aliveRouter: Router = Router();

		// auth sub routes.
		authRouter.post('/login', authController.login);
		authRouter.post('/createAccount', authController.createAccount);
		authRouter.post('/isLoggedIn', authController.isLoggedIn);
		authRouter.get('/isDuplicateUserName', authController.isDuplicateUserName);

		// workout sub routes.
		workoutRouter.get('/get', workoutController.getWorkout);

		// alive sub routes.
		aliveRouter.get('/server', aliveController.ping);

		// version one sub routes.
		versionOneRouter.use('/auth', authRouter);
		versionOneRouter.use('/workout', workoutRouter);
		versionOneRouter.use('/alive', aliveRouter);

		// version one route.
		authenticationServer.use('/v1', versionOneRouter);

		this.logger(green(`${this.loggerPrefix} CREATING SERVER ROUTING PATHWAYS.`));

		// setup generic error handling.
		authenticationServer.use(this.errorHandler.notFound);
		authenticationServer.use(this.errorHandler.internalServerError);
		this.logger(green(`${this.loggerPrefix} CREATING SERVER GENERIC ERROR HANDLING.`));

		return authenticationServer;
	}
}
