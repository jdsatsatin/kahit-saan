<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import { previousRoute } from '$lib/stores/navigation.svelte';

	export let title: string = 'Stores Near You';
</script>

<div class="relative sticky top-0 mx-auto flex w-full max-w-3xl items-center bg-white py-2">
	<!-- Left arrow -->
	<a href={$previousRoute} class="absolute left-3 flex items-center">
		<ArrowLeft class="h-6 w-6" />
	</a>

	<!-- Center text -->
	<p class="mx-auto text-center text-lg font-semibold">{title}</p>
</div>
