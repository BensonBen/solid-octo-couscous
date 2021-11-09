import { LoginUserResponse, Transaction, User } from '@solid-octo-couscous/model';
import { red } from 'chalk';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import { autoInjectable, inject } from 'tsyringe';
import { TensorFlowService } from './tensorflow-service';

@autoInjectable()
export class TensorFlowController {
	private readonly loggerPrefix: string = `[TensorFlowController]`;
	private readonly logger = console;
	private readonly baseTransaction: Transaction<User> = {
		data: undefined,
		success: false,
		message: '',
		error: null,
	};
	private readonly somethingWentWrong: string = 'Whoops! something went wrong.';

	constructor(@inject(TensorFlowService) public tensorFlowService?: TensorFlowService) {}

	public readonly createAccount = async ({ body }: Readonly<Request>, response: Readonly<Response>) => {
		try {
			const newUser = await this.tensorFlowService.createAccount(body);
			const data: Transaction<LoginUserResponse> = {
				...this.baseTransaction,
				data: newUser,
				success: true,
			};
			return response.status(OK).send(data);
		} catch (error: unknown) {
			this.logger.log(red(`${this.loggerPrefix} Failed to create account with reason: ${error}`));
			const data = { ...this.baseTransaction, message: this.somethingWentWrong };

			return response.status(INTERNAL_SERVER_ERROR).send(data);
		}
	};
}
