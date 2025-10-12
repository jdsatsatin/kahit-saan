<script lang="ts">
	import placeholderImage from '$lib/assets/image-placeholder.webp';

	const products = [
		{
			id: 1,
			name: 'Tapsilog',
			store: 'Toy Bitz',
			image: '/noksilog.jpg',
			price: 50
		},
		{
			id: 2,
			name: 'Hotsilog',
			image: '/hotsilog.jpg',
			store: 'Toy Bitz',
			price: 50
		},
		{
			id: 3,
			name: 'Noksilog',
			image: '/noksilog.jpg',
			store: 'Toy Bitz',
			price: 50
		},
		{
			id: 4,
			name: 'Spaghetti',
			image: '/spaghetti.jpg',
			store: 'Toy Bitz',
			price: 50
		},
		{
			id: '5',
			name: 'Siomai Rice',
			image: '/siomai-rice.jpg',
			store: 'Toy Bitz',
			price: 50
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
				<p class="pt-1 text-xs">{product.store}</p>
				<p class="pt-2 text-xs font-semibold">P{product.price}.00</p>
			</div>
		{/each}
	</div>
</div>
