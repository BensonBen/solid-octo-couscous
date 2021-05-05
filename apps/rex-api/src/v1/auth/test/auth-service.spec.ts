import { AuthDataProvider } from '../auth-data-provider';
import { AuthService } from '../auth-service';

describe('AuthService', () => {
    const authDataProvider: AuthDataProvider = new AuthDataProvider();
    let authService: AuthService;

    beforeEach(async () => {
        authService = await new AuthService(authDataProvider as unknown as AuthDataProvider);
    });

    it('should create', async () => {
        expect(authService).toBeDefined();
    });
});
