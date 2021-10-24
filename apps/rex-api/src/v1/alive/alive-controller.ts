import { Transaction, User } from '@solid-octo-couscous/model';
import { red } from 'chalk';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class AliveController {
	private readonly loggerPrefix: string = `[AliveController]`;
	private readonly logger = console;
	private readonly baseTransaction: Transaction<User> = {
		data: undefined,
		success: false,
		message: '',
	};
	private readonly somethingWentWrong: string = 'Whoops! something went wrong.';

	public readonly ping = async (request: Request, response: Response) => {
		try {
			return response.status(OK).send({
				...this.baseTransaction,
				data: 'Pong!',
				success: true,
			} as Transaction<string>);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to check if the server is alive: ${JSON.stringify(error)}`));
			return response.status(INTERNAL_SERVER_ERROR).send({ ...this.baseTransaction, message: this.somethingWentWrong });
		}
	};
}
