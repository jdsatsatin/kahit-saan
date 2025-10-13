<script lang="ts">
	import { supabase } from '$lib/supabase/client';
	import { onMount } from 'svelte';
	import ChildNavbar from '../../components/child-navbar.svelte';
	import { StorageService } from '$lib/services/storage.service';
	import placeholderImage from '$lib/assets/image-placeholder.webp';
	import { Facebook, Instagram, Phone, AtSign, MapPin, ExternalLink } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import * as Tabs from '$lib/components/ui/tabs/index';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import { Badge } from '$lib/components/ui/badge/index';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

	let store: any = null;
	let loading = true;
	export let params;

	onMount(async () => {
		try {
			const { data: storeData } = await supabase
				.from('stores')
				.select('*')
				.eq('id', params.slug)
				.single();
			store = storeData;
		} catch (error) {
			console.error('Error fetching store:', error);
		} finally {
			loading = false;
		}
	});
</script>

<ChildNavbar title={store?.name || 'Store'} backLink="/stores" />

{#if loading}
	<div class="mx-auto max-w-3xl px-4 py-6">
		<div class="flex flex-col gap-4">
			<Skeleton class="mx-auto h-40 w-40 rounded-3xl" />
			<Skeleton class="mx-auto h-6 w-2/3" />
			<Skeleton class="h-20 w-full" />
			<div class="flex gap-2">
				<Skeleton class="h-8 w-8 rounded-full" />
				<Skeleton class="h-8 w-full" />
			</div>
		</div>
	</div>
{:else if store}
	<div class="mx-auto max-w-3xl px-4">
		<!-- Store Header -->
		<Card.Root class="border-0 shadow-none">
			<Card.Content class="p-0">
				<div class="flex flex-col items-center gap-4 pt-4">
					<Avatar.Root class="h-28 w-28 rounded-3xl">
						<Avatar.Image
							src={StorageService.getPublicUrl('stores', `${store.id}/${store.logo}`) ||
								placeholderImage}
							alt={store.name}
						/>
						<Avatar.Fallback>{store.name?.[0]}</Avatar.Fallback>
					</Avatar.Root>

					<div class="text-center">
						<h1 class="text-xl font-bold">{store.name}</h1>
						{#if store.is_verified}
							<div class="flex items-center justify-center gap-1">
								<Badge variant="outline" class="bg-green-50">Verified</Badge>
							</div>
						{/if}
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Tabs -->
		<Tabs.Root value="about" class="w-full">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="about">About</Tabs.Trigger>
				<Tabs.Trigger value="photos">Photos</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="about" class="pt-4">
				<Card.Root>
					<Card.Header>
						<Card.Title>Description</Card.Title>
					</Card.Header>
					<Card.Content>
						<p>{store.description || 'No description available.'}</p>
					</Card.Content>
				</Card.Root>

				<Card.Root class="mt-4">
					<Card.Header>
						<Card.Title>Contact Information</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="flex flex-col gap-3">
							{#if store.address}
								<a
									href={`https://maps.google.com/?q=${store.address}`}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 text-sm text-blue-600 hover:underline"
								>
									<MapPin class="h-4 w-4" />
									<span>{store.address}</span>
								</a>
							{/if}

							{#if store.phone_number}
								<a
									href={`tel:${store.phone_number}`}
									class="flex items-center gap-2 text-sm text-blue-600 hover:underline"
								>
									<Phone class="h-4 w-4" />
									<span>{store.phone_number}</span>
								</a>
							{/if}

							{#if store.email_address}
								<a
									href={`mailto:${store.email_address}`}
									class="flex items-center gap-2 text-sm text-blue-600 hover:underline"
								>
									<AtSign class="h-4 w-4" />
									<span>{store.email_address}</span>
								</a>
							{/if}
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root class="mt-4">
					<Card.Header>
						<Card.Title>Social Media</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="flex flex-col gap-3">
							{#if store.facebook_link}
								<a
									href={store.facebook_link}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 text-sm text-blue-600 hover:underline"
								>
									<Facebook class="h-4 w-4" />
									<span>Facebook</span>
									<ExternalLink class="ml-auto h-3 w-3" />
								</a>
							{/if}

							{#if store.instagram_link}
								<a
									href={store.instagram_link}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 text-sm text-blue-600 hover:underline"
								>
									<Instagram class="h-4 w-4" />
									<span>Instagram</span>
									<ExternalLink class="ml-auto h-3 w-3" />
								</a>
							{/if}
						</div>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>

			<Tabs.Content value="photos" class="pt-4">
				{#if store.image_paths && store.image_paths.length > 0}
					<div class="grid grid-cols-2 gap-2">
						{#each store.image_paths as img}
							<img
								src={StorageService.getPublicUrl('stores', `${store.id}/${img}`)}
								alt={store.name}
								class="aspect-square w-full rounded-lg object-cover"
							/>
						{/each}
					</div>
				{:else}
					<div class="py-8 text-center text-gray-500">
						<p>No photos available</p>
					</div>
				{/if}
			</Tabs.Content>
		</Tabs.Root>

		<!-- Contact Button -->
		<div class="sticky bottom-16 mt-4 flex justify-center pb-4">
			<Button class="w-full rounded-full">
				<Phone class="mr-2 h-4 w-4" />
				Contact
			</Button>
		</div>
	</div>
{:else}
	<div class="flex h-[70vh] items-center justify-center">
		<div class="text-center">
			<h2 class="text-xl font-bold">Store Not Found</h2>
			<p class="text-gray-500">This store doesn't exist or has been removed</p>
			<Button href="/stores" variant="link" class="mt-4">Go Back to Stores</Button>
		</div>
	</div>
{/if}
