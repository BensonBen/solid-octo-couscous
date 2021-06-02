export interface Transaction<T = Record<any, any>> {
	success: boolean;
	data: T;
	message?: string;
}
