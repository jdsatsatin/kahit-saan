<script lang="ts">
	import type { LngLatLike, Marker } from 'maplibre-gl';
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { Search, Utensils, Coffee, Bike, EggFried, Mic, Store, MapPin } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import BottomNavigationBar from '../components/bottom-navigation-bar.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { pushState } from '$app/navigation';

	// let searchValue: string = $state('');
	let mapContainer: HTMLDivElement | string;

	let places: { name: string; coords: number[] }[] = [
		{ name: 'Mcdonalds J Felipe', coords: [120.88931981432847, 14.475831464503358] }
	];

	const tags = [
		{ name: 'Dine-in', icon: Utensils },
		{ name: 'Take out', icon: Bike },
		{ name: 'Cafe', icon: Coffee },
		{ name: 'KTV', icon: Mic },
		{ name: 'Dine-in', icon: Utensils },
		{ name: 'Take out', icon: Bike },
		{ name: 'Cafe', icon: Coffee },
		{ name: 'Silog', icon: EggFried }
	];
	const placeholders = [
		'Saan may...',
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
	let coords: [number, number] = $state([0, 0]);

	let placeName: string | null = $state(null);

	// Search Animate
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

	// MapGL
	onMount(async () => {
		// Map Initialization
		const maplibregl = await import('maplibre-gl');

		// Initialize Marker Pointer
		let markerPointer: Marker | null;

		// Get position
		navigator.geolocation.getCurrentPosition(async (pos) => {
			const map = new maplibregl.Map({
				container: mapContainer,
				style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
				center: [pos.coords.longitude, pos.coords.latitude],
				zoom: 13
			});

			// Map All Places
			places.forEach((place) => {
				const marker = new maplibregl.Marker({ color: '#3b82f6', draggable: false })
					.setLngLat({ lng: place.coords[0], lat: place.coords[1] })
					.addTo(map);

				marker.getElement().addEventListener('click', (e) => {
					e.stopPropagation(); // Prevent map click event
					placeName = place.name;
					coords = [place.coords[0], place.coords[1]];

					// Remove marker pointer if it exists
					if (markerPointer) {
						markerPointer.remove();
						markerPointer = null;
					}
				});
			});

			// When the map is clicked
			map.on('click', function (e) {
				coords = [e.lngLat.lng, e.lngLat.lat];
				placeName = null;

				// If Marker pointer does not exist, create one
				if (!markerPointer) {
					markerPointer = new maplibregl.Marker({
						color: '#3b82f6',
						draggable: true
					})
						.setLngLat(coords)
						.addTo(map);
				} else {
					// If it exists move the pointer
					markerPointer.setLngLat(coords);
				}
			});

			// Add geolocate
			let geolocate = new maplibregl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			});

			// Add contr
			map.addControl(geolocate);
			map.on('load', () => {
				geolocate.trigger();
			});
		});
	});
</script>

<div class="relative m-0 h-screen overflow-hidden p-0">
	<div class="md:w-lg absolute left-1/2 top-4 z-10 w-full -translate-x-1/2 px-4">
		<div class="relative flex w-full max-w-3xl items-center rounded-2xl bg-white">
			<Search class="text-muted-background absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
			<Input
				type="search"
				placeholder={display || ''}
				class="rounded-4xl w-full pl-9 text-gray-700"
			/>
			<div class="absolute left-0 top-11 w-full">
				<div class="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
					{#each tags as tag}
						<div
							class="flex shrink-0 items-center gap-2 rounded-3xl bg-white px-3 py-1 text-gray-800 shadow-sm"
						>
							<tag.icon class="h-4 w-4" />{tag.name}
						</div>
					{/each}
					<!-- <div class="w-1 shrink-0"></div> -->
				</div>
			</div>
		</div>
	</div>

	<div bind:this={mapContainer} class="map h-full"></div>
	<div class="z-100 absolute bottom-0 hidden min-h-48 w-full rounded-t-3xl bg-white p-4">
		<div class="mx-auto max-w-3xl">
			<div class="flex flex-col gap-2">
				{#if placeName}
					{placeName}
				{:else}
					<div class="flex flex-row text-lg">
						<!-- {coords[0].toString().slice(0, 8)},
					{coords[1].toString().slice(0, 8)} -->

						{coords[0].toString()},
						{coords[1].toString()}
					</div>

					<Separator />
					<button>
						<div class=" flex flex-row items-center gap-2 text-lg">
							<MapPin />
							<p class="">Add a landmark</p>
						</div>
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
<!-- <BottomNavigationBar /> -->
