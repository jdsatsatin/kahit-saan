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

{#each stores as store}
	<div class="max-w-6xl p-4">
		<div class="flex w-full flex-row gap-4">
			<img
				src={StorageService.getPublicUrl('stores', `${store.id}/${store.logo}`)}
				alt="Wala"
				class="h-25 w-25"
			/>
			<div class="flex flex-col">
				<div class="flex flex-row items-center gap-1">
					<p class="text-sm font-semibold">{store.name}</p>
					<BadgeCheck class="inline-block h-4 w-4 text-green-500" />
				</div>
				<p class="text-xs">1.1km away</p>
			</div>
		</div>
	</div>
{/each}

{#if loading}
	<p class="py-4 text-center">Loading...</p>
{/if}
