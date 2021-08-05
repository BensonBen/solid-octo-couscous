import { AuthController } from '../auth-controller';
import { AuthService } from '../auth-service';

describe('AuthController', () => {
	const createAccount = jest.fn(() => {
		// no-op.
	});
	const login = jest.fn(() => {
		// no-op.
	});
	const isDuplicateUserName = jest.fn(() => {
		// no-op.
	});
	const isLoggedIn = jest.fn(() => {
		// no-op.
	});
	const authService = { createAccount, login, isDuplicateUserName, isLoggedIn };
	let authController: AuthController;

	beforeEach(() => {
		authController = new AuthController(authService as unknown as AuthService);
	});

	it('should create', () => {
		expect(authController).toBeDefined();
	});
});
