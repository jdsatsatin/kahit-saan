<script lang="ts">
	import type { PageProps } from './$types';
	import ChildNavbar from '../../components/child-navbar.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import ImagePlaceholder from '$lib/assets/image-placeholder.webp';
	import { StorageService } from '$lib/services/storage.service';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import {
		MapPin,
		AtSign,
		Phone,
		Facebook,
		Instagram,
		X,
		ChevronLeft,
		ChevronRight,
		ArrowLeft
	} from '@lucide/svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Accept the page data prop correctly (PageProps is the props object type; data is the payload)
	export let data: PageProps['data'];

	// Current image index as a number or null
	let currentImageIndex: number | null = null;
	// Derived boolean for showing overlay
	let showImageOverlay = false;

	// Keep currentImageIndex in sync with the URL search param
	$: {
		const imageParam = $page.url.searchParams.get('image');
		currentImageIndex = imageParam ? parseInt(imageParam) : null;
	}

	// Update derived boolean
	$: showImageOverlay = currentImageIndex !== null;

	function openImageOverlay(index: number) {
		const url = new URL($page.url);
		url.searchParams.set('image', index.toString());
		goto(url.toString(), { replaceState: true, noScroll: true });
	}

	function closeImageOverlay() {
		const url = new URL($page.url);
		url.searchParams.delete('image');
		goto(url.toString(), { replaceState: true, noScroll: true });
	}

	function navigateImage(direction: 'prev' | 'next') {
		if (!data.store?.images) return;
		const current = currentImageIndex ?? 0;
		let newIndex;

		if (direction === 'prev') {
			newIndex = current === 0 ? data.store.images.length - 1 : current - 1;
		} else {
			newIndex = current === data.store.images.length - 1 ? 0 : current + 1;
		}

		openImageOverlay(newIndex);
	}

	const contacts = [
		{ icon: MapPin, info: data.store?.address, onclick: () => {} },
		{ icon: AtSign, info: data.store?.email_address, onclick: () => {} },
		{ icon: Phone, info: data.store?.phone_number, onclick: () => {} },
		{
			icon: Facebook,
			info: data.store?.facebook_link,
			onclick: () => {
				window.open(data?.store?.facebook_link ?? 'https://facebook.com', '_blank');
			}
		},
		{
			icon: Instagram,
			info: data.store?.instagram_link,
			onclick: () => {
				window.open(data?.store?.instagram_link ?? 'https://instagram.com', '_blank');
			}
		}
	];
</script>

{#if data.store}
	<div class="mx-auto max-w-3xl pb-24">
		<!-- Carousel with overlaid back button -->
		<div class="relative">
			<Carousel.Root>
				<Carousel.Content class="h-60">
					{#each data.store.images as image, index}
						<Carousel.Item>
							<button on:click={() => openImageOverlay(index)} class="w-full">
								<div
									class="relative aspect-[16/9] w-full cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
								>
									<img
										src={StorageService.getPublicUrl('stores', `${data.store.id}/${image}`) ||
											ImagePlaceholder}
										alt={data.store.name}
										class="absolute inset-0 h-full w-full object-cover"
									/>
								</div>
							</button>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
			</Carousel.Root>

			<!-- Back button overlay -->
			<button
				on:click={() => goto('/')}
				class="absolute left-2 top-2 z-10 flex items-center gap-2 rounded-full px-3 py-2 text-white transition-all hover:bg-opacity-70"
			>
				<ArrowLeft class="h-5 w-5" />
			</button>
		</div>

		<div class="px-4">
			<p class="mt-4 text-sm text-gray-700">{data.store.description}</p>
			<Separator class="my-4" />
			<div class="flex flex-col gap-3">
				{#each contacts as { icon: Icon, info, onclick }}
					{#if info}
						<!-- changed attribute binding: {onclick} -> on:click={onclick} -->
						<button on:click={onclick}>
							<div class="flex flex-row items-center gap-2">
								<Icon class="h-5 w-5 flex-shrink-0 text-gray-700" />
								<p class="truncate text-sm text-gray-700">{info}</p>
							</div>
						</button>
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<div class="fixed bottom-0 mx-auto w-full bg-white p-4">
		<div class="mx-auto flex max-w-3xl flex-row justify-center gap-2">
			{#if data.store.facebook_link}
				<!-- changed prop to Svelte event binding -->
				<Button
					class="flex-1 bg-[#1877F2]"
					onclick={() =>
						window.open(data?.store?.facebook_link ?? 'https://facebook.com', '_blank')}
				>
					<div class="flex flex-row items-center gap-2">
						<img src="/messenger-icon.png" alt="Messenger Icon" class="h-4 w-4" />
						<p>Message</p>
					</div>
				</Button>
			{/if}

			<Button class="flex-1 bg-[#B0CE88]">
				<div class="flex flex-row items-center gap-2">
					<MapPin class="h-5 w-5 flex-shrink-0" /> Get Directions
				</div>
			</Button>
		</div>
	</div>

	<!-- Full-screen image overlay -->
	{#if showImageOverlay && data.store.images && currentImageIndex !== null}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
			<!-- Close button -->
			<button
				on:click={closeImageOverlay}
				class="absolute right-4 top-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all
				hover:bg-opacity-70"
			>
				<X class="h-6 w-6" />
			</button>

			<!-- Navigation buttons -->
			<button
				on:click={() => navigateImage('prev')}
				class="absolute left-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70"
			>
				<ChevronLeft class="h-6 w-6" />
			</button>

			<button
				on:click={() => navigateImage('next')}
				class="absolute right-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70"
			>
				<ChevronRight class="h-6 w-6" />
			</button>

			<!-- Current image -->
			<div class="flex h-full w-full items-center justify-center p-4">
				<img
					src={StorageService.getPublicUrl(
						'stores',
						`${data.store.id}/${data.store.images[currentImageIndex]}`
					)}
					alt={data.store.name}
					class="max-h-full max-w-full object-contain"
				/>
			</div>

			<!-- Image counter -->
			<div
				class="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-black bg-opacity-50 px-3 py-1 text-sm text-white"
			>
				{(currentImageIndex ?? 0) + 1} / {data.store.images.length}
			</div>
		</div>
	{/if}
{:else}
	<p class="text-red-500">Store not found.</p>
{/if}
