import { writable } from 'svelte/store';
import { afterNavigate } from '$app/navigation';

export let previousRoute = writable<string | null>('/');

afterNavigate((from) => {
	if (from) {
		previousRoute.set(from.from?.url.pathname || null);
	}
});
