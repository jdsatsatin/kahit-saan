<script lang="ts">
	import type { LngLatLike } from 'maplibre-gl';
	import { onMount } from 'svelte';
	let mapContainer: HTMLDivElement | string;

	onMount(async () => {
		const maplibregl = await import('maplibre-gl');

		// Get initial position
		navigator.geolocation.getCurrentPosition(async (pos) => {
			let coordinates: LngLatLike = [pos.coords.longitude, pos.coords.latitude];

			const map = new maplibregl.Map({
				container: mapContainer,
				style: '/styles/style-osm.json',
				center: coordinates,
				zoom: 14
			});

			map.addControl(new maplibregl.NavigationControl());

			// Add custom current location marker
			const locationMarker = new maplibregl.Marker({ color: '#3b82f6' })
				.setLngLat(coordinates)
				.addTo(map);

			// Update marker position as user moves
			navigator.geolocation.watchPosition((pos) => {
				const newCoords: LngLatLike = [pos.coords.longitude, pos.coords.latitude];
				locationMarker.setLngLat(newCoords);
			});

			let geolocate = new maplibregl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			});

			map.addControl(geolocate);
		});
	});
</script>

<div class="relative m-0 h-screen overflow-hidden p-0">
	<div class="md:w-lg absolute left-1/2 top-4 z-10 w-full -translate-x-1/2 px-4">
		<input
			type="text"
			placeholder="Search..."
			class="w-full rounded-lg bg-white px-4 py-2 text-black shadow"
		/>
	</div>
	<div bind:this={mapContainer} class="map h-full"></div>
</div>
