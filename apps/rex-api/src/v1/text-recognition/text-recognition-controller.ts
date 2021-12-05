import { LoginUserResponse, Transaction, User } from '@solid-octo-couscous/model';
import { red } from 'chalk';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import { autoInjectable, inject } from 'tsyringe';
import { TextRecognitionService } from './text-recognition-service';

@autoInjectable()
export class TextRecognitionController {
	private readonly loggerPrefix: string = `[TextRecognitionController]`;
	private readonly logger = console;
	private readonly baseTransaction: Transaction<Record<string, any>> = {
		data: undefined,
		success: false,
		message: '',
		error: null,
	};
	private readonly somethingWentWrong: string = 'Whoops! something went wrong.';

	constructor(@inject(TextRecognitionService) public textRecognitionService?: TextRecognitionService) {}

	public readonly findTextInImage = async ({ body }: Readonly<Request>, response: Readonly<Response>) => {
		try {
			const newUser = await this.textRecognitionService.findTextInImage(body);
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
