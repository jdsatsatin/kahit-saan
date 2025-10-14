<script lang="ts">
	import { StoreService } from '$lib/services/stores.service';
	import { onMount } from 'svelte';
	import type { Database } from '$lib/types/database.types';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	type Store = Database['public']['Tables']['stores']['Row'];

	interface Props {
		storeId: string;
	}
	let store = $state<Store | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			loading = true;
			store = await StoreService.getStoreById(data.slug);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to fetch store';
			console.error('Failed to fetch store:', err);
		} finally {
			loading = false;
		}
	});
</script>

<div>
	{data.slug}
	{#if loading}
		<p>Loading store...</p>
	{:else if error}
		<p class="error">Error: {error}</p>
	{:else if store}
		<!-- Access store properties safely -->
		<h1>{store.name}</h1>
		<p>Store ID: {store.id}</p>
		<p>Created: {new Date(store.created_at).toLocaleDateString()}</p>
	{:else}
		<p>Store not found</p>
	{/if}
</div>
