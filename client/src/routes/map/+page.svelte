<script lang="ts">
	import { onMount } from 'svelte';
	let mapContainer: HTMLDivElement | string;

	onMount(async () => {
		// Import only on client
		const maplibregl = await import('maplibre-gl');

		const map = new maplibregl.Map({
			container: mapContainer,
			style: '/styles/style-osm.json',
			center: [120.98, 14.6], // Manila
			zoom: 12
		});

		new maplibregl.NavigationControl();
	});
</script>

<div bind:this={mapContainer} class="map min-h-screen"></div>
