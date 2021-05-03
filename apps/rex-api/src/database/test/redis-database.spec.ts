import { RedisDatabaseService } from '../redis-database';

describe('RedisDatabaseService test', () => {
    let redisDatabaseService: RedisDatabaseService;

    it('should create', () => {
        redisDatabaseService = new RedisDatabaseService();
        expect(redisDatabaseService).toBeDefined();
    })
});