<script lang="ts">
	import { House, User, MessageCircle, Utensils } from '@lucide/svelte';

	let tabs = [
		{ name: 'Home', icon: House },
		{ name: 'Food', icon: Utensils },
		{ name: 'Chat', icon: MessageCircle },
		{ name: 'Profile', icon: User }
	];
</script>

<div
	class="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-3xl flex-row justify-around bg-white p-2"
>
	{#each tabs as tab}
		<div class="flex flex-col items-center justify-center">
			<svelte:component this={tab.icon} class="mb-1 h-5 w-5" />
			<p class="text-xs">{tab.name}</p>
		</div>
	{/each}
</div>
