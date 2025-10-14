<script lang="ts">
	import type { PageProps } from './$types';
	import ChildNavbar from '../../components/child-navbar.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import ImagePlaceholder from '$lib/assets/image-placeholder.webp';
	import { StorageService } from '$lib/services/storage.service';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data }: PageProps = $props();
</script>

{#if data.store}
	<ChildNavbar title={data.store.name || 'Store Details'} />

	<div class="mx-auto max-w-3xl p-4">
		<Carousel.Root>
			<Carousel.Content class="h-50">
				{#each data.store.images as image}
					<Carousel.Item>
						<img
							src={StorageService.getPublicUrl('stores', `${data.store.id}/${image}`) ||
								ImagePlaceholder}
							alt={data.store.name}
							class="h-50 w-full rounded-2xl object-cover"
						/>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
		<p class="mt-4 text-xl font-semibold">{data.store.name}</p>
		<p class="mt-4 text-sm text-gray-700">{data.store.description}</p>
	</div>
	<div class="fixed bottom-0 w-full max-w-3xl p-4">
		<div class="flex flex-row gap-2">
			<Button class="flex-1">Message</Button>
			<Button class="flex-1">Get Directions</Button>
		</div>
	</div>
{:else}
	<p class="text-red-500">Store not found.</p>
{/if}
