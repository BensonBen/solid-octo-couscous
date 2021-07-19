import { AliveController } from '../alive-controller';

describe('AliveController', () => {
	let aliveController: AliveController;

	beforeEach(() => {
		aliveController = new AliveController();
	});

	it('should create', () => {
		expect(aliveController).toBeDefined();
	});
});
