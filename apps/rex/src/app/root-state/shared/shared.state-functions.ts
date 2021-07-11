export const getError = <T>(state: T): Record<string, string> => state['error'];
export const getIsLoading = <T>(state: T): boolean => state['isLoading'];
