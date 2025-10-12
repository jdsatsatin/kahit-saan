<script lang="ts">
	import { onMount } from 'svelte';
	import { MapPin } from '@lucide/svelte';
	let address: any = null;
	let error: string | null = null;
	let loading = true;

	address = true;
	loading = false;
	/*
	onMount(() => {
		if (!navigator.geolocation) {
			error = 'Geolocation is not supported by your browser.';
			loading = false;
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				try {
					const response = await fetch(
						`/api/reverse-geocode?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
					);

					if (!response.ok) throw new Error('Failed to fetch address');

					const data = await response.json();
					address = data.parsed;
				} catch (err) {
					error = 'Failed to fetch address.';
				} finally {
					loading = false;
				}
			},
			(err) => {
				error = err.message;
				loading = false;
			}
		);
	});
  */
</script>

<!-- Display -->
{#if loading}
	<p>Fetching your location...</p>
{:else if error}
	<p class="text-red-500">{error}</p>
{:else if address}
	<div class="flex h-7 items-center">
		<MapPin class="mr-2 h-full w-auto text-white" />
		<div class="flex flex-col justify-center gap-0 leading-tight text-white">
			<p class="pb-0 text-base font-semibold text-white">427 Ronquillo</p>
			<p class="text-xs text-white">Cavite City</p>
		</div>
	</div>
{:else}
	<p>No address found.</p>
{/if}
