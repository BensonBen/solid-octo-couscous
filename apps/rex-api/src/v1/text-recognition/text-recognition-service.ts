import { LoginUserResponse } from '@solid-octo-couscous/model';
import { bgGreen } from 'chalk';
import { inject, singleton } from 'tsyringe';
import { TextRecognitionDataProvider } from './text-recognition-data-provider';
import { omit as _omit } from 'lodash';
import { isEmpty as _isEmpty } from 'lodash';

@singleton()
export class TextRecognitionService {
	private readonly logger = console;
	private readonly loggerPrefix = '[TextRecognitionService]';

	constructor(
		@inject(TextRecognitionDataProvider) private readonly textRecognitionDataProvider?: TextRecognitionDataProvider
	) {}

	public readonly findTextInImage = async (imageData: Record<string, any>): Promise<LoginUserResponse> => {
		this.logger.log(bgGreen(`${this.loggerPrefix} Text Recognition using: ${JSON.stringify(imageData)}`));

		const analyzedImageData: any = await this.textRecognitionDataProvider.findTextInImage(imageData);

		return { ...analyzedImageData };
	};
}
