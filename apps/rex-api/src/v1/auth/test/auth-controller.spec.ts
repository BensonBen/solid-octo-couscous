import { AuthController } from '../auth-controller';
import { AuthService } from '../auth-service';

describe('AuthController', () => {
	const createAccount = jest.fn(() => {
		// no-op.
	});
	const authService = { createAccount };
	let authController: AuthController;

	beforeEach(() => {
		authController = new AuthController(authService as unknown as AuthService);
	});

	it('should create', () => {
		expect(authController).toBeDefined();
	});
});
