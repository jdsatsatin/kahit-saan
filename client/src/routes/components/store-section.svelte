<script lang="ts">
	import placeholderImage from '$lib/assets/image-placeholder.webp';
	import { ChevronRight } from '@lucide/svelte';
	import { storeService } from '$lib/services/stores.service';
	import { StorageService } from '$lib/services/storage.service';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { locationStore } from '$lib/stores/location.svelte';
	import { onMount } from 'svelte';

	let storesPromise: Promise<any[]> = Promise.resolve([]);
	let userLocation = { latitude: 0, longitude: 0 };

	locationStore.subscribe((loc) => {
		if (loc.latitude !== 0 && loc.longitude !== 0 && !loc.loading) {
			userLocation = { latitude: loc.latitude, longitude: loc.longitude };
			loadNearbyStores();
		}
	});

	async function loadNearbyStores() {
		storesPromise = storeService.getNearbyStores(
			userLocation.latitude,
			userLocation.longitude,
			50,
			10
		);
	}

	onMount(() => {
		// Fallback if location is already available
		if (userLocation.latitude !== 0 && userLocation.longitude !== 0) {
			loadNearbyStores();
		}
	});
</script>

<div class="mx-auto max-w-3xl px-4 pt-4">
	<div class="align-items-center mb-2 flex justify-between">
		<h2 class="text-base font-bold">Nearby Stores</h2>
		<div class="rounded-full bg-gray-100 p-1">
			<a href="/stores"> <ChevronRight class="h-5 w-5" /> </a>
		</div>
	</div>
	{#await storesPromise}
		<div class="hide-scrollbar flex gap-6 overflow-x-auto pb-2">
			{#each Array(5) as _, i}
				<div class="w-30 flex-shrink-0">
					<!-- Logo skeleton -->
					<Skeleton class="mb-2 aspect-square w-full rounded-2xl" />
					<!-- Store name skeleton -->
					<Skeleton class="mb-1 h-4 w-3/4" />

					<!-- Distance skeleton -->
					<Skeleton class="h-2 w-12" />
				</div>
			{/each}
		</div>
	{:then stores}
		<div class="hide-scrollbar flex gap-6 overflow-x-auto pb-2">
			{#each stores as store}
				<a href={`/stores/${store.id}`} class="w-30 flex-shrink-0 rounded-lg">
					<img
						src={StorageService.getPublicUrl('stores', `${store.id}/${store.logo}`) ||
							placeholderImage}
						alt={store.name}
						class="mb-2 aspect-square w-full rounded-2xl object-contain"
					/>
					<p class="text-xs font-semibold">{store.name}</p>
					{#if store.distance}
						<p class="text-xs text-gray-500">{store.distance.toFixed(2)} km</p>
					{/if}
				</a>
			{/each}
		</div>
	{/await}
</div>
