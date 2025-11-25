<script lang="ts">
	import type { LngLatLike } from 'maplibre-gl';
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';

	let mapContainer: HTMLDivElement | string;

	onMount(async () => {
		const maplibregl = await import('maplibre-gl');

		// Get initial position
		navigator.geolocation.getCurrentPosition(async (pos) => {
			let coordinates: LngLatLike = [pos.coords.longitude, pos.coords.latitude];

			const map = new maplibregl.Map({
				container: mapContainer,
				style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
				center: coordinates,
				zoom: 13
			});

			// map.addControl(new maplibregl.NavigationControl());

			let geolocate = new maplibregl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			});

			map.addControl(geolocate, 'top-right');
			map.on('load', () => {
				geolocate.trigger();
			});
		});
	});
</script>

<div class="relative m-0 h-screen overflow-hidden p-0">
	<div class="md:w-lg absolute left-1/2 top-4 z-10 w-full -translate-x-1/2 px-4">
		<div class="flex gap-2">
			<input
				type="text"
				placeholder="Search..."
				class="flex-1 rounded-lg bg-white px-4 py-2 text-black shadow"
			/>
		</div>
	</div>
	<div bind:this={mapContainer} class="map h-full"></div>
</div>

<style>
	:global(.maplibregl-ctrl-top-right) {
		margin-top: 60px !important;
		margin-right: 8px !important;
		/* Add more custom positioning if needed */
	}
</style>
