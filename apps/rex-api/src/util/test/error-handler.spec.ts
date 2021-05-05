import { ErrorHandler } from '../error-handler';

describe('ErrorHandler', () => {
    let errorHandler: ErrorHandler;

    it('should create', () => {
        errorHandler = new ErrorHandler();
        expect(errorHandler).toBeDefined();
    })
});
