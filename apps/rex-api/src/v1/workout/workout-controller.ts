import { Transaction, User } from '@solid-octo-couscous/model';
import { red } from 'chalk';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class WorkoutController {
	private readonly loggerPrefix: string = `[WorkoutController]`;
	private readonly logger = console;
	private readonly baseTransaction: Transaction<User> = {
		data: undefined,
		success: false,
		message: '',
	};
	private readonly somethingWentWrong: string = 'Whoops! something went wrong.';

	public readonly getWorkout = async (request: Request, response: Response) => {
		try {
			return response.status(OK).send({
				...this.baseTransaction,
				data: 'Workout Datas',
				success: true,
			} as Transaction<string>);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to create account with reason: ${JSON.stringify(error)}`));
			return response
				.status(INTERNAL_SERVER_ERROR)
				.send({ ...this.baseTransaction, message: this.somethingWentWrong });
		}
	};
}
