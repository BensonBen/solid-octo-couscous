import { AuthDataProvider } from '../auth-data-provider';

describe('AuthDataProvider', () => {
    let authDataProvider: AuthDataProvider;

    beforeEach(() => {
        authDataProvider = new AuthDataProvider();
    });

    it('should create', () => {
        expect(authDataProvider).toBeDefined();
    });
});
