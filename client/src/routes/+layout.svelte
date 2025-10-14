<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { previousRoute } from '$lib/stores/navigation.svelte';
	import { afterNavigate } from '$app/navigation';

	const queryClient = new QueryClient();

	let { children } = $props();

	let lastPath: string | null = null;

	afterNavigate((nav) => {
		if (nav.from !== nav.to && nav.from) {
			lastPath = nav.from?.url.pathname || null;
			previousRoute.set(lastPath);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	{@render children?.()}
</QueryClientProvider>
