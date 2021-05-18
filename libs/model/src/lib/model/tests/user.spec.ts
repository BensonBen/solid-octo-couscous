import { User } from '../user';

describe('user model test suite', () => {
	const user: User = {
		approvalNotes: 'approval notes',
		description: 'user description',
		email: 'email@email.com',
		password: '12345',
		dateOfBirth: 0,
		createdOn: 0,
		isApproved: 0,
		modifiedOn: 0,
		id: '1234',
		loginName: 'chaoz133',
	};

	it('should set approval notes correctly', () => {
		expect(user.approvalNotes).toBe('approval notes');
	});

	it('should set user description correctly', () => {
		expect(user.description).toBe('user description');
	});

	it('should set email correctly', () => {
		expect(user.email).toBe('email@email.com');
	});

	it('should set password correctly', () => {
		expect(user.password).toBe('12345');
	});
});
