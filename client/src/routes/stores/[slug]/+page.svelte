<script lang="ts">
	import { supabase } from '$lib/supabase/client';
	import { onMount } from 'svelte';
	import ChildNavbar from '../../components/child-navbar.svelte';
	import { StorageService } from '$lib/services/storage.service';
	import placeholderImage from '$lib/assets/image-placeholder.webp';
	export let params;

	let store: any = null;

	onMount(async () => {
		const { data } = await supabase.from('stores').select('*').eq('id', params.slug).single();

		store = data;
	});
</script>

{#if store}
	<ChildNavbar title={store.name} backLink="/stores" />
	<div class="mx-auto flex max-w-3xl flex-col justify-center gap-4 px-4 pt-4">
		<div class="flex w-full justify-center">
			<img
				src={StorageService.getPublicUrl('stores', `${store.id}/${store.logo}`) || placeholderImage}
				alt={store.name}
				class="h-40 w-40 rounded-3xl"
			/>
		</div>
		<p>{store.description}</p>

		<div class="mt-4 grid grid-cols-2 gap-4">
			{#each store.image_paths as img}
				<img src={img} alt={store.name} class="rounded-lg" />
			{/each}
		</div>
	</div>
{/if}

{#if !store}
	<p class="py-4 text-center">Error 404</p>
{/if}
