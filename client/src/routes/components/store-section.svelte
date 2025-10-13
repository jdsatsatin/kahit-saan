<script lang="ts">
	import placeholderImage from '$lib/assets/image-placeholder.webp';
	import ToyBitz from '$lib/assets/toy-bitz.jpg.png';
	import { ChevronRight } from '@lucide/svelte';

	const stores = [
		{
			id: 1,
			name: 'Toy Bitz',
			description: 'This is the description for Store 1.',
			image: ToyBitz
		},
		{
			id: 3,
			name: 'Sample Store 3 Cavite City',
			description: 'This is the description for Store 3.'
		},
		{
			id: 3,
			name: 'Sample Store 4 Cavite City',
			description: 'This is the description for Store 3.'
		},
		{
			id: 3,
			name: 'Sample Store 5 Cavite City',
			description: 'This is the description for Store 3.'
		},
		{
			id: 3,
			name: 'Sample Store 6 Cavite City',
			description: 'This is the description for Store 3.'
		}
	];
</script>

<div class="mx-auto max-w-3xl px-4 pt-4">
	<div class="align-items-center mb-2 flex justify-between">
		<h2 class="text-base font-bold">Nearby Stores</h2>
		<div class="rounded-full bg-gray-100 p-1">
			<a href="/stores"> <ChevronRight class="h-5 w-5" /> </a>
		</div>
	</div>

	<div class="hide-scrollbar flex gap-1 overflow-x-auto pb-2">
		{#each stores as store}
			<div class="w-35 flex-shrink-0 rounded-lg">
				<img
					src={store.image || placeholderImage}
					alt={store.name}
					class="mb-2 aspect-square w-full rounded-2xl object-contain"
				/>
				<p class="text-xs font-semibold">{store.name}</p>
			</div>
		{/each}
	</div>
</div>
