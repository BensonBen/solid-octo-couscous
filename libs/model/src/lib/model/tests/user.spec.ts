import { User } from './user';
import * as moment from 'moment';

describe('user model test suite', () => {
	const user: User = {
		approvalNotes: 'approval notes',
		description: 'user description',
		email: 'email@email.com',
		password: '12345',
		dateOfBirth: moment('01-01-2020'),
		createdOn: moment('01-01-2020'),
		isApproved: true,
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

	it('should set the date correctly', () => {
		expect(user.dateOfBirth.get('year')).toBe(2020);
		expect(user.dateOfBirth.get('month')).toBe(0);
		expect(user.dateOfBirth.get('day')).toBe(3);
	});
});
