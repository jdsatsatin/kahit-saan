<script lang="ts">
	import { House, User, MessageCircle, Utensils } from '@lucide/svelte';
	import { onMount, onDestroy } from 'svelte';

	let tabs = [
		{ name: 'Home', icon: House },
		{ name: 'Food', icon: Utensils },
		{ name: 'Chat', icon: MessageCircle },
		{ name: 'Profile', icon: User }
	];

	let showNav = true;
	let lastScrollY = 0;

	function handleScroll() {
		const currentScrollY = window.scrollY;
		showNav = currentScrollY < lastScrollY || currentScrollY < 10;
		lastScrollY = currentScrollY;
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			lastScrollY = window.scrollY;
			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<div
	class="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-3xl flex-row justify-around bg-white p-2 transition-transform duration-300"
	style="transform: translateY({showNav ? '0%' : '100%'})"
>
	{#each tabs as tab}
		<div class="flex flex-col items-center justify-center">
			<svelte:component this={tab.icon} class="mb-1 h-5 w-5" />
			<p class="text-xs">{tab.name}</p>
		</div>
	{/each}
</div>
