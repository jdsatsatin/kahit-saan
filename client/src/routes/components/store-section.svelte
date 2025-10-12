<script lang="ts">
	import placeholderImage from '$lib/assets/image-placeholder.webp';
	import ToyBitz from '$lib/assets/toy-bitz.jpg.png';

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
	<h2 class="mb-4 text-base font-bold">Nearby Stores</h2>
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

<style>
	.hide-scrollbar {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
