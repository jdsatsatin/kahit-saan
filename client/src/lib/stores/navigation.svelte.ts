import { writable } from 'svelte/store';

export let previousRoute = writable<string | null>('/');
