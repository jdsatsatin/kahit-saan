<script lang="ts">
	import type { PageProps } from './$types';
	import * as Carousel from '$lib/components/ui/carousel';
	import ImagePlaceholder from '$lib/assets/image-placeholder.webp';
	import { StorageService } from '$lib/services/storage.service';
	import Button from '$lib/components/ui/button/button.svelte';
	import { storeService } from '$lib/services/stores.service';
	import { MapPin, X, ChevronLeft, ChevronRight, ArrowLeft } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import AboutSection from './components/about-section.svelte';
	import ContactSection from './components/contact-section.svelte';
	import MapSection from './components/map-section.svelte';
	import MenuSection from './components/menu-section.svelte';
	import type { Database } from '$lib/types/database.types';
	import { page } from '$app/state';

	let storePromise: Promise<Database['public']['Tables']['stores']['Row'] | null>;
	let pageId: string | undefined = page.params.slug;
	if (pageId) {
		storePromise = storeService.getStoreById(pageId);
	} else {
		storePromise = Promise.resolve(null);
	}

	let currentImageIndex = $state<number | null>(null);

	let showImageOverlay = $derived(currentImageIndex !== null);

	$effect(() => {
		const imageParam = $page.url.searchParams.get('image');
		currentImageIndex = imageParam ? parseInt(imageParam) : null;
	});

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
		if (!store.images) return;
		const current = currentImageIndex ?? 0;
		let newIndex;

		if (direction === 'prev') {
			newIndex = current === 0 ? store.images.length - 1 : current - 1;
		} else {
			newIndex = current === store.images.length - 1 ? 0 : current + 1;
		}

		openImageOverlay(newIndex);
	}
</script>

{#await storePromise}
	laoding
{:then store}
	{#if store}
		<!-- Hero Section with Image Carousel -->
	<div class="relative">
		<Carousel.Root>
			<Carousel.Content class="h-[60vh] min-h-80">
				{#each store.images as image, index}
					<Carousel.Item>
						<button onclick={() => openImageOverlay(index)} class="h-full w-full">
							<div class="relative h-full w-full cursor-pointer overflow-hidden">
								 Gradient overlay for better text readability -->
		 <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/30"
								>
								<img
									src={StorageService.getPublicUrl('stores', `${store.id}/${image}`) ||
										ImagePlaceholder}
									alt={store.name}
									class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
								/>
							</div>
						</button>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>

		<button
			onclick={() => goto('/')}
			class="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2.5 text-white backdrop-blur-md transition-all hover:bg-black/50 active:scale-95"
		>
			<ArrowLeft class="h-4 w-4" />
			<span class="text-sm font-medium">Back</span>
		</button>

		<div
			class="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6"
		>
			<div class="mx-auto w-full max-w-3xl">
				<h1 class="text-3xl font-bold tracking-tight text-white drop-shadow-lg">
					{store.name}
				</h1>
			</div>
		</div>
	</div> 

		<!-- Main Content -->
		<div class="pb-24">
			<AboutSection description={store.description} />

			<!-- Contact Information Section -->

			<ContactSection {store} />

			<!-- Location Map Section -->
			<MapSection {store} />

			<!-- Menu Section -->
			<MenuSection />
		</div>

		<!-- Fixed Bottom Action Bar -->
		<div
			class="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white/95 p-4 shadow-2xl backdrop-blur-lg"
		>
			<div class="mx-auto flex w-full max-w-3xl gap-3">
				{#if store.facebook_link}
					<Button
						class="flex-1 rounded-2xl bg-[#1877F2] py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#166FE5] active:scale-[0.98]"
						onclick={() => window.open(store.facebook_link ?? 'https://facebook.com', '_blank')}
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
		{#if showImageOverlay && store.images && currentImageIndex !== null}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black"> -->
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
						`${store.id}/${store.images[currentImageIndex]}`
					)}
					alt={store.name}
					class="max-h-full max-w-full object-contain"
				/>
			</div>

		<!-- Image counter -->
		<div
				class="absolute bottom-6 left-1/2 -translate-x-1/2 transform rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
			>
				{(currentImageIndex ?? 0) + 1} / {store.images.length}
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
{/await}
