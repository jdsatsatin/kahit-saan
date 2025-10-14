<script lang="ts">
	import type { PageProps } from './$types';
	import ChildNavbar from '../../components/child-navbar.svelte';

	let { data }: PageProps = $props();
</script>

{#if data.store}
	<ChildNavbar title={data.store.name || 'Store Details'} />
	<div class="mx-auto max-w-3xl p-4">
		<h1 class="mb-4 text-2xl font-bold">{data.store.name}</h1>
		<p class="text-sm text-gray-600">Store ID: {data.store.id}</p>
	</div>
{:else}
	<p class="text-red-500">Store not found.</p>
{/if}
