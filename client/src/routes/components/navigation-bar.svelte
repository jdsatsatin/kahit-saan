<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { Search } from '@lucide/svelte';
	import AddressHeader from './address-header.svelte';

	const placeholders = [
		'Tapsilog',
		'Hotsilog',
		'Chicharon Bulaklak',
		'Milktea',
		'Siomai Rice',
		'Lumpiang Shanghai',
		'Shawarma Rice'
	];
	let current = 0;
	let display = '';
	let charIndex = 0;

	function animatePlaceholder() {
		const text = placeholders[current];
		display = '';
		charIndex = 0;

		const interval = setInterval(() => {
			display = text.slice(0, charIndex + 1);
			charIndex++;
			if (charIndex === text.length) {
				clearInterval(interval);
				setTimeout(() => {
					current = (current + 1) % placeholders.length;
					animatePlaceholder();
				}, 1200); // Pause before next word
			}
		}, 100); // Typing speed
	}

	animatePlaceholder();
</script>

<div class="bg-[#B0CE88]">
	<div class="flex max-w-3xl flex-col gap-4 p-4">
		<div class="text-start">
			<AddressHeader />
		</div>
		<div class="flex w-full flex-row gap-2">
			<div class="relative flex w-full items-center rounded-2xl bg-white">
				<Search class="text-muted-background absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
				<Input type="search" placeholder={display || ''} class="w-full rounded-2xl pl-9" />
			</div>
		</div>
	</div>
</div>
