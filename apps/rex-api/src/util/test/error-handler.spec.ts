import { ErrorHandler } from '../error-handler';

describe('ErrorHandler Util', () => {
    let errorHandler: ErrorHandler;

    it('should create', () => {
        errorHandler = new ErrorHandler();
        expect(errorHandler).toBeDefined();
    })
});