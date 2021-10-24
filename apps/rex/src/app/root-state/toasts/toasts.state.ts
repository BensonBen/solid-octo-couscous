import { EntityState } from '@ngrx/entity';

export interface State extends EntityState<any> {
	isLoaded: boolean;
	loading: boolean;
	error: Record<string, string>;
}

export const initialState: State = {
	ids: [],
	entities: {},
	isLoaded: false,
	loading: false,
	error: {},
};
