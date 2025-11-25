<script lang="ts">
	import type { LngLatLike } from 'maplibre-gl';
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { Search } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import BottomNavigationBar from '../components/bottom-navigation-bar.svelte';

	let mapContainer: HTMLDivElement | string;
	let searchValue: string = $state('');

	const placeholders = [
		'Tapsilog',
		'Hotsilog',
		'Chicharon Bulaklak',
		'Milktea',
		'Siomai Rice',
		'Lumpiang Shanghai',
		'Shawarma Rice'
	];
	let current = 0;
	let display = $state('');
	let charIndex = 0;

	function animatePlaceholder() {
		const text = placeholders[current];
		display = '';
		charIndex = 0;

		const interval = setInterval(() => {
			display = text.slice(0, charIndex + 1);
			charIndex++;
			if (charIndex === text.length) {
				clearInterval(interval);
				setTimeout(() => {
					current = (current + 1) % placeholders.length;
					animatePlaceholder();
				}, 1200); // Pause before next word
			}
		}, 100); // Typing speed
	}

	animatePlaceholder();

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

			let geolocate = new maplibregl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			});

			let marker = new maplibregl.Marker({
				color: '#FFFFFF',

				draggable: true
			})
				.setLngLat(coordinates)
				.addTo(map);

			map.addControl(geolocate, 'top-right');
			map.on('load', () => {
				geolocate.trigger();
			});
		});
	});
</script>

<div class="relative m-0 h-screen overflow-hidden p-0">
	<div class="md:w-lg absolute left-1/2 top-4 z-10 w-full -translate-x-1/2 px-4">
		<div class="relative flex w-full items-center rounded-2xl bg-white">
			<Search class="text-muted-background absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
			<Input
				type="search"
				placeholder={display || ''}
				class="w-full rounded-2xl pl-9 text-gray-700"
			/>
		</div>
	</div>
	<div bind:this={mapContainer} class="map h-full"></div>
	<div class="z-100 absolute bottom-0 min-h-48 w-full rounded-t-2xl bg-white p-4">
		<div class="mx-auto max-w-6xl">Hi guix welcoem to my vlog</div>
	</div>
</div>
<BottomNavigationBar />

<style>
	:global(.maplibregl-ctrl-top-right) {
		display: none;
	}
</style>
