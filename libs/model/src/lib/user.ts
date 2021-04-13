import * as moment from 'moment';

export interface User {
	email: string;
	approvalNotes: string;
	password: string;
	description: string;
	dateOfBirth: moment.Moment;
	createdOn: moment.Moment;
	isApproved: boolean;
}
