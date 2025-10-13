<script lang="ts">
	// filepath: c:\Users\jdsat\OneDrive\Desktop\nvm\saan-tayo\client\src\routes\stores\+page.svelte
	import ChildNavbar from '../components/child-navbar.svelte';
	import { StoreService } from '$lib/services/stores.service';
	import { StorageService } from '$lib/services/storage.service';
	import { onMount } from 'svelte';
	import { BadgeCheck } from '@lucide/svelte';
	let stores: any[] = [];
	let loading = true;

	onMount(async () => {
		stores = await StoreService.getStores();
		loading = false;
	});
</script>

<ChildNavbar title="Stores Near You" backLink="/" />

<div class="mx-auto max-w-3xl px-4">
	{#each stores as store}
		<div class="flex w-full flex-row gap-5 py-2">
			<img
				src={StorageService.getPublicUrl('stores', `${store.id}/${store.logo}`)}
				alt="Wala"
				class="h-25 w-25 rounded-2xl"
			/>
			<div class="flex flex-col gap-1">
				<div class="flex flex-row items-center gap-1">
					<p class="text-sm font-bold">{store.name}</p>
					<BadgeCheck class="inline-block h-4 w-4" />
				</div>
				<p class="text-xs">1.1km away</p>
				<div class="flex">
					<p class="text-xs text-gray-900">₱</p>
					<p class="text-xs text-gray-500">₱₱₱₱₱</p>
				</div>
				<p class="text-xs text-green-500">10:00 AM - 9:00 PM</p>
			</div>
		</div>
	{/each}
</div>
{#if loading}
	<p class="py-4 text-center">Loading...</p>
{/if}
