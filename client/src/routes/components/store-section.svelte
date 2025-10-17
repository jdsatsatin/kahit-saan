<script lang="ts">
	import placeholderImage from '$lib/assets/image-placeholder.webp';
	import { ChevronRight } from '@lucide/svelte';
	import { StoreService } from '$lib/services/stores.service';
	import { StorageService } from '$lib/services/storage.service';
	import { Skeleton } from '$lib/components/ui/skeleton';

	const storesPromise = StoreService.getStores();
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
					<p class="text-xs text-gray-500">1.1km</p>
				</a>
			{/each}
		</div>
	{/await}
</div>
