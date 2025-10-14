<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import { previousRoute } from '$lib/stores/navigation.svelte';
	import { afterNavigate } from '$app/navigation';
	let { children } = $props();

	let lastRoute: string | '/' = '/';

	afterNavigate((from) => {
		if (from) {
			lastRoute = from.from?.url.pathname || '/';
			previousRoute.set(lastRoute);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
