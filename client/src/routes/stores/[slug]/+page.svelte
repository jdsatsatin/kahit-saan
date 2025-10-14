<script lang="ts">
	import type { PageProps } from './$types';
	import ChildNavbar from '../../components/child-navbar.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import ImagePlaceholder from '$lib/assets/image-placeholder.webp';
	import { StorageService } from '$lib/services/storage.service';

	let { data }: PageProps = $props();
</script>

{#if data.store}
	<ChildNavbar title={data.store.name || 'Store Details'} />

	<div class="mx-auto max-w-3xl px-4">
		<div class="relative">
			<div class="">
				<Carousel.Root class="">
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
			</div>
			<!-- Bottom avatar overlaps only halfway -->
			<img
				src={StorageService.getPublicUrl('stores', `${data.store.id}/${data.store.logo}`)}
				alt=""
				class="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white object-cover shadow-lg"
			/>
		</div>
		<!-- Flex container BELOW the image -->
		<div class="pt-26 flex flex-row items-center justify-center gap-4">
			<!-- Your flex content here -->
			<button class="rounded bg-blue-500 px-4 py-2 text-white">Action 1</button>
			<button class="rounded bg-green-500 px-4 py-2 text-white">Action 2</button>
		</div>
	</div>
{:else}
	<p class="text-red-500">Store not found.</p>
{/if}
