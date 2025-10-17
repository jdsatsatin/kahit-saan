import { writable } from 'svelte/store';

export interface Location {
	latitude: number;
	longitude: number;
	error: string | null;
	loading: boolean;
}

const createLocationStore = () => {
	const { subscribe, set, update } = writable<Location>({
		latitude: 0,
		longitude: 0,
		error: null,
		loading: true
	});

	return {
		subscribe,
		setLocation: (lat: number, lng: number) =>
			update((state) => ({
				...state,
				latitude: lat,
				longitude: lng,
				loading: false,
				error: null
			})),
		setError: (error: string) =>
			update((state) => ({
				...state,
				loading: false,
				error
			})),
		setLoading: (loading: boolean) => update((state) => ({ ...state, loading }))
	};
};

export const locationStore = createLocationStore();
