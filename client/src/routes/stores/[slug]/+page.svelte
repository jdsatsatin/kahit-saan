<script lang="ts">
	import type { PageProps } from './$types';
	import ChildNavbar from '../../components/child-navbar.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import ImagePlaceholder from '$lib/assets/image-placeholder.webp';
	import { StorageService } from '$lib/services/storage.service';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { MapPin, AtSign, Phone, Facebook, Instagram } from '@lucide/svelte';

	let { data }: PageProps = $props();

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
		<Carousel.Root>
			<Carousel.Content class="h-60">
				{#each data.store.images as image}
					<Carousel.Item>
						<img
							src={StorageService.getPublicUrl('stores', `${data.store.id}/${image}`) ||
								ImagePlaceholder}
							alt={data.store.name}
							class="h-60 w-full object-cover"
						/>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
		<div class="px-4">
			<p class="mt-4 text-sm text-gray-700">{data.store.description}</p>
			<Separator class="my-4" />
			<div class="flex flex-col gap-3">
				{#each contacts as { icon: Icon, info, onclick }}
					{#if info}
						<button {onclick}>
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
{:else}
	<p class="text-red-500">Store not found.</p>
{/if}
