import { Test } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationController', () => {
	let controller: AuthenticationController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [AuthenticationService],
			controllers: [AuthenticationController],
		}).compile();

		controller = module.get(AuthenticationController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
