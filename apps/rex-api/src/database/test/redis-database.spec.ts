import { RedisDatabaseService } from '../redis-database';

describe('RedisDatabaseService test', () => {
	let redisDatabaseService: RedisDatabaseService;

	beforeEach(() => {
		redisDatabaseService = new RedisDatabaseService();
	});

	it('should create', () => {
		expect(redisDatabaseService).toBeDefined();
	});
});
