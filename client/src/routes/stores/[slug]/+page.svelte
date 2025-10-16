<script lang="ts">
	import type { PageProps } from './$types';
	import ChildNavbar from '../../components/child-navbar.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import ImagePlaceholder from '$lib/assets/image-placeholder.webp';
	import { StorageService } from '$lib/services/storage.service';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
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
	<!-- Hero Section with Image Carousel -->
	<div class="relative">
		<Carousel.Root>
			<Carousel.Content class="h-[70vh] min-h-96">
				{#each data.store.images as image, index}
					<Carousel.Item>
						<button onclick={() => openImageOverlay(index)} class="h-full w-full">
							<div class="relative h-full w-full cursor-pointer overflow-hidden">
								<!-- Gradient overlay for better text readability -->
								<div
									class="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20"
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
			class="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
		>
			<ArrowLeft class="h-4 w-4" />
			<span class="text-sm font-medium">Back</span>
		</button>

		<!-- Store name overlay -->
		<div class="absolute bottom-0 left-0 right-0 z-20 p-4">
			<div class="mx-auto w-full max-w-3xl">
				<h1 class=" text-2xl font-semibold tracking-tight text-white">
					{data.store.name}
				</h1>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="mx-auto w-full max-w-3xl px-4 py-8 pb-24 md:px-4">
		<!-- Store Description Card -->
		<Card.Root class="mb-4 gap-1 shadow-lg">
			<Card.Header class="">
				<Card.Title class="text-lg font-semibold text-gray-900">About</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="text-base leading-relaxed text-gray-700">
					{data.store.description || 'No description available.'}
				</p>
			</Card.Content>
		</Card.Root>

		<!-- Contact Information Card -->
		<Card.Root class="gap-2 shadow-lg">
			<Card.Header>
				<Card.Title class="text-lg font-semibold text-gray-900">Contact Information</Card.Title>
			</Card.Header>
			<Card.Content class="">
				<div class="grid gap-1">
					{#each contacts as { icon: Icon, info, onclick }}
						{#if info}
							<button
								{onclick}
								class="group flex w-full min-w-0 items-center gap-3 rounded-lg py-1 text-left transition-colors hover:bg-gray-50"
							>
								<div
									class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200"
								>
									<Icon class="text-primary h-5 w-5" />
								</div>
								<div class="min-w-0 flex-1">
									<p class="w-full truncate font-medium text-gray-700" title={info}>
										{info}
									</p>
								</div>
							</button>
						{/if}
					{/each}
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Menu Card -->
		<Card.Root class="mt-4 gap-2 shadow-lg">
			<Card.Header>
				<Card.Title class="text-xl font-semibold text-gray-900">Menu</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center justify-center py-8">
					<p class="text-lg font-medium text-gray-500">Coming Soon</p>
				</div>
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Fixed Bottom Action Bar -->
	<div class="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 shadow-xl">
		<div class="mx-auto flex w-full max-w-3xl gap-3">
			{#if data.store.facebook_link}
				<Button
					class="flex-1 bg-[#1877F2] py-6 font-medium text-white hover:bg-[#166FE5]"
					onclick={() =>
						window.open(data?.store?.facebook_link ?? 'https://facebook.com', '_blank')}
				>
					<div class="flex items-center justify-center gap-3">
						<img src="/messenger-icon.png" alt="Messenger" class="h-5 w-5" />
						<span class="text-lg">Message</span>
					</div>
				</Button>
			{/if}

			<Button class="flex-1 bg-[#B0CE88] py-6 font-medium text-white hover:bg-[#9BC071]">
				<div class="flex items-center justify-center gap-3">
					<MapPin class="h-5 w-5" />
					<span class="text-lg">Get Directions</span>
				</div>
			</Button>
		</div>
	</div>

	<!-- Full-screen image overlay -->
	{#if showImageOverlay && data.store.images && currentImageIndex !== null}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
			<!-- Close button -->
			<button
				onclick={closeImageOverlay}
				class="absolute right-4 top-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all
				hover:bg-opacity-70"
			>
				<X class="h-6 w-6" />
			</button>

			<!-- Navigation buttons -->
			<button
				onclick={() => navigateImage('prev')}
				class="absolute left-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all hover:bg-opacity-70"
			>
				<ChevronLeft class="h-6 w-6" />
			</button>

			<button
				onclick={() => navigateImage('next')}
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
	<div class="flex min-h-screen items-center justify-center px-4">
		<Card.Root class="w-full max-w-96">
			<Card.Content class="pt-6">
				<div class="text-center">
					<p class="text-lg font-medium text-red-500">Store not found</p>
					<p class="mt-2 text-gray-600">The store you're looking for doesn't exist.</p>
					<Button onclick={() => goto('/')} class="mt-4">Go Back Home</Button>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
{/if}
