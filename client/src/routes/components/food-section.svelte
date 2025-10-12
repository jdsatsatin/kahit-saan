<script lang="ts">
	import placeholderImage from '$lib/assets/image-placeholder.webp';

	const products = [
		{
			id: 1,
			name: 'Tapsilog',
			description: 'This is the description for Store 1.',
			image: '/noksilog.jpg'
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
	<h2 class="mb-4 text-base font-bold">Kain Na!</h2>
	<div class="hide-scrollbar flex gap-1 overflow-x-auto pb-2">
		{#each products as product}
			<div class="w-35 flex-shrink-0 rounded-lg">
				<img
					src={product.image || placeholderImage}
					alt={product.name}
					class="mb-2 aspect-square w-full rounded object-contain"
				/>
				<p class="text-xs font-semibold">{product.name}</p>
			</div>
		{/each}
	</div>
</div>
