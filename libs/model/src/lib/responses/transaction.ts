export interface Transaction<T = Record<string, string>> {
	success: boolean;
	data: T;
	message?: string;
	error?: unknown;
}
