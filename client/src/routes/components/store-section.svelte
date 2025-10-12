<script lang="ts">
	import placeholderImage from '$lib/assets/image-placeholder.webp';
	import placeholderImageGreen from '$lib/assets/image-placeholder-green.webp';
	const stores = [
		{
			id: 1,
			name: 'Sample Store 1 Cavite City',
			description: 'This is the description for Store 1.',
			image: 'https://via.placeholder.com/150'
		},
		{
			id: 2,
			name: 'Sample Store 2 Cavite City',
			description: 'This is the description for Store 2.',
			image: 'https://via.placeholder.com/150'
		},
		{
			id: 3,
			name: 'Sample Store 3 Cavite City',
			description: 'This is the description for Store 3.',
			image: 'https://via.placeholder.com/150'
		},
		{
			id: 3,
			name: 'Sample Store 4 Cavite City',
			description: 'This is the description for Store 3.',
			image: 'https://via.placeholder.com/150'
		},
		{
			id: 3,
			name: 'Sample Store 5 Cavite City',
			description: 'This is the description for Store 3.',
			image: 'https://via.placeholder.com/150'
		},
		{
			id: 3,
			name: 'Sample Store 6 Cavite City',
			description: 'This is the description for Store 3.',
			image: 'https://via.placeholder.com/150'
		}
	];
</script>

<div class="mx-auto max-w-3xl p-4">
	<h2 class="mb-4 text-xl font-bold">Nearby Stores</h2>
	<div class="hide-scrollbar flex gap-1 overflow-x-auto pb-2">
		{#each stores as store}
			<div class="w-35 flex-shrink-0 rounded-lg">
				<img
					src={placeholderImage}
					alt={store.name}
					class="mb-2 aspect-square w-full rounded object-cover"
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
