export interface User {
	id: string;
	loginName: string;
	email: string;
	approvalNotes: string;
	password: string;
	description: string;
	dateOfBirth: number;
	createdOn: number;
	modifiedOn: number;
	isApproved: boolean;
}
