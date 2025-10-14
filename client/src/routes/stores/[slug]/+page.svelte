<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div>
	{#if data.store}
		<h1 class="mb-4 text-2xl font-bold">{data.store.name}</h1>
		<p class="text-sm text-gray-600">Store ID: {data.store.id}</p>
	{:else}
		<p class="text-red-500">Store not found.</p>
	{/if}
</div>
