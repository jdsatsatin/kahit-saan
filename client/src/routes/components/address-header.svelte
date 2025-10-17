<script lang="ts">
	import { onMount } from 'svelte';
	import { MapPin } from '@lucide/svelte';
	import { locationStore } from '$lib/stores/location.svelte';
	import { parseAddress } from '$lib/utils/parseAddress';
	import { Skeleton } from '$lib/components/ui/skeleton';

	let address: any = null;
	let error: string | null = null;
	let loading = true;

	onMount(() => {
		if (!navigator.geolocation) {
			error = 'Geolocation is not supported by your browser.';
			loading = false;
			locationStore.setError(error);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				// Save coordinates to store
				locationStore.setLocation(pos.coords.latitude, pos.coords.longitude);

				try {
					const response = await fetch(
						`/api/reverse-geocode?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
					);

					if (!response.ok) throw new Error('Failed to fetch address');

					const data = await response.json();

					// Check if we have parsed data
					if (data.parsed) {
						address = data.parsed;
					} else {
						address = parseAddress(data);
					}

					loading = false;
				} catch (err) {
					console.error('Error fetching address:', err);
					error = 'Failed to fetch address.';
					loading = false;
				}
			},
			(err) => {
				error = err.message;
				loading = false;
				locationStore.setError(err.message);
			}
		);
	});
</script>

<!-- Display -->
{#if loading}
	<div class="flex h-7 items-center">
		<Skeleton class="mr-2 h-6 w-6 rounded-full" />
		<div class="flex flex-col justify-center gap-1">
			<Skeleton class="h-4 w-32" />
			<Skeleton class="h-3 w-24" />
		</div>
	</div>
{:else if error}
	<p class="text-sm text-red-500">{error}</p>
{:else if address}
	<div class="flex h-7 items-center">
		<MapPin class="mr-2 h-full w-auto text-white" />
		<div class="flex flex-col justify-center gap-0 leading-tight text-white">
			<p class="pb-0 text-base font-semibold text-white">
				{address.street || address.sublocality || 'Unknown Street'}
			</p>
			<p class="text-xs text-white">{address.city || address.province || 'Unknown City'}</p>
		</div>
	</div>
{:else}
	<p class="text-sm text-white">No address found.</p>
{/if}
