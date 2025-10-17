<script lang="ts">
	import type { PageProps } from './$types';
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

	// Generate Google Maps embed URL
	$: googleMapsUrl =
		data.store?.latitude && data.store?.longitude
			? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${data.store.latitude},${data.store.longitude}&zoom=15`
			: null;

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
	<!-- Hero Section with Image Carousel -->
	<div class="relative">
		<Carousel.Root>
			<Carousel.Content class="h-[60vh] min-h-80">
				{#each data.store.images as image, index}
					<Carousel.Item>
						<button onclick={() => openImageOverlay(index)} class="h-full w-full">
							<div class="relative h-full w-full cursor-pointer overflow-hidden">
								<!-- Gradient overlay for better text readability -->
								<div
									class="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/30"
								></div>
								<img
									src={StorageService.getPublicUrl('stores', `${data.store.id}/${image}`) ||
										ImagePlaceholder}
									alt={data.store.name}
									class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
								/>
							</div>
						</button>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>

		<!-- Back button overlay -->
		<button
			onclick={() => goto('/')}
			class="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2.5 text-white backdrop-blur-md transition-all hover:bg-black/50 active:scale-95"
		>
			<ArrowLeft class="h-4 w-4" />
			<span class="text-sm font-medium">Back</span>
		</button>

		<!-- Store name overlay -->
		<div
			class="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6"
		>
			<div class="mx-auto w-full max-w-3xl">
				<h1 class="text-3xl font-bold tracking-tight text-white drop-shadow-lg">
					{data.store.name}
				</h1>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="mx-auto w-full max-w-3xl pb-24">
		<!-- Store Description Section -->
		<div class="bg-white px-6 py-6">
			<h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">About</h2>
			<p class="text-base leading-relaxed text-gray-800">
				{data.store.description || 'No description available.'}
			</p>
		</div>

		<Separator class="bg-gray-100" />

		<!-- Contact Information Section -->
		<div class="bg-white px-6 py-6">
			<h2 class="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
				Contact Information
			</h2>
			<div class="space-y-1">
				{#each contacts as { icon: Icon, info, onclick }}
					{#if info}
						<button
							{onclick}
							class="group flex w-full min-w-0 items-center gap-1 rounded-xl text-left transition-all active:scale-[0.98] active:bg-gray-50"
						>
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 transition-colors group-active:bg-gray-100"
							>
								<Icon class="text-primary h-5 w-5" />
							</div>
							<div class="min-w-0 flex-1">
								<p class="w-full truncate text-base font-medium text-gray-800" title={info}>
									{info}
								</p>
							</div>
						</button>
					{/if}
				{/each}
			</div>
		</div>

		<Separator class="bg-gray-100" />

		<!-- Location Map Section -->
		{#if data.store.latitude && data.store.longitude}
			<div class="bg-white px-6 py-6">
				<h2 class="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Location</h2>
				<div class="overflow-hidden rounded-2xl">
					<iframe
						title="Store Location"
						src={`https://www.google.com/maps?q=${data.store.latitude},${data.store.longitude}&z=15&output=embed`}
						width="100%"
						height="280"
						style="border:0;"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						class="w-full"
					></iframe>
				</div>
			</div>

			<Separator class="bg-gray-100" />
		{/if}

		<!-- Menu Section -->
		<div class="bg-white px-6 py-6">
			<h2 class="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Menu</h2>
			<div class="flex items-center justify-center rounded-2xl bg-gray-50 py-16">
				<p class="text-base font-medium text-gray-400">Coming Soon</p>
			</div>
		</div>
	</div>

	<!-- Fixed Bottom Action Bar -->
	<div
		class="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 p-4 shadow-2xl backdrop-blur-lg"
	>
		<div class="mx-auto flex w-full max-w-3xl gap-3">
			{#if data.store.facebook_link}
				<Button
					class="flex-1 rounded-2xl bg-[#1877F2] py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#166FE5] active:scale-[0.98]"
					onclick={() =>
						window.open(data?.store?.facebook_link ?? 'https://facebook.com', '_blank')}
				>
					<div class="flex items-center justify-center gap-2.5">
						<img src="/messenger-icon.png" alt="Messenger" class="h-5 w-5" />
						<span>Message</span>
					</div>
				</Button>
			{/if}

			<Button
				class="flex-1 rounded-2xl bg-[#B0CE88] py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#9BC071] active:scale-[0.98]"
			>
				<div class="flex items-center justify-center gap-2.5">
					<MapPin class="h-5 w-5" />
					<span>Directions</span>
				</div>
			</Button>
		</div>
	</div>

	<!-- Full-screen image overlay -->
	{#if showImageOverlay && data.store.images && currentImageIndex !== null}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black">
			<!-- Close button -->
			<button
				onclick={closeImageOverlay}
				class="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
			>
				<X class="h-6 w-6" />
			</button>

			<!-- Navigation buttons -->
			<button
				onclick={() => navigateImage('prev')}
				class="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
			>
				<ChevronLeft class="h-6 w-6" />
			</button>

			<button
				onclick={() => navigateImage('next')}
				class="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
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
				class="absolute bottom-6 left-1/2 -translate-x-1/2 transform rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
			>
				{(currentImageIndex ?? 0) + 1} / {data.store.images.length}
			</div>
		</div>
	{/if}
{:else}
	<div class="flex min-h-screen items-center justify-center bg-gray-50 px-6">
		<div class="w-full max-w-sm text-center">
			<div class="rounded-3xl bg-white p-8 shadow-xl">
				<p class="text-lg font-semibold text-red-500">Store not found</p>
				<p class="mt-2 text-base text-gray-600">The store you're looking for doesn't exist.</p>
				<Button
					onclick={() => goto('/')}
					class="mt-6 w-full rounded-2xl py-3 text-base font-semibold"
				>
					Go Back Home
				</Button>
			</div>
		</div>
	</div>
{/if}
